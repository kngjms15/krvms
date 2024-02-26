DROP TABLE KS_ADMIN_EVENT CASCADE CONSTRAINTS;
DROP TABLE KS_VOLUNTEER_EVENT CASCADE CONSTRAINTS;
DROP TABLE KS_SPECIALITY CASCADE CONSTRAINTS;
DROP TABLE KS_APPLICATION CASCADE CONSTRAINTS;
DROP TABLE KS_JOB CASCADE CONSTRAINTS;

DROP TABLE KS_ADMINISTRATOR CASCADE CONSTRAINTS;
DROP TABLE KS_VOLUNTEER CASCADE CONSTRAINTS;
DROP TABLE KS_EVENT CASCADE CONSTRAINTS;
DROP TABLE KS_APPLICANT CASCADE CONSTRAINTS;
DROP TABLE KS_CHAPTER CASCADE CONSTRAINTS;
DROP TABLE KS_ROLES CASCADE CONSTRAINTS;

CREATE TABLE KS_ROLES (
    role_id NUMBER(9) CONSTRAINT sys_ks_role_id_pk PRIMARY KEY,
    role_name VARCHAR2(20) NOT NULL CONSTRAINT sys_ks_role_name_ck
        CHECK (role_name IN ('ADMIN', 'VOLUNTEER', 'APPLICANT')),
    role_description VARCHAR2(50),
    role_permission NUMBER(1) NOT NULL CONSTRAINT sys_ks_role_permission_ck
        CHECK (role_permission IN (0, 1, 2)),
    role_active NUMBER(1) CONSTRAINT sys_ks_role_active_ck
        CHECK (role_active IN (0, 1)),
    role_created DATE,
    role_last_modified DATE
);

CREATE TABLE KS_CHAPTER (
    chapter_id NUMBER(9) CONSTRAINT sys_ks_chapter_id_pk PRIMARY KEY,
    chapter_name VARCHAR2(20) NOT NULL,
    chapter_address VARCHAR2(50) NOT NULL,
    chapter_city VARCHAR2(50) NOT NULL,
    chapter_province VARCHAR2(2) NOT NULL CONSTRAINT sys_ks_chapter_provinces_ck
        CHECK (chapter_province IN ('AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT')),
    chapter_postal_code VARCHAR2(6) NOT NULL CONSTRAINT sys_ks_chapter_postal_codes_ck
        CHECK (REGEXP_LIKE(chapter_postal_code, '^[A-Za-z][0-9][A-Za-z][0-9][A-Za-z][0-9]$'))
);

CREATE TABLE KS_APPLICANT (
    applicant_id NUMBER(9) CONSTRAINT sys_ks_applicant_id_pk PRIMARY KEY,
    applicant_first_name VARCHAR2(50) NOT NULL,
    applicant_last_name VARCHAR2(50) NOT NULL,
    applicant_DOB DATE NOT NULL,
    applicant_address VARCHAR2(50) NOT NULL,
    applicant_city VARCHAR2(50) NOT NULL,
    applicant_province VARCHAR2(2) NOT NULL CONSTRAINT sys_ks_applicant_province_ck
        CHECK (applicant_province IN ('AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT')),
    applicant_postal_code VARCHAR2(6) NOT NULL CONSTRAINT sys_ks_applicant_postal_code_ck
        CHECK (REGEXP_LIKE(applicant_postal_code, '^[A-Za-z][0-9][A-Za-z][0-9][A-Za-z][0-9]$')),
    applicant_chapter VARCHAR2(20) NOT NULL,
    applicant_phone_number VARCHAR2(10) NOT NULL CONSTRAINT sys_ks_applicant_phone_number_ck
        CHECK (REGEXP_LIKE(applicant_phone_number, '^[0-9]{10}$')),
    applicant_secondary_phone_number VARCHAR2(10) CONSTRAINT sys_ks_applicant_secondary_phone_number_ck
        CHECK (REGEXP_LIKE(applicant_secondary_phone_number, '^[0-9]{10}$')),
    applicant_email VARCHAR2(50) NOT NULL CONSTRAINT sys_ks_applicant_email_address_ck
        CHECK (REGEXP_LIKE(applicant_email, '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$')),
    applicant_employer VARCHAR2(50),
    applicant_conviction NUMBER(1) CONSTRAINT sys_ks_applicant_conviction_ck
        CHECK (applicant_conviction IN (0, 1)),
    applicant_conviction_details VARCHAR2(100),
    applicant_bondable NUMBER(1) CONSTRAINT sys_ks_applicant_bondable_ck
        CHECK (applicant_bondable IN (0, 1)),
    applicant_med_conditions NUMBER(1) CONSTRAINT sys_ks_applicant_med_conditions_ck
        CHECK (applicant_med_conditions IN (0, 1)),
    applicant_med_conditions_details VARCHAR2(100),
    applicant_emerg_name VARCHAR2(50) NOT NULL,
    applicant_emerg_relationship VARCHAR2(50),
    applicant_emerg_phone_number VARCHAR2(10) NOT NULL CONSTRAINT sys_ks_applicant_emerg_phone_number_ck
        CHECK (REGEXP_LIKE(applicant_emerg_phone_number, '^[0-9]{10}$')),
    applicant_notes VARCHAR2(100),
    interview_status VARCHAR2(1) NOT NULL CONSTRAINT sys_ks_applicant_interviewee_status_ck
        CHECK (interview_status IN (0, 1)),
    chapter_id NUMBER(9) NOT NULL CONSTRAINT sys_ks_applicant_chapter_id_fk
        REFERENCES KS_CHAPTER(chapter_id)
);

