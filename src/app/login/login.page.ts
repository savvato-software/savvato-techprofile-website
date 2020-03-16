import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

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
              private _location: Location,
              private _alertService: AlertService,
              private _userService: UserService,
              private _loadingService: LoadingService,
              // private splashScreen: SplashScreen,
              private _events: Events) {

              this.user = {id:-1, name: '', password: ''};

              if ( !environment.production ) {
                this.user = {id:-1, name: 'dave', password: 'admin'}; // dave is a regular user, not an admin.
                this.query = "sally@sally.com"
              }
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

          self._alertService.show({
            header: 'Found you!',
            message: "We found you! What's your password?",
            inputs: [{
              name: 'password'
            }],
            buttons: [{
              text: "Cancel",
              role: 'cancel'
            }, { 
              text: "I Lost It.",
              handler: () => {
                self.onLostPasswordClick();
              }
            },
            {
              text: 'GO!',
              handler: (data) => {
                  self._userService.verifyAndLoginUser(u['name'], data.password).then(() => {
                    self._alertService.show({
                      header: "Done!",
                      message: "Cool, you're in!",
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
                      message: "That's not what we got... :(",
                      buttons: [{
                        text: "OK",
                        handler: () => { }
                      }]
                    })
                  });
              }
            }]
          })

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

onCancelBtnClicked() {
  this._location.back();
}

  onLostPasswordClick() {
    let self = this;
    this._alertService.show({
            header: 'Dangit!',
            message: "Y'know, ironically, we are really low tech at the moment.<br/><br/>Send an email to info@savvato.com and <br/>we will get you hooked up.",
            buttons: [{
              text: "OK",
              role: 'cancel'
            }]
          })
  }


}
