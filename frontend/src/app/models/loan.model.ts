export interface Loan {
  id?: string
  dealName: string
  borrowerName: string
  borrowerIndustry: string
  loanAmount: number
  currency: string
  tenorMonths: number
  loanType: string
  purpose: string

  baseRate?: number
  spread?: number
  allInRate?: number
  arrangementFee?: number
  commitmentFee?: number

  creditRating?: string
  riskCategory?: string
  probabilityOfDefault?: number
  lossGivenDefault?: number
  expectedLoss?: number

  collateralType?: string
  collateralValue?: number
  loanToValue?: number

  status?: LoanStatus
  createdBy?: string
  assignedTo?: string

  createdAt?: Date
  updatedAt?: Date
  submittedAt?: Date
  approvedAt?: Date

  comments?: Comment[]
  statusHistory?: StatusHistory[]

  relationshipManager?: string
  creditManager?: string
  remarks?: string
}

export enum LoanStatus {
  DRAFT = "DRAFT",
  SUBMITTED = "SUBMITTED",
  UNDER_REVIEW = "UNDER_REVIEW",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  DISBURSED = "DISBURSED",
}

export interface Comment {
  commentBy: string
  commentText: string
  commentedAt: Date
}

export interface StatusHistory {
  fromStatus: LoanStatus
  toStatus: LoanStatus
  changedBy: string
  changedAt: Date
  remarks: string
}
