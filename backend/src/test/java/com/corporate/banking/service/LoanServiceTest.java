package com.corporate.banking.service;

import com.corporate.banking.model.Loan;
import com.corporate.banking.repository.LoanRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class LoanServiceTest {

    @Mock
    private LoanRepository loanRepository;

    @InjectMocks
    private LoanService loanService;

    private Loan loan;

    @BeforeEach
    void setUp() {
        loan = new Loan();
        loan.setId("loan123");
        loan.setDealName("Test Deal");
        loan.setLoanAmount(100000.0);
        loan.setCreatedBy("user1");
        loan.setStatus(Loan.LoanStatus.DRAFT);
    }

    @Test
    void createLoan_shouldSetDefaultsAndSave() {
        when(loanRepository.save(any(Loan.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        Loan saved = loanService.createLoan(loan, "user1");

        assertThat(saved.getCreatedBy()).isEqualTo("user1");
        assertThat(saved.getStatus()).isEqualTo(Loan.LoanStatus.DRAFT);
        assertThat(saved.getCreatedAt()).isNotNull();
        assertThat(saved.getUpdatedAt()).isNotNull();

        verify(loanRepository).save(any(Loan.class));
    }


    @Test
    void getAllLoans_shouldReturnList() {
        when(loanRepository.findAll()).thenReturn(List.of(loan));

        List<Loan> loans = loanService.getAllLoans();

        assertThat(loans).hasSize(1);
        verify(loanRepository).findAll();
    }

    @Test
    void getLoansByUser_shouldReturnUserLoans() {
        when(loanRepository.findByCreatedBy("user1")).thenReturn(List.of(loan));

        List<Loan> loans = loanService.getLoansByUser("user1");

        assertThat(loans).hasSize(1);
        verify(loanRepository).findByCreatedBy("user1");
    }

    @Test
    void getLoansByStatus_shouldReturnStatusLoans() {
        when(loanRepository.findByStatus(Loan.LoanStatus.DRAFT))
                .thenReturn(List.of(loan));

        List<Loan> loans = loanService.getLoansByStatus(Loan.LoanStatus.DRAFT);

        assertThat(loans).hasSize(1);
        verify(loanRepository).findByStatus(Loan.LoanStatus.DRAFT);
    }

    @Test
    void getLoanById_shouldReturnLoan() {
        when(loanRepository.findById("loan123"))
                .thenReturn(Optional.of(loan));

        Optional<Loan> result = loanService.getLoanById("loan123");

        assertThat(result).isPresent();
        verify(loanRepository).findById("loan123");
    }

    @Test
    void updateLoan_shouldUpdateFields() {
        Loan updated = new Loan();
        updated.setDealName("Updated Deal");
        updated.setLoanAmount(200000.0);

        when(loanRepository.findById("loan123"))
                .thenReturn(Optional.of(loan));
        when(loanRepository.save(any(Loan.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        Loan result = loanService.updateLoan("loan123", updated);

        assertThat(result.getDealName()).isEqualTo("Updated Deal");
        assertThat(result.getLoanAmount()).isEqualTo(200000.0);
        verify(loanRepository).save(loan);
    }


    @Test
    void updateLoanStatus_shouldSubmitLoan() {
        when(loanRepository.findById("loan123"))
                .thenReturn(Optional.of(loan));
        when(loanRepository.save(any(Loan.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        Loan result = loanService.updateLoanStatus(
                "loan123",
                Loan.LoanStatus.SUBMITTED,
                "user1",
                "Submitting loan"
        );

        assertThat(result.getStatus()).isEqualTo(Loan.LoanStatus.SUBMITTED);
        assertThat(result.getSubmittedAt()).isNotNull();
        assertThat(result.getStatusHistory()).hasSize(1);
    }

    @Test
    void updateLoanStatus_shouldApproveLoan() {
        loan.setStatus(Loan.LoanStatus.SUBMITTED);

        when(loanRepository.findById("loan123"))
                .thenReturn(Optional.of(loan));
        when(loanRepository.save(any(Loan.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        Loan result = loanService.updateLoanStatus(
                "loan123",
                Loan.LoanStatus.APPROVED,
                "admin",
                "Approved"
        );

        assertThat(result.getStatus()).isEqualTo(Loan.LoanStatus.APPROVED);
        assertThat(result.getApprovedAt()).isNotNull();
    }


    @Test
    void addComment_shouldAddComment() {
        when(loanRepository.findById("loan123"))
                .thenReturn(Optional.of(loan));
        when(loanRepository.save(any(Loan.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        Loan result = loanService.addComment("loan123", "Looks good", "admin");

        assertThat(result.getComments()).hasSize(1);
        assertThat(result.getComments().get(0).getCommentText())
                .isEqualTo("Looks good");
    }


    @Test
    void deleteLoan_shouldDeleteLoan() {
        doNothing().when(loanRepository).deleteById("loan123");

        loanService.deleteLoan("loan123");

        verify(loanRepository).deleteById("loan123");
    }
}
