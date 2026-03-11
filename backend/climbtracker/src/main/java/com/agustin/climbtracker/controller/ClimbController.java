package com.agustin.climbtracker.controller;

import com.agustin.climbtracker.model.Climb;
import com.agustin.climbtracker.model.User;
import com.agustin.climbtracker.repository.UserRepository;
import com.agustin.climbtracker.service.ClimbService;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/climbs")
@CrossOrigin(origins = "*")
public class ClimbController {

    private final ClimbService climbService;
    private final UserRepository userRepository;

    public ClimbController(ClimbService climbService, UserRepository userRepository) {
        this.climbService = climbService;
        this.userRepository = userRepository;
    }

    // -------------------------
    // Add climb to session
    // -------------------------

    @PostMapping("/session/{sessionId}")
    public Climb addClimb(@PathVariable Long sessionId,
                          @RequestBody Climb climb) {

        return climbService.addClimbToSession(sessionId, climb);
    }

    // -------------------------
    // Get climbs for logged user
    // -------------------------

    @GetMapping("/my")
    public List<Climb> getMyClimbs(Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository
                .findByEmail(email)
                .orElseThrow();

        return climbService.getClimbsByUser(user.getId());
    }

    // -------------------------
    // Get climbs by session
    // -------------------------

    @GetMapping("/session/{sessionId}")
    public List<Climb> getClimbsBySession(@PathVariable Long sessionId) {
        return climbService.getClimbsBySession(sessionId);
    }

    // -------------------------
    // Stats for logged user
    // -------------------------

    @GetMapping("/stats")
    public Map<String, Long> getStats(Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository
                .findByEmail(email)
                .orElseThrow();

        Long total = climbService.getTotalClimbsByUser(user.getId());
        Long completed = climbService.getCompletedClimbsByUser(user.getId());

        Map<String, Long> stats = new HashMap<>();

        stats.put("total", total);
        stats.put("completed", completed);

        return stats;
    }

}