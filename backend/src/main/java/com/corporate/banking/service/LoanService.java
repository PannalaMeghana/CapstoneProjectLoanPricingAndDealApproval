package com.corporate.banking.service;

import com.corporate.banking.model.Loan;
import com.corporate.banking.repository.LoanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LoanService {
    
    private final LoanRepository loanRepository;
    
    public Loan createLoan(Loan loan, String username) {
        loan.setCreatedBy(username);
        loan.setCreatedAt(LocalDateTime.now());
        loan.setUpdatedAt(LocalDateTime.now());
        loan.setStatus(Loan.LoanStatus.DRAFT);
        loan.setComments(new ArrayList<>());
        loan.setStatusHistory(new ArrayList<>());
        return loanRepository.save(loan);
    }
    
    public List<Loan> getAllLoans() {
        return loanRepository.findAll();
    }
    
    public List<Loan> getLoansByUser(String username) {
        return loanRepository.findByCreatedBy(username);
    }
    
    public List<Loan> getLoansByStatus(Loan.LoanStatus status) {
        return loanRepository.findByStatus(status);
    }
    
    public Optional<Loan> getLoanById(String id) {
        return loanRepository.findById(id);
    }
    
    public Loan updateLoan(String id, Loan loanDetails) {
        Loan loan = loanRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Loan not found"));
        
        loan.setDealName(loanDetails.getDealName());
        loan.setBorrowerName(loanDetails.getBorrowerName());
        loan.setBorrowerIndustry(loanDetails.getBorrowerIndustry());
        loan.setLoanAmount(loanDetails.getLoanAmount());
        loan.setCurrency(loanDetails.getCurrency());
        loan.setTenorMonths(loanDetails.getTenorMonths());
        loan.setLoanType(loanDetails.getLoanType());
        loan.setPurpose(loanDetails.getPurpose());
        
        loan.setBaseRate(loanDetails.getBaseRate());
        loan.setSpread(loanDetails.getSpread());
        loan.setAllInRate(loanDetails.getAllInRate());
        loan.setArrangementFee(loanDetails.getArrangementFee());
        loan.setCommitmentFee(loanDetails.getCommitmentFee());
        
        loan.setCreditRating(loanDetails.getCreditRating());
        loan.setRiskCategory(loanDetails.getRiskCategory());
        loan.setProbabilityOfDefault(loanDetails.getProbabilityOfDefault());
        loan.setLossGivenDefault(loanDetails.getLossGivenDefault());
        loan.setExpectedLoss(loanDetails.getExpectedLoss());
        
        loan.setCollateralType(loanDetails.getCollateralType());
        loan.setCollateralValue(loanDetails.getCollateralValue());
        loan.setLoanToValue(loanDetails.getLoanToValue());
        
        loan.setRelationshipManager(loanDetails.getRelationshipManager());
        loan.setCreditManager(loanDetails.getCreditManager());
        loan.setRemarks(loanDetails.getRemarks());
        
        loan.setUpdatedAt(LocalDateTime.now());
        
        return loanRepository.save(loan);
    }
    
    public Loan updateLoanStatus(String id, Loan.LoanStatus newStatus, String username, String remarks) {
        Loan loan = loanRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Loan not found"));
        
        Loan.StatusHistory history = new Loan.StatusHistory();
        history.setFromStatus(loan.getStatus());
        history.setToStatus(newStatus);
        history.setChangedBy(username);
        history.setChangedAt(LocalDateTime.now());
        history.setRemarks(remarks);
        
        if (loan.getStatusHistory() == null) {
            loan.setStatusHistory(new ArrayList<>());
        }
        loan.getStatusHistory().add(history);
        
        loan.setStatus(newStatus);
        loan.setUpdatedAt(LocalDateTime.now());
        
        if (newStatus == Loan.LoanStatus.SUBMITTED) {
            loan.setSubmittedAt(LocalDateTime.now());
        } else if (newStatus == Loan.LoanStatus.APPROVED) {
            loan.setApprovedAt(LocalDateTime.now());
        }
        
        return loanRepository.save(loan);
    }
    
    public Loan addComment(String id, String commentText, String username) {
        Loan loan = loanRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Loan not found"));
        
        Loan.Comment comment = new Loan.Comment();
        comment.setCommentBy(username);
        comment.setCommentText(commentText);
        comment.setCommentedAt(LocalDateTime.now());
        
        if (loan.getComments() == null) {
            loan.setComments(new ArrayList<>());
        }
        loan.getComments().add(comment);
        loan.setUpdatedAt(LocalDateTime.now());
        
        return loanRepository.save(loan);
    }
    
    public void deleteLoan(String id) {
        loanRepository.deleteById(id);
    }
}
