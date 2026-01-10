import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { LoginRequest, SignupRequest, JwtResponse } from "../models/user.model";

const API_URL = "http://13.201.77.166:8080/api/auth/";
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<JwtResponse | null>(null);
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  public get currentUserValue(): JwtResponse | null {
    return this.currentUserSubject.value;
  }

  login(credentials: LoginRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(API_URL + "login", credentials, httpOptions).pipe(
      tap((response) => {
        localStorage.setItem("currentUser", JSON.stringify(response));
        this.currentUserSubject.next(response);
      })
    );
  }

  signup(signupData: SignupRequest): Observable<any> {
    return this.http.post(API_URL + "signup", signupData, httpOptions);
  }

  logout(): void {
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }

  getToken(): string | null {
    return this.currentUserValue?.token ?? null;
  }

  hasRole(role: string): boolean {
    return this.currentUserValue?.roles?.includes(role) ?? false;
  }

  isAdmin(): boolean {
    return this.hasRole("ROLE_ADMIN");
  }

  isUser(): boolean {
    return this.hasRole("ROLE_USER");
  }
}
