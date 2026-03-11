INSERT INTO users (username, email, password, max_grade)
VALUES ('agus', 'agus@test.com', '1234', '6b');

INSERT INTO session (date, gym, user_id)
VALUES ('2026-03-09', 'Bloc Session', 1);

INSERT INTO climb (route_name, grade, attempts, completed, session_id)
VALUES ('Blue Wall', '6a', 3, true, 1);