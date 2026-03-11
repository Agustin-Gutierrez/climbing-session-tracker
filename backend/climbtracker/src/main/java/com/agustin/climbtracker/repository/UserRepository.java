package com.agustin.climbtracker.repository;

import com.agustin.climbtracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import com.agustin.climbtracker.repository.UserRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

}