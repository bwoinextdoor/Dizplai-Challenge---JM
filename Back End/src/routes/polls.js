const express = require("express");
const router = express.Router();
const db = require("../db/database");

/* Fetch all polls */
router.get("/", (req, res) => {
  const sql = `SELECT * FROM polls`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

/* GET /api/polls/:id */
router.get("/:id", (req, res) => {
  const pollId = req.params.id;

  // 1) Fetch the poll
  const pollSql = `SELECT * FROM polls WHERE id = ?`;
  db.get(pollSql, [pollId], (err, poll) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!poll) return res.status(404).json({ error: "Poll not found" });

    const optionsSql = `SELECT * FROM options WHERE poll_id = ?`;
    db.all(optionsSql, [pollId], (err2, options) => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.json({
        ...poll,
        options,
      });
    });
  });
});

/* Create a new poll */
router.post("/", (req, res) => {
  const { question, options } = req.body;

  if (!question || !Array.isArray(options) || options.length < 2) {
    return res.status(400).json({
      error: "Poll must have a question and at least 2 options.",
    });
  }

  // Insert poll
  const insertPoll = `INSERT INTO polls (question) VALUES (?)`;
  db.run(insertPoll, [question], function (err) {
    if (err) return res.status(500).json({ error: err.message });

    const pollId = this.lastID; // ID of newly inserted poll

    // Insert options
    const insertOption = `INSERT INTO options (poll_id, value) VALUES (?, ?)`;
    for (const value of options) {
      db.run(insertOption, [pollId, value], (optionErr) => {
        if (optionErr) {
          console.error("Error inserting option", optionErr);
        }
      });
    }

    return res.status(201).json({
      id: pollId,
      question,
      options,
    });
  });
});

/* Cast a vote for an option */
router.post("/:pollId/votes", (req, res) => {
  const pollId = req.params.pollId;
  const { optionId } = req.body;

  if (!optionId) {
    return res.status(400).json({ error: "optionId is required" });
  }

  // Ensure option belongs to the poll
  const checkOptionSql = `SELECT * FROM options WHERE id = ? AND poll_id = ?`;
  db.get(checkOptionSql, [optionId, pollId], (err, option) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!option) {
      return res.status(400).json({ error: "Option not found for this poll" });
    }

    // Record the vote
    const insertVoteSql = `INSERT INTO votes (option_id) VALUES (?)`;
    db.run(insertVoteSql, [optionId], function (voteErr) {
      if (voteErr) {
        return res.status(500).json({ error: voteErr.message });
      }
      res.json({ message: "Vote recorded." });
    });
  });
});

/* Return each option, number of votes, and the times of those votes */
router.get("/:pollId/votes", (req, res) => {
  const pollId = req.params.pollId;

  // Get poll
  const pollSql = `SELECT * FROM polls WHERE id = ?`;
  db.get(pollSql, [pollId], (err, poll) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!poll) return res.status(404).json({ error: "Poll not found" });

    // For each option, get vote count + times
    const optionsSql = `
    SELECT 
      o.id AS optionId, 
      o.value, 
      v.vote_time AS voteTime
    FROM options o
    LEFT JOIN votes v 
      ON o.id = v.option_id
    WHERE o.poll_id = ?
    ORDER BY v.vote_time DESC
  `;
    db.all(optionsSql, [pollId], (err2, rows) => {
      if (err2) return res.status(500).json({ error: err2.message });

      // Structure the response to group votes by option
      const results = rows.reduce((acc, row) => {
        const existingOption = acc.find((opt) => opt.optionId === row.optionId);
        if (existingOption) {
          if (row.voteTime) {
            existingOption.votes.push({ voteTime: row.voteTime });
          }
        } else {
          acc.push({
            optionId: row.optionId,
            value: row.value,
            votes: row.voteTime ? [{ voteTime: row.voteTime }] : [],
          });
        }
        return acc;
      }, []);

      res.json({
        poll: {
          id: poll.id,
          question: poll.question,
        },
        results,
      });
    });
  });
});

module.exports = router;
