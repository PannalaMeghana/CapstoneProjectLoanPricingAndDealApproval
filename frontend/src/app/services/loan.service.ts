import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { Loan, LoanStatus } from "../models/loan.model"

const API_URL = "/api/";

@Injectable({
  providedIn: "root",
})
export class LoanService {
  constructor(private http: HttpClient) {}

  createLoan(loan: Loan): Observable<Loan> {
    return this.http.post<Loan>(API_URL + "user/loans", loan)
  }

  getMyLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(API_URL + "user/loans")
  }

  getLoanById(id: string): Observable<Loan> {
    return this.http.get<Loan>(API_URL + "user/loans/" + id)
  }

  updateLoan(id: string, loan: Loan): Observable<Loan> {
    return this.http.put<Loan>(API_URL + "user/loans/" + id, loan)
  }

  submitLoan(id: string): Observable<Loan> {
    return this.http.post<Loan>(API_URL + "user/loans/" + id + "/submit", {})
  }

  getAllLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(API_URL + "admin/loans")
  }
  getAdminLoanById(id: string): Observable<Loan> {
  return this.http.get<Loan>(API_URL + "admin/loans/" + id)
}

setUnderReview(id: string): Observable<Loan> {
  return this.http.post<Loan>(API_URL + "admin/loans/" + id + "/review", {})
}

approveLoan(id: string, remarks: string): Observable<Loan> {
  return this.http.post<Loan>(
    API_URL + "admin/loans/" + id + "/approve",
    { remarks }
  )
}

rejectLoan(id: string, remarks: string): Observable<Loan> {
  return this.http.post<Loan>(
    API_URL + "admin/loans/" + id + "/reject",
    { remarks }
  )
}

addAdminComment(id: string, comment: string): Observable<Loan> {
  return this.http.post<Loan>(
    API_URL + "admin/loans/" + id + "/comment",
    { comment }
  )
}

addUserComment(id: string, comment: string): Observable<Loan> {
  return this.http.post<Loan>(
    API_URL + "user/loans/" + id + "/comment",
    { comment }
  )
}

deleteLoan(id: string): Observable<void> {
  return this.http.delete<void>(API_URL + "user/loans/" + id)
}

}
