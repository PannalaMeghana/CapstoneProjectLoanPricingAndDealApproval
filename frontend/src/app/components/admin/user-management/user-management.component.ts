import { Component, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Router, RouterModule } from "@angular/router"
import { AuthService } from "../../../services/auth.service"
import { UserService } from "../../../services/user.service"
import { User } from "../../../models/user.model"

@Component({
  selector: "app-user-management",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./user-management.component.html",
  styleUrls: ["./user-management.component.css"],
})
export class UserManagementComponent implements OnInit {
  users: User[] = []
  currentUser: any

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue
    this.loadUsers()
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => (this.users = users),
      error: (err) => console.error("Error loading users:", err),
    })
  }

  deleteUser(id: string | undefined): void {
    if (id && confirm("Are you sure you want to delete this user?")) {
      this.userService.deleteUser(id).subscribe({
        next: () => this.loadUsers(),
        error: (err) => console.error("Error deleting user:", err),
      })
    }
  }

  logout(): void {
    this.authService.logout()
    this.router.navigate(["/login"])
  }
}
