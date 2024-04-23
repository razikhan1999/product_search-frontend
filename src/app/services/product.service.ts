import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = environment.apiURL

  constructor(private http: HttpClient) {}

  getProducts(pageSize: number, available: number): Observable<any> {
    console.log('get products',available)
    return this.http.get<any>(
      `${
        this.apiUrl
      }products/search?limit=${pageSize}&page=${1}&avail=${available}`
    )
  }
}
