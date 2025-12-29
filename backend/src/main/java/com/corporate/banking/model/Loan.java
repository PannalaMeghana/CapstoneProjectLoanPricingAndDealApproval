package com.corporate.banking.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "loans")
public class Loan {
    @Id
    private String id;
    
    private String dealName;
    private String borrowerName;
    private String borrowerIndustry;
    private Double loanAmount;
    private String currency;
    private Integer tenorMonths;
    private String loanType;
    private String purpose;
    
    // Pricing Details
    private Double baseRate;
    private Double spread;
    private Double allInRate;
    private Double arrangementFee;
    private Double commitmentFee;
    
    // Risk Metrics
    private String creditRating;
    private String riskCategory;
    private Double probabilityOfDefault;
    private Double lossGivenDefault;
    private Double expectedLoss;
    
    // Collateral
    private String collateralType;
    private Double collateralValue;
    private Double loanToValue;
    
    // Status and Workflow
    private LoanStatus status;
    private String createdBy;
    private String assignedTo;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime submittedAt;
    private LocalDateTime approvedAt;
    
    // Comments and History
    private List<Comment> comments;
    private List<StatusHistory> statusHistory;
    
    // Additional Fields
    private String relationshipManager;
    private String creditManager;
    private String remarks;
    
    public enum LoanStatus {
        DRAFT,
        SUBMITTED,
        UNDER_REVIEW,
        APPROVED,
        REJECTED,
        DISBURSED
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Comment {
        private String commentBy;
        private String commentText;
        private LocalDateTime commentedAt;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class StatusHistory {
        private LoanStatus fromStatus;
        private LoanStatus toStatus;
        private String changedBy;
        private LocalDateTime changedAt;
        private String remarks;
    }
}
