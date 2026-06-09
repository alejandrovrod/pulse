-- database.sql

CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    author VARCHAR(255) DEFAULT 'Anonymous',
    content TEXT NOT NULL,
    likes INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
