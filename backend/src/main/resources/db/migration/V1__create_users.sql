-- V1: Create users and sessions table
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'viewer',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed initial test accounts (matching frontend and documentation defaults)
INSERT INTO users (username, email, password_hash, role)
VALUES 
    ('operator', 'operator@payresolve.dev', 'operator123', 'operator'),
    ('viewer', 'viewer@payresolve.dev', 'viewer123', 'viewer')
ON CONFLICT (username) DO NOTHING;

CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
