import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Router, RouterModule } from "@angular/router"
import { AuthService } from "../../services/auth.service"


@Component({
  selector: "app-unauthorized",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./unauthorized.component.html",
  styleUrls: ["./unauthorized.component.css"],
})
export class UnauthorizedComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  goBack(): void {
    const user = this.authService.currentUserValue
    if (user) {
      if (user.roles.includes("ROLE_ADMIN")) {
        this.router.navigate(["/admin/dashboard"])
      } else {
        this.router.navigate(["/user/dashboard"])
      }
    } else {
      this.router.navigate(["/login"])
    }
  }
}
