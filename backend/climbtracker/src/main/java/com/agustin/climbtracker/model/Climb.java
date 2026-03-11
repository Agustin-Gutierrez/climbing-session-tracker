package com.agustin.climbtracker.model;

import jakarta.persistence.*;
import lombok.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Climb {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String routeName;

    private String grade;

    private int attempts;

    private boolean completed;

    @ManyToOne
    @JoinColumn(name = "session_id")
    @JsonIgnoreProperties({"climbs"})
    private Session session;

}