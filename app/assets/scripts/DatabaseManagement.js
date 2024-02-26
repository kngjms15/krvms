import pool from "./db";
import { bondable, employer, conviction, convictionDetails, medicalCondition,
         medicalConditionDetails, emergencyContactName, emergencyContactRelationShip,
         emergencyContactPhone, otherNotes } from "../../registration/VolunteerRegistration/BackgroundInfo";


const mysql = require('mysql');

const connection = mysql.createConnection({
  connectionLimit: pool.connectionLimit,
  host: pool.host,
  user: pool.user,
  password: pool.password,
  database: pool.database
});

function storeUserInfo() {
    
    const fName = document.getElementById('first-name').value;
    const lName = document.getElementById('last-name').value;
    const dob = document.getElementById('dob').value;
    const address = document.getElementById('street-address').value;
    const city = document.getElementById('city').value;
    const province = document.getElementById('first-name').value;
    const postalCode = document.getElementById('postal-code').value;
    
    const chapter = document.getElementById('chapter');
    const chapterValue = chapter.options[chapter.selectedIndex].value;

    const primaryPhone = document.getElementById('primary-phone').value;
    const secondaryPhone = document.getElementById('secondary-phone').value;
    const email = document.getElementById('email').value;
    const bondableValue = (bondable==true)?0:1;
    const convictionValue = (conviction==true)?0:1;
    const medCondition = (medicalCondition==true)?0:1;
    const interviewStatus = 0;
    let chapterId;

    connection.connect();

    connection.query('SELECT applicant_id FROM KS_APPLICANT ORDER BY applicant_id DESC LIMIT 1',(error,result)=>{
        if(error) throw error;

        connection.query(`SELECT chapter_id FROM KS_CHAPTER WHERE chapter_name = '${chapterValue}'`,(error, returnal)=>{
            if(error) throw error;

            const nextId = result[0] + 1;
            chapterId = returnal;

            const statement = 'INSERT INTO APPLICANT (applicant_id, applicant_first_name, applicant_last_name, applicant_DOB, applicant_address, applicant_city, '+ 
                               'applicant_province, applicant_postal_code, applicant_chapter, applicant_phone_number, applicant_secondary_phone_number, applicant_email, '+
                               'application_employer, application_conviction, application_conviction_details, application_bondable, application_med_conditions, '+
                               'application_med_conditions_details, applicant_emerg_name, applicant_emerg_relationship, applicant_emerg_phone_number, applicant_notes, '+
                               'interview_status, chapter_id) '+ 
                               `VALUES (${nextId},${fName},${lName},${dob},${address},${city},${province},${postalCode},${chapterValue},${primaryPhone},${secondaryPhone}`+
                               `,${email},${employer},${convictionValue},${convictionDetails},${bondableValue},${medCondition},${medicalConditionDetails},${emergencyContactName}`+
                               `,${emergencyContactRelationShip},${emergencyContactPhone},${otherNotes},${interviewStatus},${chapterId})`;
        
            connection.query(statement,(error)=> {
                if(error) throw error;
    
                console.log(`Inserted info into row:${nextId} of table KS_APPLICANT`)
            })
        });
    });
}