import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardPopupComponent } from './board-popup.component';

describe('BoardPopupComponent', () => {
  let component: BoardPopupComponent;
  let fixture: ComponentFixture<BoardPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
