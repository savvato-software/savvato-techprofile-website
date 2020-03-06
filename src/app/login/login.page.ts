import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoadingController } from '@ionic/angular';
import { Events } from '@ionic/angular';
import { Platform } from '@ionic/angular';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { AlertService } from '../../app/_services/alert.service';
import { UserService } from '../../app/_services/user.service';
import { LoadingService } from '../../app/_services/loading.service';

import { environment } from '../../_environments/environment';

@Component({
  selector: 'page-login',
  templateUrl: 'login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {

  user = undefined;
  codeAlreadySent = false;

  query = undefined;
  
  constructor(private _router : Router,
              private _alertService: AlertService,
              private _userService: UserService,
              private _loadingService: LoadingService,
              // private splashScreen: SplashScreen,
              private _events: Events) {

              this.user = {id:-1, name: '', password: ''};

              if ( !environment.production )
                this.user = {id:-1, name: 'dave', password: 'admin'}; // dave is a regular user, not an admin.
  }

  getQuery() {
    return this.query;
  }

  onQueryChange($event) {
    this.query = $event.currentTarget.value;
  }

  isSearchBtnEnabled() {
    if (this.query) {
      if (!isNaN(this.query.charAt(0) * 1)) { // if the first char is a number
        return this.query.length === 10 && !isNaN(this.query);
      } else {
        return this.query.length >= 3;
      }
    }

    return this.query && this.query.length >= 3;
  }

  
  // TODO: This is a dependency in both this website, and the mobile app. Figure out a way 
  // TODO:  to use a library to share stuff like this. The rule is never try to keep the same
  // TODO:  piece of data in sync in two places.
  DEFAULT_PASSWORD = "password11"
  onSearchBtnClicked() {
    let self = this;

    self._userService.getUserByEmailOrPhone(self.query).then((u) => {
       
      if (u) {
        self._userService.verifyAndLoginUser(u['name'], this.DEFAULT_PASSWORD).then(() => {
          self._alertService.show({
            header: 'Found you!',
            message: "We found you, but you haven't set a password yet. Enter one here!",
            inputs: [{
              name: 'password'
            }],
            buttons: [{
              text: "Cancel",
              role: 'cancel'
            }, {
              text: 'Set Password',
              handler: (data) => {
                  this._userService.updateUserPassword(u, data.password).then((user) => {
                    self._alertService.show({
                      header: "Done!",
                      message: "Cool, we saved it!",
                      buttons: [{
                        text: "OK",
                        handler: () => {
                          this._router.navigate(['/home']);
                        }
                      }]
                    })
                  }).catch((err) => {
                    self._alertService.show({
                      header: "Aargh!",
                      message: "We couldn't save it... :(",
                      buttons: [{
                        text: "OK",
                        handler: () => { }
                      }]
                    })
                  });
              }
            }]
          })
        }).catch(() => {
          // user has a password already
          this._router.navigate(['/home']);
        })

      } else {
        self._alertService.show({
          header: 'Hmmm...',
          message: "Sorry, we couldn't find a profile with that info...<br/><br/>",
          buttons: [{
            text: "Aargh.",
            role: 'cancel'
          }]
        })
      }
    })      
  }





////////

  onLoginBtnTap(event) {
    if (this.user.name.length > 0 && this.user.password.length > 0) {
      let self = this;

      this._loadingService.show({
        message: 'Please wait...'
      }).then(() => {
        this._userService.verifyAndLoginUser(this.user.name, this.user.password).then((userObj) => {
          let pw = self.user.password;
          let un = self.user.name;

          self.user = userObj;
          
          self.user["password"] = pw;
          self.user["name"] = un;

          self._loadingService.dismiss().then(() => {
				    this._router.navigate(['/home']);
          })
        })
        .catch((err) => {
            self._loadingService.dismiss().then(() => {
              self._alertService.show({header: 'Sad face..',
                   message: "Bad username/password!",
                   buttons: [{
                      text: 'OK',
                      handler: () => { }
                    }]
              });
            });              
        });
      });      
    }
  }

  onLostPasswordClick(event) {
    let self = this;
    this._alertService.show({
            header: '',
            message: "Would you like to reset your password?",
            buttons: [{
              text: "Oops, no..",
              role: 'cancel'
            }, {
              text: 'Yes!',
              handler: () => {
                this.onResetPasswordClick();
              }
            }]
          })
  }

  onResetPasswordClick() {
    let self = this;
      this._alertService.show({
        header: "Enter your phone number or email address. We'll send you a code.",
        inputs: [{
          name: 'phoneNumber',
          placeholder: '..10 digit phone number..',
          type: 'number'
        }],
        buttons: [{
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Send Code',
          handler: (data) => {

            if (data.phoneNumber.length != 10)
              return false;

            // TODO check for email address too
            self._userService.isPhoneNumberAvailable(data.phoneNumber).then((isAvailable) => {
              if (isAvailable) {

                self._alertService.show({
                        header: 'Uh oh!',
                        message: "We don't have an account with that phone number. :(",
                        buttons: [{
                          text: "OK",
                          role: 'cancel'
                        }]
                      })
              } else {
                self._userService.sendCodeToPhoneNumber(data.phoneNumber);
                self.codeAlreadySent = true;

                this.onCodeSentToPhoneNumber(data.phoneNumber);
              }
            });
          }
        }]
    })
  }

  onCodeSentToPhoneNumber(phoneNumber) {
    let self = this;
      this._alertService.show({
        header: "What's in the text?",
        inputs: [{
          name: 'code',
          placeholder: '..code from text msg..',
          type: 'number'
        }],
        buttons: [{
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Got it!',
          handler: (data) => {
              if (data.code !== undefined && data.code.length > 0) {

                self._userService.isAValidSMSChallengeCode(phoneNumber, data.code).then((b) => {
                  if (b) {

                      // present dialog allowing user to enter new password

                      self._alertService.show({
                        header: "Enter Your New Password",
                        inputs: [{
                          name: 'pw1',
                          placeholder: '..new password..'
                        }, {
                          name: 'pw2',
                          placeholder: '..verify password..'
                        }],
                        buttons: [{
                          text: 'Cancel',
                          role: 'cancel'
                        }, {
                          text: 'OK',
                          handler: (data2) => {
                            if (data2.pw1 && data2.pw1.length > 5 && data2.pw1 == data2.pw2) {
                              self._userService.changeLostPassword(data.code, phoneNumber, data2.pw2).then((response) => {

                                  if (response["id"]) {
                                    self._alertService.show({
                                      header: 'Yay!',
                                      message: "Your password has been changed.<br/><br/>Username: " + response["name"],
                                      buttons: [{
                                        cssClass: 'finalOkBtn',
                                        text: 'OK',
                                        handler: () => {

                                        }
                                      }]
                                    })
                                  } else {
                                    self._alertService.show({
                                      header: 'Hmmm...!',
                                      message: "Could not change your password... Try again.",
                                      buttons: [{
                                        text: 'OK',
                                        handler: () => {

                                        }
                                      }]
                                    })
                                  }

                                }, (err) => {
                                  
                                  self._alertService.show({
                                    header: 'Arggh!',
                                    message: "Something bad happened on the server. We hate when that happens. Please email us at info@easyah.io and let us know.",
                                    buttons: [{
                                      text: 'OK',
                                      handler: () => {
                                        
                                      }
                                    }]
                                  })
                                })
                            } else {
                              return false;
                            }
                          }
                        }]
                    });

                  } else {
                    self._alertService.show({
                      header: 'Aargh...',
                      message: "That wasn't a valid code.......",
                      buttons: [{
                        text: 'Grr.',
                        handler: () => {
                          
                        }
                      }]
                    })
                  }
                })
              }
          }
        }]
      });
  }

}
