package com.corporate.banking.controller;

import com.corporate.banking.dto.MessageResponse;
import com.corporate.banking.model.Loan;
import com.corporate.banking.security.UserDetailsImpl;
import com.corporate.banking.service.LoanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/loans")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@PreAuthorize("hasRole('ADMIN')")
public class AdminLoanController {
    
    private final LoanService loanService;
    
    @GetMapping
    public ResponseEntity<List<Loan>> getAllLoans() {
        List<Loan> loans = loanService.getAllLoans();
        return ResponseEntity.ok(loans);
    }
    
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Loan>> getLoansByStatus(@PathVariable String status) {
        try {
            Loan.LoanStatus loanStatus = Loan.LoanStatus.valueOf(status.toUpperCase());
            List<Loan> loans = loanService.getLoansByStatus(loanStatus);
            return ResponseEntity.ok(loans);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getLoanById(@PathVariable String id) {
        return loanService.getLoanById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping("/{id}/approve")
    public ResponseEntity<?> approveLoan(
        @PathVariable String id,
        @RequestBody(required = false) Map<String, String> payload,
        @AuthenticationPrincipal UserDetailsImpl userDetails
    ) {
        try {
            String remarks = payload != null ? payload.getOrDefault("remarks", "Approved") : "Approved";
            Loan loan = loanService.updateLoanStatus(
                id, 
                Loan.LoanStatus.APPROVED, 
                userDetails.getUsername(),
                remarks
            );
            return ResponseEntity.ok(loan);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }
    
    @PostMapping("/{id}/reject")
    public ResponseEntity<?> rejectLoan(
        @PathVariable String id,
        @RequestBody(required = false) Map<String, String> payload,
        @AuthenticationPrincipal UserDetailsImpl userDetails
    ) {
        try {
            String remarks = payload != null ? payload.getOrDefault("remarks", "Rejected") : "Rejected";
            Loan loan = loanService.updateLoanStatus(
                id, 
                Loan.LoanStatus.REJECTED, 
                userDetails.getUsername(),
                remarks
            );
            return ResponseEntity.ok(loan);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }
    
    @PostMapping("/{id}/review")
    public ResponseEntity<?> setUnderReview(
        @PathVariable String id,
        @AuthenticationPrincipal UserDetailsImpl userDetails
    ) {
        try {
            Loan loan = loanService.updateLoanStatus(
                id, 
                Loan.LoanStatus.UNDER_REVIEW, 
                userDetails.getUsername(),
                "Under review by credit team"
            );
            return ResponseEntity.ok(loan);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }
    
    @PostMapping("/{id}/comments")
    public ResponseEntity<?> addComment(
        @PathVariable String id,
        @RequestBody Map<String, String> payload,
        @AuthenticationPrincipal UserDetailsImpl userDetails
    ) {
        try {
            String commentText = payload.get("comment");
            Loan loan = loanService.addComment(id, commentText, userDetails.getUsername());
            return ResponseEntity.ok(loan);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }
}
