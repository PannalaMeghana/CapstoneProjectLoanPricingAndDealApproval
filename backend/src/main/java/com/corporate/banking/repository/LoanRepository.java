package com.corporate.banking.repository;

import com.corporate.banking.model.Loan;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoanRepository extends MongoRepository<Loan, String> {
    List<Loan> findByCreatedBy(String createdBy);
    List<Loan> findByStatus(Loan.LoanStatus status);
    List<Loan> findByAssignedTo(String assignedTo);
}
