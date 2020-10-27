import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSearchViewComponent } from './movie-search-view.component';

describe('MovieSearchViewComponent', () => {
  let component: MovieSearchViewComponent;
  let fixture: ComponentFixture<MovieSearchViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieSearchViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieSearchViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
