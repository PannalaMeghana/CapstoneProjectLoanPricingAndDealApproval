package com.corporate.banking.init;

import com.corporate.banking.model.User;
import com.corporate.banking.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            // Create default admin user
            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@corporate.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setFirstName("Admin");
            admin.setLastName("User");
            admin.setDesignation("System Administrator");
            admin.setDepartment("IT");
            admin.setRoles(Set.of(User.Role.ROLE_ADMIN, User.Role.ROLE_USER));
            admin.setActive(true);
            admin.setCreatedAt(LocalDateTime.now());
            admin.setUpdatedAt(LocalDateTime.now());
            userRepository.save(admin);
            
            // Create default user
            User user = new User();
            user.setUsername("user");
            user.setEmail("user@corporate.com");
            user.setPassword(passwordEncoder.encode("user123"));
            user.setFirstName("Regular");
            user.setLastName("User");
            user.setDesignation("Relationship Manager");
            user.setDepartment("Corporate Banking");
            user.setRoles(Set.of(User.Role.ROLE_USER));
            user.setActive(true);
            user.setCreatedAt(LocalDateTime.now());
            user.setUpdatedAt(LocalDateTime.now());
            userRepository.save(user);
            
            System.out.println("Default users created:");
            System.out.println("Admin - username: admin, password: admin123");
            System.out.println("User - username: user, password: user123");
        }
    }
}
