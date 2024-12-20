import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve books from the server', () => {
    // Mock data: Replace with your book data structure
    const mockBooks = [
      { id: 1, title: 'Book One', author: 'Author One', publishDate: '2020-01-01' },
      { id: 2, title: 'Book Two', author: 'Author Two', publishDate: '2021-02-02' }
    ];

    // Call ngOnInit to trigger the HTTP request
    component.ngOnInit();

    // Expect the HTTP request to match the '/api/Books' endpoint
    const req = httpMock.expectOne('https://localhost:7149/api/Books'); // Correct API endpoint
    expect(req.request.method).toEqual('GET'); // Ensure the request method is GET
    req.flush(mockBooks); // Mock the response with book data

    // Assert that the component's books array is populated with the mock data
    expect(component.books).toEqual(mockBooks);
  });
});
