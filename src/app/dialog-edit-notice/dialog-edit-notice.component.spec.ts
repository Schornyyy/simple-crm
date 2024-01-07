import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditNoticeComponent } from './dialog-edit-notice.component';

describe('DialogEditNoticeComponent', () => {
  let component: DialogEditNoticeComponent;
  let fixture: ComponentFixture<DialogEditNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogEditNoticeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogEditNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
