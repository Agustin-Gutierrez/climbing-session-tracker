package com.agustin.climbtracker.controller;

import com.agustin.climbtracker.model.Session;
import com.agustin.climbtracker.service.SessionService;

import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

@RestController
@RequestMapping("/api/sessions")
@CrossOrigin(origins = "*")
public class SessionController {

    private final SessionService sessionService;

    public SessionController(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @PostMapping
    public Session createSession(@RequestBody Session session) {
        return sessionService.createSession(session);
    }

    @GetMapping
    public List<Session> getSessions() {
        return sessionService.getAllSessions();
    }

    @GetMapping("/{id}")
    public Session getSession(@PathVariable Long id) {
        return sessionService.getSessionById(id);
    }

    @GetMapping("/users/{userId}/sessions")
    public Page<Session> getUserSessions(
            @PathVariable Long userId,
            Pageable pageable
    ) {
        return sessionService.getUserSessions(userId, pageable);
    }

    @DeleteMapping("/{id}")
    public void deleteSession(@PathVariable Long id) {
        sessionService.deleteSession(id);
    }
}