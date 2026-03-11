package com.agustin.climbtracker.repository;

import com.agustin.climbtracker.model.Climb;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClimbRepository extends JpaRepository<Climb, Long> {

    Long countBySession_User_Id(Long userId);

    Long countBySession_User_IdAndCompletedTrue(Long userId);

    List<Climb> findBySession_User_Id(Long userId);

    // NEW
    List<Climb> findBySession_Id(Long sessionId);
}