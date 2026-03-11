package com.agustin.climbtracker.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    private String gym;

    @ManyToOne
    private User user;

    @OneToMany(mappedBy = "session", cascade = CascadeType.ALL)
    @Builder.Default
    @JsonIgnore
    private List<Climb> climbs = new ArrayList<>();
}