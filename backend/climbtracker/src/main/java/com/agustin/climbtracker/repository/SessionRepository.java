package com.agustin.climbtracker.repository;

import com.agustin.climbtracker.model.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SessionRepository extends JpaRepository<Session, Long> {

    Page<Session> findByUser_Id(Long userId, Pageable pageable);

    Long countByUser_Id(Long userId);
}