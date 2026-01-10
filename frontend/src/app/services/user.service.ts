import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { User } from "../models/user.model"


const API_URL = "http://13.201.77.166:8080/api/admin/users/";
@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(API_URL)
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(API_URL + id)
  }

  updateUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(API_URL + id, user)
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(API_URL + id)
  }
}
