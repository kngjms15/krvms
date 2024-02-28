--Revised SQL script converted from Oracle DB to MySQL.
-- Drop existing tables if they exist
DROP TABLE IF EXISTS KS_ADMIN_EVENT;
DROP TABLE IF EXISTS KS_VOLUNTEER_EVENT;
DROP TABLE IF EXISTS KS_SPECIALITY;
DROP TABLE IF EXISTS KS_APPLICATION;
DROP TABLE IF EXISTS KS_JOB;

DROP TABLE IF EXISTS KS_ADMINISTRATOR;
DROP TABLE IF EXISTS KS_VOLUNTEER;
DROP TABLE IF EXISTS KS_EVENT;
DROP TABLE IF EXISTS KS_APPLICANT;
DROP TABLE IF EXISTS KS_CHAPTER;
DROP TABLE IF EXISTS KS_ROLES;

-- Create new tables
CREATE TABLE KS_ROLES (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(20) NOT NULL,
    role_description VARCHAR(50),
    role_permission TINYINT NOT NULL,
    role_active TINYINT,
    role_created DATETIME,
    role_last_modified DATETIME
);

CREATE TABLE KS_CHAPTER (
    chapter_id INT AUTO_INCREMENT PRIMARY KEY,
    chapter_name VARCHAR(20) NOT NULL,
    chapter_address VARCHAR(50) NOT NULL,
    chapter_city VARCHAR(50) NOT NULL,
    chapter_province CHAR(2) NOT NULL,
    chapter_postal_code CHAR(6) NOT NULL
);

CREATE TABLE KS_APPLICANT (
    applicant_id INT AUTO_INCREMENT PRIMARY KEY,
    applicant_first_name VARCHAR(50) NOT NULL,
    applicant_last_name VARCHAR(50) NOT NULL,
    applicant_DOB DATETIME NOT NULL,
    applicant_address VARCHAR(50) NOT NULL,
    applicant_city VARCHAR(50) NOT NULL,
    applicant_province CHAR(2) NOT NULL,
    applicant_postal_code CHAR(6) NOT NULL,
    applicant_chapter VARCHAR(20) NOT NULL,
    applicant_phone_number CHAR(10) NOT NULL,
    applicant_secondary_phone_number CHAR(10),
    applicant_email VARCHAR(50) NOT NULL,
    applicant_employer VARCHAR(50),
    applicant_conviction TINYINT,
    applicant_conviction_details VARCHAR(100),
    applicant_bondable TINYINT,
    applicant_med_conditions TINYINT,
    applicant_med_conditions_details VARCHAR(100),
    applicant_emerg_name VARCHAR(50) NOT NULL,
    applicant_emerg_relationship VARCHAR(50),
    applicant_emerg_phone_number CHAR(10) NOT NULL,
    applicant_notes VARCHAR(100),
    interview_status TINYINT NOT NULL,
    chapter_id INT NOT NULL,
    FOREIGN KEY (chapter_id) REFERENCES KS_CHAPTER(chapter_id)
);

CREATE TABLE KS_EVENT (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    event_name VARCHAR(50) NOT NULL,
    event_description VARCHAR(100) NOT NULL,
    event_date DATETIME NOT NULL,
    event_location VARCHAR(50) NOT NULL,
    chapter_id INT NOT NULL,
    FOREIGN KEY (chapter_id) REFERENCES KS_CHAPTER(chapter_id)
);

CREATE TABLE KS_VOLUNTEER (
    volunteer_id INT AUTO_INCREMENT PRIMARY KEY,
    volunteer_first_name VARCHAR(50) NOT NULL,
    volunteer_last_name VARCHAR(50) NOT NULL,
    volunteer_DOB DATETIME NOT NULL,
    volunteer_address VARCHAR(50) NOT NULL,
    volunteer_city VARCHAR(50) NOT NULL,
    volunteer_province CHAR(2) NOT NULL,
    volunteer_chapter VARCHAR(20) NOT NULL,
    volunteer_postal_code CHAR(6) NOT NULL,
    volunteer_phone_number CHAR(10) NOT NULL,
    volunteer_secondary_phone_number CHAR(10),
    volunteer_email VARCHAR(50) NOT NULL,
    volunteer_employer VARCHAR(50),
    volunteer_conviction TINYINT,
    volunteer_conviction_details VARCHAR(100),
    volunteer_bondable TINYINT,
    volunteer_med_conditions TINYINT,
    volunteer_med_conditions_details VARCHAR(100),
    volunteer_emerg_name VARCHAR(50) NOT NULL,
    volunteer_emerg_relationship VARCHAR(50),
    volunteer_emerg_phone_number CHAR(10) NOT NULL,
    volunteer_notes VARCHAR(100),
    chapter_id INT NOT NULL,
    FOREIGN KEY (chapter_id) REFERENCES KS_CHAPTER(chapter_id)
);

CREATE TABLE KS_ADMINISTRATOR (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    admin_first_name VARCHAR(50) NOT NULL,
    admin_last_name VARCHAR(50) NOT NULL,
    admin_email VARCHAR(50) NOT NULL,
    admin_password VARCHAR(100) NOT NULL,
    admin_permission TINYINT NOT NULL,
    chapter_id INT NOT NULL,
    FOREIGN KEY (chapter_id) REFERENCES KS_CHAPTER(chapter_id)
);

CREATE TABLE KS_JOB (
    admin_id INT NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (admin_id, role_id),
    FOREIGN KEY (admin_id) REFERENCES KS_ADMINISTRATOR(admin_id),
    FOREIGN KEY (role_id) REFERENCES KS_ROLES(role_id)
);

CREATE TABLE KS_SPECIALITY (
    volunteer_id INT NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (volunteer_id, role_id),
    FOREIGN KEY (volunteer_id) REFERENCES KS_VOLUNTEER(volunteer_id),
    FOREIGN KEY (role_id) REFERENCES KS_ROLES(role_id)
);

CREATE TABLE KS_APPLICATION (
    applicant_id INT NOT NULL,
    event_id INT NOT NULL,
    PRIMARY KEY (applicant_id, event_id),
    FOREIGN KEY (applicant_id) REFERENCES KS_APPLICANT(applicant_id),
    FOREIGN KEY (event_id) REFERENCES KS_EVENT(event_id)
);

CREATE TABLE KS_VOLUNTEER_EVENT (
    volunteer_id INT NOT NULL,
    event_id INT NOT NULL,
    PRIMARY KEY (volunteer_id, event_id),
    FOREIGN KEY (volunteer_id) REFERENCES KS_VOLUNTEER(volunteer_id),
    FOREIGN KEY (event_id) REFERENCES KS_EVENT(event_id)
);

CREATE TABLE KS_ADMIN_EVENT (
    event_id INT NOT NULL,
    admin_id INT NOT NULL,
    PRIMARY KEY (event_id, admin_id),
    FOREIGN KEY (event_id) REFERENCES KS_EVENT(event_id),
    FOREIGN KEY (admin_id) REFERENCES KS_ADMINISTRATOR(admin_id)
);


