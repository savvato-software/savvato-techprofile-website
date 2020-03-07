import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CareerPathPage } from './career-path.page';

describe('CareerPathPage', () => {
  let component: CareerPathPage;
  let fixture: ComponentFixture<CareerPathPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerPathPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CareerPathPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
