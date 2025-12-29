import { Routes } from "@angular/router"
import { adminGuard } from "./guards/admin.guard"
import { userGuard } from "./guards/user.guard"

export const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  {
    path: "login",
    loadComponent: () => import("./components/login/login.component").then((m) => m.LoginComponent),
  },
  {
    path: "signup",
    loadComponent: () => import("./components/signup/signup.component").then((m) => m.SignupComponent),
  },
  {
    path: "user",
    canActivate: [userGuard],
    children: [
      {
        path: "dashboard",
        loadComponent: () =>
          import("./components/user/dashboard/dashboard.component").then((m) => m.DashboardComponent),
      },
      {
        path: "loans",
        loadComponent: () => import("./components/user/loan-list/loan-list.component").then((m) => m.LoanListComponent),
      },
      {
        path: "loans/create",
        loadComponent: () => import("./components/user/loan-form/loan-form.component").then((m) => m.LoanFormComponent),
      },
      {
        path: "loans/edit/:id",
        loadComponent: () => import("./components/user/loan-form/loan-form.component").then((m) => m.LoanFormComponent),
      },
      {
        path: "loans/:id",
        loadComponent: () =>
          import("./components/user/loan-detail/loan-detail.component").then((m) => m.LoanDetailComponent),
      },
    ],
  },
  {
    path: "admin",
    canActivate: [adminGuard],
    children: [
      {
        path: "dashboard",
        loadComponent: () =>
          import("./components/admin/dashboard/dashboard.component").then((m) => m.AdminDashboardComponent),
      },
      {
        path: "loans",
        loadComponent: () =>
          import("./components/admin/loan-list/loan-list.component").then((m) => m.AdminLoanListComponent),
      },
      {
        path: "loans/:id",
        loadComponent: () =>
          import("./components/admin/loan-detail/loan-detail.component").then((m) => m.AdminLoanDetailComponent),
      },
      {
        path: "users",
        loadComponent: () =>
          import("./components/admin/user-management/user-management.component").then((m) => m.UserManagementComponent),
      },
    ],
  },
  {
    path: "unauthorized",
    loadComponent: () =>
      import("./components/unauthorized/unauthorized.component").then((m) => m.UnauthorizedComponent),
  },
  { path: "**", redirectTo: "/login" },
]
