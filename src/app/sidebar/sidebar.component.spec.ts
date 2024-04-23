import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { SidebarComponent } from './sidebar.component';
import { beforeEach, describe, it } from 'node:test';
import { of } from 'rxjs';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatDividerModule,
        MatExpansionModule,
        MatCheckboxModule,
        MatButtonToggleModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should increment the current page and update the query', () => {
    component.currentPage = 1;
    component.search = 'test';
    component.minPrice = '10';
    component.maxPrice = '20';
    component.pageSize = 5;

    component.nextPage();
  });

  // it('should call filterItems with correct query string when type is sortByPrice', fakeAsync(() => {
  //   const event = { checked: true };
  //   const type = 'sortByPrice';
  //   spyOn(component, 'filterItems').and.returnValue(of({ products: [] }));

  //   component.searchProducts(event, type);

  //   tick(5000);

  //   expect(component.filterItems).toHaveBeenCalledWith('key=&sortByPrice=1');
  // }));

  // it('should call filterItems with correct query string when type is sortByRating', fakeAsync(() => {
  //   const event = { checked: true };
  //   const type = 'sortByRating';
  //   spyOn(component, 'filterItems').and.returnValue(of({ products: [] }));

  //   component.searchProducts(event, type);

  //   tick(5000);

  //   expect(component.filterItems).toHaveBeenCalledWith('key=&sortByRating=1');
  // }));

  // Add more test cases for other scenarios like minPrice, maxPrice, etc.

  // it('should update products when filterItems returns response', fakeAsync(() => {
  //   const event = { checked: true };
  //   const type = 'sortByPrice';
  //   const mockResponse = { products: [{ id: 1, name: 'Product 1' }] };
  //   spyOn(component, 'filterItems').and.returnValue(of(mockResponse));

  //   component.searchProducts(event, type);

  //   tick(5000);

  //   expect(component.products).toEqual(mockResponse.products);
  // }));

  // it('should update the current page and construct the correct query', () => {
  //   component.search = 'test';
  //   component.minPrice = 10;
  //   component.maxPrice = 20;
  //   component.pageSize = 5;

  //   component.pagination(2);

  //   expect(component.currentPage).toBe(2);
  //   expect(component.query).toBe(
  //     'key=test&minPrice=10&maxPrice=20&page=2&limit=5'
  //   );
  // });

  // it('should call searchProducts with the updated query', () => {
  //   spyOn(component, 'searchProducts'); // Assuming searchProducts is a method in YourService

  //   component.pagination(2);

  //   expect(component.searchProducts).toHaveBeenCalledWith(component.query, '');
  // });

  // it('should call searchProducts with the updated query', () => {
  //   spyOn(service, 'searchProducts'); // Assuming searchProducts is a method in YourService

  //   component.nextPage();

  //   expect(component.searchProducts).toHaveBeenCalledWith(component.query);
  // });

  it('should create', () => {
    expect(component);
  });

  // Add more tests here to cover component functionality
});

function expect(component: SidebarComponent) {
  throw new Error('Function not implemented.');
}
function spyOn(component: SidebarComponent, arg1: string) {
  throw new Error('Function not implemented.');
}
