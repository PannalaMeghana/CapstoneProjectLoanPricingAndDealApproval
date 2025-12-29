import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { ActivatedRoute, Router, RouterModule } from "@angular/router"
import { AuthService } from "../../../services/auth.service"
import { LoanService } from "../../../services/loan.service"
import { Loan } from "../../../models/loan.model"

@Component({
  selector: "app-loan-form",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: "./loan-form.component.html",
  styleUrls: ["./loan-form.component.css"],
})
export class LoanFormComponent implements OnInit {
  loan: Loan = {
    dealName: "",
    borrowerName: "",
    borrowerIndustry: "",
    loanAmount: 0,
    currency: "USD",
    tenorMonths: 12,
    loanType: "Term Loan",
    purpose: "",
  }

  isEditMode = false
  loanId: string | null = null
  currentUser: any
  errorMessage = ""
  successMessage = ""

  constructor(
    private authService: AuthService,
    private loanService: LoanService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue
    this.loanId = this.route.snapshot.paramMap.get("id")

    if (this.loanId) {
      this.isEditMode = true
      this.loadLoan()
    }
  }

  loadLoan(): void {
    if (this.loanId) {
      this.loanService.getLoanById(this.loanId).subscribe({
        next: (loan) => {
          this.loan = loan
        },
        error: (err) => {
          this.errorMessage = "Failed to load loan"
        },
      })
    }
  }

  calculateAllInRate(): void {
    if (this.loan.baseRate && this.loan.spread) {
      this.loan.allInRate = this.loan.baseRate + this.loan.spread
    }
  }

  calculateLTV(): void {
    if (this.loan.loanAmount && this.loan.collateralValue && this.loan.collateralValue > 0) {
      this.loan.loanToValue = (this.loan.loanAmount / this.loan.collateralValue) * 100
    }
  }

  onSubmit(): void {
    this.errorMessage = ""
    this.successMessage = ""

    if (this.isEditMode && this.loanId) {
      this.loanService.updateLoan(this.loanId, this.loan).subscribe({
        next: (response) => {
          this.successMessage = "Loan updated successfully"
          setTimeout(() => this.router.navigate(["/user/loans"]), 1500)
        },
        error: (err) => {
          this.errorMessage = "Failed to update loan"
        },
      })
    } else {
      this.loanService.createLoan(this.loan).subscribe({
        next: (response) => {
          this.successMessage = "Loan created successfully"
          setTimeout(() => this.router.navigate(["/user/loans"]), 1500)
        },
        error: (err) => {
          this.errorMessage = "Failed to create loan"
        },
      })
    }
  }

  logout(): void {
    this.authService.logout()
    this.router.navigate(["/login"])
  }
}
