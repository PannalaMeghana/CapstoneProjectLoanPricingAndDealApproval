import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { Router, RouterModule } from "@angular/router"
import { AuthService } from "../../services/auth.service"
import { SignupRequest } from "../../models/user.model"

@Component({
  selector: "app-signup",
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent {
  signupData: SignupRequest = {
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    designation: "",
    department: "",
  }

  errorMessage = ""
  successMessage = ""
  loading = false

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit(): void {
    this.loading = true
    this.errorMessage = ""
    this.successMessage = ""

    this.authService.signup(this.signupData).subscribe({
      next: (response) => {
        this.loading = false
        this.successMessage = "Registration successful! Redirecting to login..."
        setTimeout(() => {
          this.router.navigate(["/login"])
        }, 2000)
      },
      error: (err) => {
        this.loading = false
        this.errorMessage = err.error?.message || "Registration failed. Please try again."
      },
    })
  }
}
