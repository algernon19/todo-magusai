-- Users tábla
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role TEXT CHECK(role IN ('admin', 'tester', 'viewer')) DEFAULT 'tester',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Test Cases tábla
CREATE TABLE IF NOT EXISTS test_cases (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  preconditions TEXT,
  priority TEXT CHECK(priority IN ('high', 'medium', 'low')) DEFAULT 'medium',
  status TEXT CHECK(status IN ('draft', 'ready', 'obsolete')) DEFAULT 'draft',
  created_by INTEGER REFERENCES users(id),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Test Steps tábla
CREATE TABLE IF NOT EXISTS test_steps (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  test_case_id INTEGER REFERENCES test_cases(id),
  step_number INTEGER NOT NULL,
  action TEXT NOT NULL,
  expected_result TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Test Executions tábla
CREATE TABLE IF NOT EXISTS test_executions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  test_case_id INTEGER REFERENCES test_cases(id),
  executed_by INTEGER REFERENCES users(id),
  status TEXT CHECK(status IN ('pass', 'fail', 'blocked', 'not_executed')) DEFAULT 'not_executed',
  actual_result TEXT,
  comments TEXT,
  executed_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Alap felhasználó
INSERT OR IGNORE INTO users (username, email, password_hash, role) VALUES
  ('admin', 'admin@example.com', 'password', 'admin'),
  ('tester', 'tester@example.com', 'password', 'tester'),
  ('viewer', 'viewer@example.com', 'password', 'viewer');

-- Alap teszteset
INSERT OR IGNORE INTO test_cases (title, description, preconditions, priority, status, created_by) VALUES
  ('Bejelentkezés teszt', 'A bejelentkezési folyamat tesztelése.', 'A felhasználó regisztrálva van.', 'high', 'ready', 1);

-- Hozzá tartozó lépések
INSERT OR IGNORE INTO test_steps (test_case_id, step_number, action, expected_result) VALUES
  (1, 1, 'Megnyitja a bejelentkezési oldalt', 'Az oldal megjelenik'),
  (1, 2, 'Beírja a felhasználónevet és jelszót', 'Az adatok bekerülnek a mezőkbe'),
  (1, 3, 'Rákattint a Bejelentkezés gombra', 'Sikeres bejelentkezés történik');

-- Példa végrehajtás
INSERT OR IGNORE INTO test_executions (test_case_id, executed_by, status, actual_result, comments) VALUES
  (1, 2, 'pass', 'Sikeres bejelentkezés történt', 'Minden rendben ment');
