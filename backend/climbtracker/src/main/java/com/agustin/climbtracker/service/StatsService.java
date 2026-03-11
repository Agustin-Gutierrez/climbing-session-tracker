package com.agustin.climbtracker.service;

import com.agustin.climbtracker.dto.UserStatsDTO;
import com.agustin.climbtracker.model.Climb;
import com.agustin.climbtracker.repository.ClimbRepository;
import com.agustin.climbtracker.repository.SessionRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class StatsService {

    private final SessionRepository sessionRepository;
    private final ClimbRepository climbRepository;

    public StatsService(SessionRepository sessionRepository,
                        ClimbRepository climbRepository) {
        this.sessionRepository = sessionRepository;
        this.climbRepository = climbRepository;
    }

    public UserStatsDTO getUserStats(Long userId) {

        Long totalSessions = sessionRepository.countByUser_Id(userId);
        Long totalClimbs = climbRepository.countBySession_User_Id(userId);
        Long completedClimbs = climbRepository.countBySession_User_IdAndCompletedTrue(userId);

        double completionRate = 0.0;

        if (totalClimbs != null && totalClimbs > 0) {
            completionRate = (completedClimbs.doubleValue() / totalClimbs.doubleValue()) * 100;
        }

        List<Climb> climbs = climbRepository.findBySession_User_Id(userId);

        String bestGrade = climbs.stream()
                .map(Climb::getGrade)
                .max(Comparator.naturalOrder())
                .orElse("None");

        return UserStatsDTO.builder()
                .totalSessions(totalSessions)
                .totalClimbs(totalClimbs)
                .completedClimbs(completedClimbs)
                .completionRate(completionRate)
                .bestGrade(bestGrade)
                .build();
    }
}