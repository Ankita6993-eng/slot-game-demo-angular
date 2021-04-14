import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotGameHomeComponent } from './slot-game-home.component';

describe('SlotGameHomeComponent', () => {
  let component: SlotGameHomeComponent;
  let fixture: ComponentFixture<SlotGameHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlotGameHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotGameHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
