
import { Component, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { ActivatedRoute, Router, RouterModule } from "@angular/router"
import { AuthService } from "../../../services/auth.service"
import { LoanService } from "../../../services/loan.service"
import { Loan } from "../../../models/loan.model"

@Component({
  selector: "app-admin-loan-detail",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: "./loan-detail.component.html",
  styleUrls: ["./loan-detail.component.css"],
})
export class AdminLoanDetailComponent implements OnInit {
  loan: Loan | null = null
  currentUser: any
  newComment = ""
  approvalRemarks = ""
  rejectionRemarks = ""

  constructor(
    private authService: AuthService,
    private loanService: LoanService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue
    const id = this.route.snapshot.paramMap.get("id")
    if (id) {
      this.loadLoan(id)
    }
  }

  loadLoan(id: string): void {
    this.loanService.getAdminLoanById(id).subscribe({
      next: (loan) => {
        this.loan = loan
      },
      error: (err) => console.error("Error loading loan:", err),
    })
  }

  setUnderReview(): void {
    if (this.loan?.id && confirm("Set this loan under review?")) {
      this.loanService.setUnderReview(this.loan.id).subscribe({
        next: () => {
          this.loadLoan(this.loan!.id!)
        },
        error: (err) => console.error("Error updating status:", err),
      })
    }
  }

  approveLoan(): void {
    if (this.loan?.id && confirm("Approve this loan?")) {
      this.loanService.approveLoan(this.loan.id, this.approvalRemarks || "Approved").subscribe({
        next: () => {
          this.approvalRemarks = ""
          this.loadLoan(this.loan!.id!)
        },
        error: (err) => console.error("Error approving loan:", err),
      })
    }
  }

  rejectLoan(): void {
    if (this.loan?.id && this.rejectionRemarks && confirm("Reject this loan?")) {
      this.loanService.rejectLoan(this.loan.id, this.rejectionRemarks).subscribe({
        next: () => {
          this.rejectionRemarks = ""
          this.loadLoan(this.loan!.id!)
        },
        error: (err) => console.error("Error rejecting loan:", err),
      })
    } else {
      alert("Please provide rejection remarks")
    }
  }

  addComment(): void {
    if (this.loan?.id && this.newComment.trim()) {
      this.loanService.addAdminComment(this.loan.id, this.newComment).subscribe({
        next: () => {
          this.newComment = ""
          this.loadLoan(this.loan!.id!)
        },
        error: (err) => console.error("Error adding comment:", err),
      })
    }
  }

  logout(): void {
    this.authService.logout()
    this.router.navigate(["/login"])
  }
}
