package com.agustin.climbtracker.service;

import com.agustin.climbtracker.model.Session;
import com.agustin.climbtracker.repository.SessionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SessionService {

    private final SessionRepository sessionRepository;

    public SessionService(SessionRepository sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    public Session createSession(Session session) {
        return sessionRepository.save(session);
    }

    public List<Session> getAllSessions() {
        return sessionRepository.findAll();
    }

    public Session getSessionById(Long id) {
        return sessionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Session not found"));
    }

    public Page<Session> getUserSessions(Long userId, Pageable pageable) {
        return sessionRepository.findByUser_Id(userId, pageable);
    }

    public void deleteSession(Long id) {
        sessionRepository.deleteById(id);
    }
}