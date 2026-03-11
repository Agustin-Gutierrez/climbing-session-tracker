package com.agustin.climbtracker.controller;

import com.agustin.climbtracker.model.User;
import com.agustin.climbtracker.service.UserService;
import org.springframework.web.bind.annotation.*;

import com.agustin.climbtracker.dto.UserStatsDTO;
import com.agustin.climbtracker.service.StatsService;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final StatsService statsService;

    public UserController(UserService userService, StatsService statsService) {
        this.userService = userService;
        this.statsService = statsService;
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @GetMapping
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("/{id}/stats")
    public UserStatsDTO getUserStats(@PathVariable Long id) {
        return statsService.getUserStats(id);
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }
}
