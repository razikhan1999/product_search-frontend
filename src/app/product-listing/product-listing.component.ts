import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import Product from '../types/product.model';

@Component({
  selector: 'app-product-listing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-listing.component.html',
  styleUrl: './product-listing.component.scss',
})
export class ProductListingComponent {
  @Input() products: Product[] = [];
}
