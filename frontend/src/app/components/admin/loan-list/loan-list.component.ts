import { Component, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Router, RouterModule } from "@angular/router"
import { AuthService } from "../../../services/auth.service"
import { LoanService } from "../../../services/loan.service"
import { Loan } from "../../../models/loan.model"
import { FormsModule } from "@angular/forms"


@Component({
  selector: "app-admin-loan-list",
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule],
  templateUrl: "./loan-list.component.html",
  styleUrls: ["./loan-list.component.css"],
})
export class AdminLoanListComponent implements OnInit {
  loans: Loan[] = []
  filteredLoans: Loan[] = []
  selectedStatus = "ALL"
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
    this.loanService.getAllLoans().subscribe({
      next: (loans) => {
        this.loans = loans
        this.filterLoans()
      },
      error: (err) => console.error("Error loading loans:", err),
    })
  }

  filterLoans(): void {
    if (this.selectedStatus === "ALL") {
      this.filteredLoans = this.loans
    } else {
      this.filteredLoans = this.loans.filter((loan) => loan.status === this.selectedStatus)
    }
  }

  onStatusFilterChange(status: string): void {
    this.selectedStatus = status
    this.filterLoans()
  }

  logout(): void {
    this.authService.logout()
    this.router.navigate(["/login"])
  }
}
