import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardDetailsScreenComponent } from './board-details-screen.component';

describe('BoardDetailsScreenComponent', () => {
  let component: BoardDetailsScreenComponent;
  let fixture: ComponentFixture<BoardDetailsScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardDetailsScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardDetailsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
