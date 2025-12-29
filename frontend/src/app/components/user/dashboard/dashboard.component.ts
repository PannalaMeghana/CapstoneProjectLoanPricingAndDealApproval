import { Component, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Router, RouterModule } from "@angular/router"
import { AuthService } from "../../../services/auth.service"
import { LoanService } from "../../../services/loan.service"
import { Loan } from "../../../models/loan.model"


@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  loans: Loan[] = []
  stats = {
    total: 0,
    draft: 0,
    submitted: 0,
    approved: 0,
  }
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
        this.calculateStats(loans)
      },
      error: (err) => console.error("Error loading loans:", err),
    })
  }

  calculateStats(loans: Loan[]): void {
    this.stats.total = loans.length
    this.stats.draft = loans.filter((l) => l.status === "DRAFT").length
    this.stats.submitted = loans.filter((l) => l.status === "SUBMITTED" || l.status === "UNDER_REVIEW").length
    this.stats.approved = loans.filter((l) => l.status === "APPROVED").length
  }

  logout(): void {
    this.authService.logout()
    this.router.navigate(["/login"])
  }
}
