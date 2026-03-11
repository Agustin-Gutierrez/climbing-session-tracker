package com.agustin.climbtracker.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserStatsDTO {

    private Long totalSessions;
    private Long totalClimbs;
    private Long completedClimbs;
    private Double completionRate;
    private String bestGrade;

}