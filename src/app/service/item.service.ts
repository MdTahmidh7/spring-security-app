import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {UserDTO} from "../model/UserDTO";
import {catchError} from "rxjs/operators";
import {Item} from "../model/ItemModel";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private apiUrl = 'http://localhost:8080';  // Replace with your backend API URL

  constructor(private http: HttpClient,
              private router: Router) {
  }

  createItem(item: any): Observable<any> {

    //sent username and email in request params
    //const params = { username, email, newPassword };

    return this.http.post<any>(
      `${this.apiUrl}/item`, item
    );
  }

  // register(userData: UserDTO): Observable<any> {
  //   return this.http
  //     .post(`${this.apiUrl}/public/register`, userData)
  //     .pipe(catchError(this.handleError));
  // }

  getAllItems(pageNo: number, pageSize: number) {

    //sent pageNo and pageSize in request params
    const params = { pageNo, pageSize };

    return this.http.get<any>(
      `${this.apiUrl}/items`,
      {params}
    );


  }

  updateItem(id: number, item: Item) {

    return this.http.put<any>(
      `${this.apiUrl}/item/${id}/update`, item
    );
  }

  deleteItem(id: number) {

    return this.http.delete<any>(
      `${this.apiUrl}/item/${id}/delete`
    );
  }
}
