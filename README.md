# Corporate Banking Loan Pricing & Deal Approval System

A comprehensive full-stack application for managing corporate loan applications with role-based access control, built with Spring Boot, Angular, and MongoDB.

## Features

### User Features (Relationship Managers)
- Create and manage loan applications
- Submit loans for approval
- View loan status and history
- Add comments to loans
- Track draft, submitted, and approved loans

### Admin Features (Credit Managers)
- Review all loan applications
- Approve or reject loans with remarks
- Set loans under review
- Manage user accounts
- View comprehensive statistics
- Track complete status history

### Authentication & Security
- JWT-based authentication
- Role-based access control (USER, ADMIN)
- Secure password hashing with BCrypt
- Protected API endpoints
- HTTP-only JWT tokens

## Technology Stack

### Backend
- Java 17
- Spring Boot 3.2.0
- Spring Security with JWT
- MongoDB
- Maven

### Frontend
- Angular 17
- TypeScript
- RxJS
- Standalone Components
- Functional Route Guards

### Database
- MongoDB 7.0

## Prerequisites

- Docker and Docker Compose
- OR
- Java 17+
- Node.js 20+
- MongoDB 7.0+
- Maven 3.9+

## Quick Start with Docker

1. Clone the repository
2. Navigate to the project root directory
3. Run:

```bash
docker-compose up -d
```

4. Access the application:
   - Frontend: http://localhost:4200
   - Backend API: http://localhost:8080
   - MongoDB: localhost:27017

## Manual Setup

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Update `application.properties` with MongoDB connection details

3. Build and run:
```bash
mvn clean install
mvn spring-boot:run
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm start
```

4. Access at http://localhost:4200

## Default Credentials

The system creates two default users on first startup:

**Admin Account:**
- Username: `admin`
- Password: `admin123`
- Role: ADMIN

**User Account:**
- Username: `user`
- Password: `user123`
- Role: USER

## API Endpoints

### Authentication
- POST `/api/auth/login` - User login
- POST `/api/auth/signup` - User registration

### User Endpoints (Requires USER or ADMIN role)
- GET `/api/user/loans` - Get user's loans
- POST `/api/user/loans` - Create new loan
- GET `/api/user/loans/{id}` - Get loan by ID
- PUT `/api/user/loans/{id}` - Update loan
- POST `/api/user/loans/{id}/submit` - Submit loan for approval
- POST `/api/user/loans/{id}/comments` - Add comment
- DELETE `/api/user/loans/{id}` - Delete loan

### Admin Endpoints (Requires ADMIN role)
- GET `/api/admin/loans` - Get all loans
- GET `/api/admin/loans/status/{status}` - Get loans by status
- GET `/api/admin/loans/{id}` - Get loan details
- POST `/api/admin/loans/{id}/approve` - Approve loan
- POST `/api/admin/loans/{id}/reject` - Reject loan
- POST `/api/admin/loans/{id}/review` - Set under review
- POST `/api/admin/loans/{id}/comments` - Add admin comment
- GET `/api/admin/users` - Get all users
- GET `/api/admin/users/{id}` - Get user by ID
- PUT `/api/admin/users/{id}` - Update user
- DELETE `/api/admin/users/{id}` - Delete user

## Project Structure

```
loan-approval-system/
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/com/corporate/banking/
│   │       │   ├── config/          # Security configuration
│   │       │   ├── controller/      # REST controllers
│   │       │   ├── dto/             # Data transfer objects
│   │       │   ├── model/           # Domain models
│   │       │   ├── repository/      # MongoDB repositories
│   │       │   ├── security/        # JWT and security
│   │       │   ├── service/         # Business logic
│   │       │   └── init/            # Data initialization
│   │       └── resources/
│   │           └── application.properties
│   ├── Dockerfile
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   └── app/
│   │       ├── components/          # Angular components
│   │       │   ├── admin/          # Admin pages
│   │       │   ├── user/           # User pages
│   │       │   ├── login/          # Authentication
│   │       │   └── signup/
│   │       ├── guards/             # Route guards
│   │       ├── interceptors/       # HTTP interceptors
│   │       ├── models/             # TypeScript models
│   │       ├── services/           # Angular services
│   │       └── app.routes.ts       # Route configuration
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
└── docker-compose.yml
```

## Loan Workflow

1. **Draft** - User creates loan application
2. **Submitted** - User submits for review
3. **Under Review** - Admin sets loan under review
4. **Approved** - Admin approves loan
5. **Rejected** - Admin rejects loan with remarks
6. **Disbursed** - Loan is disbursed (future enhancement)

## Features Detail

### Loan Application Fields
- Basic Information: Deal name, borrower details, industry, loan type, amount, tenor
- Pricing: Base rate, spread, all-in rate, arrangement fee, commitment fee
- Risk Assessment: Credit rating, risk category, PD, LGD, expected loss
- Collateral: Type, value, loan-to-value ratio
- Comments and status history

### Security Features
- Password encryption with BCrypt
- JWT token authentication
- Role-based route guards
- Protected API endpoints
- CORS configuration
- Session management

## Development

### Backend
- Run tests: `mvn test`
- Package: `mvn package`
- Debug on port 8080

### Frontend
- Run dev server: `npm start`
- Build: `npm run build`
- Run tests: `npm test`

## Production Deployment

1. Update environment variables in `docker-compose.yml`
2. Change JWT secret
3. Configure MongoDB connection
4. Build production images:

```bash
docker-compose build
docker-compose up -d
```

## License

This project is proprietary software for corporate banking use.

## Support

For issues and questions, contact the development team.
