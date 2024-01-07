import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateNoticeComponent } from './dialog-create-notice.component';

describe('DialogCreateNoticeComponent', () => {
  let component: DialogCreateNoticeComponent;
  let fixture: ComponentFixture<DialogCreateNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogCreateNoticeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogCreateNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
