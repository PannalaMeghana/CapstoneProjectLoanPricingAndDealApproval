package com.corporate.banking.service;

import com.corporate.banking.model.User;
import com.corporate.banking.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    void getAllUsers_shouldReturnList() {
        User user = new User();
        user.setId("1");
        when(userRepository.findAll()).thenReturn(List.of(user));

        List<User> users = userService.getAllUsers();

        assertThat(users).hasSize(1);
        assertThat(users.get(0).getId()).isEqualTo("1");
    }

    @Test
    void getUserById_shouldReturnOptionalUser() {
        User user = new User();
        user.setId("1");
        when(userRepository.findById("1")).thenReturn(Optional.of(user));

        Optional<User> result = userService.getUserById("1");

        assertThat(result).isPresent();
        assertThat(result.get().getId()).isEqualTo("1");
    }

    @Test
    void getUserByUsername_shouldReturnOptionalUser() {
        User user = new User();
        user.setUsername("john");
        when(userRepository.findByUsername("john")).thenReturn(Optional.of(user));

        Optional<User> result = userService.getUserByUsername("john");

        assertThat(result).isPresent();
        assertThat(result.get().getUsername()).isEqualTo("john");
    }

    @Test
    void updateUser_shouldUpdateAndReturnUser() {
        User existingUser = new User();
        existingUser.setId("1");
        existingUser.setFirstName("Old");
        existingUser.setRoles(Set.of(User.Role.ROLE_USER));

        User updatedDetails = new User();
        updatedDetails.setFirstName("New");
        updatedDetails.setLastName("Name");
        updatedDetails.setEmail("test@test.com");
        updatedDetails.setDesignation("Manager");
        updatedDetails.setDepartment("Finance");
        updatedDetails.setRoles(Set.of(User.Role.ROLE_ADMIN));
        updatedDetails.setActive(true);

        when(userRepository.findById("1")).thenReturn(Optional.of(existingUser));
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        User updatedUser = userService.updateUser("1", updatedDetails);

        assertThat(updatedUser.getFirstName()).isEqualTo("New");
        assertThat(updatedUser.getRoles()).contains(User.Role.ROLE_ADMIN);
        verify(userRepository).save(existingUser);
    }

    @Test
    void updateUser_whenUserNotFound_shouldThrowException() {
        when(userRepository.findById("99")).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> userService.updateUser("99", new User()));

        assertThat(exception.getMessage()).isEqualTo("User not found");
    }

    @Test
    void deleteUser_shouldCallRepositoryDelete() {
        doNothing().when(userRepository).deleteById("1");

        userService.deleteUser("1");

        verify(userRepository, times(1)).deleteById("1");
    }
}
