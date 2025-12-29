import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Router, RouterModule } from "@angular/router"
import { AuthService } from "../../../services/auth.service"
import { LoanService } from "../../../services/loan.service"
import { Loan } from "../../../models/loan.model"
import { FormsModule } from "@angular/forms"

@Component({
  selector: "app-loan-list",
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule],
  templateUrl: "./loan-list.component.html",
  styleUrls: ["./loan-list.component.css"],
})
export class LoanListComponent implements OnInit {
  loans: Loan[] = []
  currentUser: any

  constructor(
    private authService: AuthService,
    private loanService: LoanService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue
    this.loadLoans()
  }

  loadLoans(): void {
    this.loanService.getMyLoans().subscribe({
      next: (loans) => {
        this.loans = loans
      },
      error: (err) => console.error("Error loading loans:", err),
    })
  }

  viewLoan(id: string | undefined): void {
    if (id) {
      this.router.navigate(["/user/loans", id])
    }
  }

  editLoan(id: string | undefined): void {
    if (id) {
      this.router.navigate(["/user/loans/edit", id])
    }
  }

  deleteLoan(id: string | undefined): void {
    if (id && confirm("Are you sure you want to delete this loan?")) {
      this.loanService.deleteLoan(id).subscribe({
        next: () => {
          this.loadLoans()
        },
        error: (err) => console.error("Error deleting loan:", err),
      })
    }
  }

  logout(): void {
    this.authService.logout()
    this.router.navigate(["/login"])
  }
}
