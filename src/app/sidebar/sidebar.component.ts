import { CommonModule, JsonPipe } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from "@angular/material/paginator";
import { MatSidenavModule } from "@angular/material/sidenav";
import { Observable, debounceTime } from "rxjs";
import { environment } from "../../environments/environment";
import { ProductListingComponent } from "../product-listing/product-listing.component";
import Product from "../types/product.model";
@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [
    ProductListingComponent,
    MatPaginatorModule,
    MatExpansionModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    JsonPipe,
    MatButtonToggleModule,
    HttpClientModule,
    CommonModule,
    MatAutocompleteModule,
  ],
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.scss",
})
export class SidebarComponent implements OnInit {
  private apiUrl = environment.apiURL;
  showFiller = false;
  panelOpenState = false;
  search: string | null = "";
  minPrice: string | null = "";
  sortByRating: boolean = false;
  sortByPrice: boolean = false;
  maxPrice: string | null = "";
  query: string = "key=";
  products: Product[] = [];
  categoriesArr = ["Health & Fitness", "Electronics"];
  categoryHealth: boolean = false;
  categoryElectronics: boolean = false;

  currentPage: number = 1;
  pageSize = 5;

  disabled = false;
  available: boolean | null = null;

  searchCategory = "";

  paginationArr: number[] = [];

  pageEvent: PageEvent | undefined;

  searchControl = new FormControl();
  suggestions: string[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.loadProducts();
  }

  calculateArray(count: number, divisor: number) {
    const numEntries = Math.ceil(count / divisor);
    const resultArray = Array.from(
      { length: numEntries },
      (_, index) => index + 1
    );
    return resultArray;
  }

  pagination(page: number) {
    this.currentPage = page;
    const query = this.generateQuery({
      category: this.searchCategory,
      key: this.search,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      page: this.currentPage,
      limit: this.pageSize,
    });
    this.query = query;
    this.searchProducts();
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pagination(this.currentPage);
    }
  }

  nextPage() {
    if (this.currentPage < this.paginationArr.length) {
      this.currentPage++;
      this.pagination(this.currentPage);
    }
  }

  getProducts(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}products/search?limit=${this.pageSize}&page=${1}`
    );
  }

  loadProducts() {
    this.getProducts().subscribe((response) => {
      this.products = response.products;
      this.paginationArr = this.calculateArray(response.total, 5);
    });
  }

  clearFilter() {
    this.search = "";
    this.minPrice = null;
    this.maxPrice = null;
    this.sortByPrice = false;
    this.sortByRating = false;
    this.searchCategory = "";
    this.categoryElectronics = false;
    this.categoryHealth = false;
    this.available = null;
    this.loadProducts();
  }

  searchProducts(event?: any, type: string | null = null) {
    console.log(event)
    if (type) {
      this.currentPage = 1;
    }
    switch (type) {
      case "sortByPrice":
        this.sortByPrice = event.checked;
        break;
      case "sortByRating":
        this.sortByRating = event.checked;
        break;
      case "minPrice":
        this.minPrice = event.target.value;
        break;
      case "maxPrice":
        this.maxPrice = event.target.value;
        break;
      case "Availability":
        this.available = event.checked;
        break;
      case "key":
        this.search = event.target.value;
        break;
      case "autocomplete":
        this.search = event;
        break;
      case "categoryHealth":
        this.searchCategory = event.checked ? "Health" : "";
        this.categoryHealth = this.searchCategory === "Health";
        this.categoryElectronics = false;
        break;
      case "categoryElectronics":
        this.searchCategory = event.checked ? "Electronics" : "";
        this.categoryElectronics = this.searchCategory === "Electronics";
        this.categoryHealth = false;
        break;
    }

    let params: any = {
      key: this.search,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      sortByRating: this.sortByRating ? 1 : undefined,
      sortByPrice: this.sortByPrice ? 1 : undefined,
      ...(this.available != null && {
        avail: this.available ? "1" : "0",
      }),
      category: this.searchCategory,
    };

    // Remove undefined or null properties
    params = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v !== undefined && v !== null)
    );

    const query = this.generateQuery(params);
    this.query = query;

    // Call filterItems and handle response
    this.filterItems(this.query)
      .pipe(debounceTime(5000))
      .subscribe((response: any) => {
        this.suggestions = response.products.map(
          (product: any) => product.name
        );
        const res = response.products;
        this.products = res;
        this.paginationArr = this.calculateArray(response.total, this.pageSize);
      });
  }
  filterItems(query: string | null = null): Observable<Product[]> {
    return this.http.get<any>(
      `${this.apiUrl}products/search?${query}&limit=${this.pageSize}&page=${this.currentPage}`
    );
  }

  generateQuery(params: any): string {
    let query = "";
    for (const key in params) {
      if (
        params.hasOwnProperty(key) &&
        params[key] !== null &&
        params[key] !== undefined &&
        params[key] !== ""
      ) {
        if (Array.isArray(params[key])) {
          params[key].forEach((value: any) => {
            query += `${key}=${encodeURIComponent(value)}&`;
          });
        } else {
          query += `${key}=${encodeURIComponent(params[key])}&`;
        }
      }
    }

    return query.slice(0, -1); // remove the trailing '&'
  }
}
