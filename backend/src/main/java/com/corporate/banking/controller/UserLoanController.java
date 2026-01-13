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
@RequestMapping("/api/user/loans")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('USER', 'ADMIN')")
public class UserLoanController {
    
    private final LoanService loanService;
    
    @PostMapping
    public ResponseEntity<?> createLoan(
        @RequestBody Loan loan,
        @AuthenticationPrincipal UserDetailsImpl userDetails
    ) {
        Loan createdLoan = loanService.createLoan(loan, userDetails.getUsername());
        return ResponseEntity.ok(createdLoan);
    }
    
    @GetMapping
    public ResponseEntity<List<Loan>> getMyLoans(
        @AuthenticationPrincipal UserDetailsImpl userDetails
    ) {
        List<Loan> loans = loanService.getLoansByUser(userDetails.getUsername());
        return ResponseEntity.ok(loans);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getLoanById(@PathVariable String id) {
        return loanService.getLoanById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateLoan(
        @PathVariable String id,
        @RequestBody Loan loan
    ) {
        try {
            Loan updatedLoan = loanService.updateLoan(id, loan);
            return ResponseEntity.ok(updatedLoan);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }
    
    @PostMapping("/{id}/submit")
    public ResponseEntity<?> submitLoan(
        @PathVariable String id,
        @AuthenticationPrincipal UserDetailsImpl userDetails
    ) {
        try {
            Loan loan = loanService.updateLoanStatus(
                id, 
                Loan.LoanStatus.SUBMITTED, 
                userDetails.getUsername(),
                "Loan submitted for approval"
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
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteLoan(@PathVariable String id) {
        try {
            loanService.deleteLoan(id);
            return ResponseEntity.ok(new MessageResponse("Loan deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }
}
