import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveAndStampComponent } from './save-and-stamp.component';

describe('SaveAndStampComponent', () => {
  let component: SaveAndStampComponent;
  let fixture: ComponentFixture<SaveAndStampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaveAndStampComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaveAndStampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
