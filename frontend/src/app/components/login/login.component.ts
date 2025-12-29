import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import  { Router } from "@angular/router"
import  { AuthService } from "../../services/auth.service"
import{ LoginRequest } from "../../models/user.model"

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  credentials: LoginRequest = {
    username: "",
    password: "",
  }

  errorMessage = ""
  loading = false

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit(): void {
    if (!this.credentials.username || !this.credentials.password) {
      this.errorMessage = "Please enter username and password"
      return
    }

    this.loading = true
    this.errorMessage = ""

    console.log("[v0] Login form submitted with:", this.credentials.username)

    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        console.log("[v0] Login successful, redirecting based on role:", response.roles)
        this.loading = false
        if (response.roles.includes("ROLE_ADMIN")) {
          this.router.navigate(["/admin/dashboard"])
        } else {
          this.router.navigate(["/user/dashboard"])
        }
      },
      error: (err) => {
        console.error("[v0] Login failed:", err)
        this.loading = false
        this.errorMessage = err.error?.message || "Invalid username or password"
      },
    })
  }
}
