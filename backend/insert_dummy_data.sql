-- ===== INSERT DATA DUMMY =====
-- Script ini untuk menambahkan data dummy ke database

-- Insert Users
INSERT INTO users (username, password) VALUES 
('admin', 'admin'),
('user1', 'password123'),
('user2', 'pass456');

-- Insert Projects
INSERT INTO projects (title, tech, status) VALUES 
('Portfolio Web', 'React', 'Active'),
('POS Dashboard', 'Node.js', 'Draft'),
('Mobile App', 'React Native', 'In Progress'),
('E-Commerce Platform', 'MERN Stack', 'Active'),
('Chat Application', 'Socket.io + React', 'Draft');

-- Verify data
SELECT 'USERS:' as data_type;
SELECT * FROM users;

SELECT '' as separator;
SELECT 'PROJECTS:' as data_type;
SELECT * FROM projects;
