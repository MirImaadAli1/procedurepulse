

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const { useState } = require('react');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'dbsop.crclrhhtf2hs.eu-north-1.rds.amazonaws.com',
  port: '3306',
  user: 'admin',
  password: 'Rdssop123',
  database: 'SOP'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to the database');
  }
});


app.get('/methoddetails/:requiredMethod', (req, res) => {
  const methodName = req.params.requiredMethod; // Get methodName from URL parameter
  console.log(methodName);

  // Replace with your actual database query to retrieve method details
  const query = 'SELECT method_name, method_id, method_maker_name, method_date FROM created_methods WHERE method_name = ?'; // Modify this query

  db.query(query, [methodName], async (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      res.status(500).json({ error: 'Database query error' });
    } else {
      if (results.length > 0) {
        const methodDetailsArray = results.map(result => ({
          method_name: result.method_name,
          method_id: result.method_id,
          method_maker_name: result.method_maker_name,
          method_date: result.method_date
        // Add more queries or processing as needed
        }));


        console.log(methodDetailsArray);
        res.json(methodDetailsArray);
      } else {
        res.status(404).json({ error: 'Method not found' });
      }
    }
  });
});



app.post('/methods', async (req, res) => {
  try {
    const { methodId, userId, methodMaker, methodName, creationDate, questions } = req.body;

    console.log("workingvarible",methodMaker);

    // Start a transaction
    await new Promise((resolve, reject) => {
      db.beginTransaction((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    // Insert survey data into the 'surveys' table
    const surveyQuery = 'INSERT INTO created_methods (method_id, method_name, method_maker_id, method_maker_name, method_date) VALUES (?, ?, ?, ?, ?)';
    await db.query(surveyQuery, [methodId, methodName, userId, methodMaker, creationDate]);

    // Insert questions into the 'questions' table using Promise.all
    const questionsQuery = 'INSERT INTO questions (method_id, question_text) VALUES (?, ?)';
    await Promise.all(
      questions.map(async (question) => {
        await db.query(questionsQuery, [methodId, question.text]);
      })
    );

    // Commit the transaction
    await new Promise((resolve, reject) => {
      db.commit((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    res.json({ message: 'Survey created successfully' });
  } catch (error) {
    console.error('Error creating survey:', error);
    // Rollback the transaction in case of an error
    await new Promise((resolve) => db.rollback(() => resolve()));
    res.status(500).json({ error: 'Error creating survey' });
  }
});

// Import necessary modules

app.put("/surveyresponses", async (req, res) => {
  const { surveyId, responses } = req.body;

  try {
    console.log("Updating responses and photos...");

    await new Promise((resolve, reject) => {
      db.beginTransaction((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    const updateResponseQuery = `
    UPDATE questions
    SET answer = ?, comments = ?, upload_photo = ?
    WHERE survey_id = ? AND question_id = ?
  `;

    await Promise.all(
      responses.map(async (response) => {
        const { question_id, answer, comments, photo } = response;
        console.log(`Updating response for question ID ${question_id}`);

        const queryParams = [answer, comments, photo, surveyId, question_id];

        await db.query(updateResponseQuery, queryParams);

        console.log(`Updated response for question ID ${question_id}`);
      })
    );

    await new Promise((resolve, reject) => {
      db.commit((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    console.log("Responses and photos updated successfully");
    res.json({ message: "Responses and photos updated successfully" });
  } catch (error) {
    console.error("Error updating responses and photos:", error);
    await new Promise((resolve) => db.rollback(() => resolve()));
    res.status(500).json({ error: "Error updating responses and photos" });
  }
});


app.get('/surveydetails/:methodId', (req, res) => {
  const methodId = req.params.methodId; // Get methodId from URL parameter

  // Replace with your actual database query to retrieve survey details
  const query = 'SELECT * FROM created_methods WHERE method_id = ?'; // Modify this query

  db.query(query, [methodId], async (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      res.status(500).json({ error: 'Database query error' });
    } else {
      if (results.length > 0) {
        const surveyDetails = results[0];
        const questionsQuery = 'SELECT * FROM questions WHERE method_id = ?';
        const questions = await new Promise((resolve, reject) => {
          db.query(questionsQuery, [methodId], (err, questionResults) => {
            if (err) {
              reject(err);
            } else {
              resolve(questionResults);
            }
          });
        });
        surveyDetails.questions = questions;
        res.json(surveyDetails);
      } else {
        res.status(404).json({ error: 'Survey not found' });
      }
    }
  });
});


app.listen(8081, () => {
  console.log('Backend server is running on port 8081');
});
