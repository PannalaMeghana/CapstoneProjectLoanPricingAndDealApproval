import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { ActivatedRoute, Router, RouterModule } from "@angular/router"
import { AuthService } from "../../../services/auth.service"
import { LoanService } from "../../../services/loan.service"
import { Loan } from "../../../models/loan.model"

@Component({
  selector: "app-loan-detail",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: "./loan-detail.component.html",
  styleUrls: ["./loan-detail.component.css"],
})
export class LoanDetailComponent implements OnInit {
  loan: Loan | null = null
  currentUser: any
  newComment = ""

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
    this.loanService.getLoanById(id).subscribe({
      next: (loan) => {
        this.loan = loan
      },
      error: (err) => console.error("Error loading loan:", err),
    })
  }

  submitLoan(): void {
    if (this.loan?.id && confirm("Submit this loan for approval?")) {
      this.loanService.submitLoan(this.loan.id).subscribe({
        next: () => {
          this.loadLoan(this.loan!.id!)
        },
        error: (err) => console.error("Error submitting loan:", err),
      })
    }
  }

  addComment(): void {
    if (this.loan?.id && this.newComment.trim()) {
      this.loanService.addUserComment(this.loan.id, this.newComment).subscribe({
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
