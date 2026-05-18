-- Dashboard Project PostgreSQL Schema

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL UNIQUE,
    tech VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Draft',
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_status CHECK (status IN ('Active', 'Draft', 'In Progress', 'Completed')),
    CONSTRAINT title_length CHECK (char_length(trim(title)) >= 3),
    CONSTRAINT tech_length CHECK (char_length(trim(tech)) >= 2)
);

-- Indexes untuk performa
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX idx_users_username ON users(username);
