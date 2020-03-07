import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SkillsMatrixPage } from './skills-matrix.page';

describe('SkillsMatrixPage', () => {
  let component: SkillsMatrixPage;
  let fixture: ComponentFixture<SkillsMatrixPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillsMatrixPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SkillsMatrixPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