CREATE TABLE KS_EVENT (
    event_id NUMBER(9) CONSTRAINT sys_ks_event_id_pk PRIMARY KEY,
    event_name VARCHAR2(50) NOT NULL,
    event_description VARCHAR2(100) NOT NULL,
    event_date DATE NOT NULL,
    event_location VARCHAR2(50) NOT NULL,
    chapter_id NUMBER(9) NOT NULL CONSTRAINT sys_ks_event_chapters_id_fk
        REFERENCES KS_CHAPTER(chapter_id)
);

CREATE TABLE KS_VOLUNTEER (
    volunteer_id NUMBER(9) CONSTRAINT sys_ks_volunteer_id_pk PRIMARY KEY,
    volunteer_first_name VARCHAR2(50) NOT NULL,
    volunteer_last_name VARCHAR2(50) NOT NULL,
    volunteer_DOB DATE NOT NULL,
    volunteer_address VARCHAR2(50) NOT NULL,
    volunteer_city VARCHAR2(50) NOT NULL,
    volunteer_province VARCHAR2(2) NOT NULL CONSTRAINT sys_ks_volunteer_province_ck
        CHECK (volunteer_province IN ('AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT')),
    volunteer_chapter VARCHAR2(20) NOT NULL,
    volunteer_postal_code VARCHAR2(6) NOT NULL CONSTRAINT sys_ks_volunteer_postal_code_ck
        CHECK (REGEXP_LIKE(volunteer_postal_code, '^[A-Za-z][0-9][A-Za-z][0-9][A-Za-z][0-9]$')),
    volunteer_phone_number VARCHAR2(10) NOT NULL CONSTRAINT sys_ks_volunteer_phone_number_ck
        CHECK (REGEXP_LIKE(volunteer_phone_number, '^[0-9]{10}$')),
    volunteer_secondary_phone_number VARCHAR2(10) CONSTRAINT sys_ks_volunteer_secondary_phone_number_ck
        CHECK (REGEXP_LIKE(volunteer_secondary_phone_number, '^[0-9]{10}$')),
    volunteer_email VARCHAR2(50) NOT NULL CONSTRAINT sys_ks_volunteer_email_address_ck
        CHECK (REGEXP_LIKE(volunteer_email, '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$')),
    volunteer_employer VARCHAR2(50),
    volunteer_conviction NUMBER(1) CONSTRAINT sys_ks_volunteer_conviction_ck
        CHECK (volunteer_conviction IN (0, 1)),
    volunteer_conviction_details VARCHAR2(100),
    volunteer_bondable NUMBER(1) CONSTRAINT sys_ks_volunteer_bondable_ck
        CHECK (volunteer_bondable IN (0, 1)),
    volunteer_med_conditions NUMBER(1) CONSTRAINT sys_ks_volunteer_med_conditions_ck
        CHECK (volunteer_med_conditions IN (0, 1)),
    volunteer_med_conditions_details VARCHAR2(100),
    volunteer_emerg_name VARCHAR2(50) NOT NULL,
    volunteer_emerg_relationship VARCHAR2(50),
    volunteer_emerg_phone_number VARCHAR2(10) NOT NULL CONSTRAINT sys_ks_volunteer_emerg_phone_number_ck
        CHECK (REGEXP_LIKE(volunteer_emerg_phone_number, '^[0-9]{10}$')),
    volunteer_notes VARCHAR2(100),
    chapter_id NUMBER(9) NOT NULL CONSTRAINT sys_ks_volunteer_chapter_id_fk
        REFERENCES KS_CHAPTER(chapter_id)
);

