package com.agustin.climbtracker.service;

import com.agustin.climbtracker.model.Climb;
import com.agustin.climbtracker.model.Session;
import com.agustin.climbtracker.repository.ClimbRepository;
import com.agustin.climbtracker.repository.SessionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClimbService {

    private final ClimbRepository climbRepository;
    private final SessionRepository sessionRepository;

    public ClimbService(ClimbRepository climbRepository,
                        SessionRepository sessionRepository) {
        this.climbRepository = climbRepository;
        this.sessionRepository = sessionRepository;
    }

    // -------------------------
    // Add climb
    // -------------------------

    public Climb addClimbToSession(Long sessionId, Climb climb) {

        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found"));

        climb.setSession(session);

        return climbRepository.save(climb);
    }

    // -------------------------
    // Climbs by session
    // -------------------------

    public List<Climb> getClimbsBySession(Long sessionId) {
        return climbRepository.findBySession_Id(sessionId);
    }

    // -------------------------
    // Climbs by user (para el gráfico)
    // -------------------------

    public List<Climb> getClimbsByUser(Long userId) {
        return climbRepository.findBySession_User_Id(userId);
    }

    // -------------------------
    // Stats
    // -------------------------

    public Long getTotalClimbsByUser(Long userId) {
        return climbRepository.countBySession_User_Id(userId);
    }

    public Long getCompletedClimbsByUser(Long userId) {
        return climbRepository.countBySession_User_IdAndCompletedTrue(userId);
    }
}