CREATE TABLE KS_ADMINISTRATOR (
    admin_id NUMBER(9) CONSTRAINT sys_ks_administrator_id_pk PRIMARY KEY,
    admin_first_name VARCHAR2(50) NOT NULL,
    admin_last_name VARCHAR2(50) NOT NULL,
    admin_email VARCHAR2(50) NOT NULL CONSTRAINT sys_ks_admin_email_addresses_ck
        CHECK (REGEXP_LIKE(admin_email, '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$')),
    admin_password VARCHAR2(100) NOT NULL CONSTRAINT sys_ks_admin_passwords_ck
        CHECK (REGEXP_LIKE(admin_password, '/^[a-zA-Z0-9._%+-]{8,}$/')),
    admin_permission NUMBER(1) NOT NULL CONSTRAINT sys_ks_admin_permissions_ck
        CHECK (admin_permission IN (0, 1, 2)),
    chapter_id NUMBER(9) NOT NULL CONSTRAINT sys_ks_admin_chapters_id_fk
        REFERENCES KS_CHAPTER(chapter_id)
);


CREATE TABLE KS_JOB (
   admin_id NUMBER(9) NOT NULL CONSTRAINT sys_ks_job_admin_id_fk
        REFERENCES KS_ADMINISTRATOR(admin_id),
    role_id NUMBER(9) NOT NULL CONSTRAINT sys_ks_job_role_id_fk
        REFERENCES KS_ROLES(role_id),
    CONSTRAINT job_pk PRIMARY KEY (admin_id, role_id)
);

CREATE TABLE KS_SPECIALITY(
    volunteer_id NUMBER(9) NOT NULL CONSTRAINT sys_ks_speciality_volunteer_id_fk
        REFERENCES KS_VOLUNTEER(volunteer_id),
    role_id NUMBER(9) NOT NULL CONSTRAINT sys_ks_speciality_role_id_fk
        REFERENCES KS_ROLES(role_id),
    CONSTRAINT speciality_pk PRIMARY KEY (volunteer_id, role_id)
);

CREATE TABLE KS_APPLICATION(
    applicant_id NUMBER(9) NOT NULL CONSTRAINT sys_ks_application_applicant_id_fk
        REFERENCES KS_APPLICANT(applicant_id),
    event_id NUMBER(9) NOT NULL CONSTRAINT sys_ks_application_event_id_fk
        REFERENCES KS_EVENT(event_id),
    CONSTRAINT application_pk PRIMARY KEY (applicant_id, event_id)
);

CREATE TABLE KS_VOLUNTEER_EVENT(
    volunteer_id NUMBER(9) NOT NULL CONSTRAINT sys_ks_volunteer_event_volunteer_id_fk
        REFERENCES KS_VOLUNTEER(volunteer_id),
    event_id NUMBER(9) NOT NULL CONSTRAINT sys_ks_volunteer_event_event_id_fk
        REFERENCES KS_EVENT(event_id),
    CONSTRAINT volunteer_event_pk PRIMARY KEY (volunteer_id, event_id)
);

CREATE TABLE KS_ADMIN_EVENT(
    event_id NUMBER(9) NOT NULL CONSTRAINT sys_ks_admin_event_events_id_fk
        REFERENCES KS_EVENT(event_id),
    admin_id NUMBER (9) NOT NULL CONSTRAINT sys_ks_admin_event_admins_id_fk
        REFERENCES KS_ADMINISTRATOR(admin_id),
    CONSTRAINT sys_ks_admin_event_pk PRIMARY KEY (event_id, admin_id)
);
