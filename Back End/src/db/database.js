const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");

const dbPath = path.resolve(__dirname, "db.sqlite");
const db = new sqlite3.Database(dbPath);

function initDatabase() {
  const schemaPath = path.resolve(__dirname, "schema.sql");
  const schema = fs.readFileSync(schemaPath, "utf8");
  db.exec(schema, (err) => {
    if (err) {
      console.error("Error running schema", err);
    } else {
      console.log("Database initialized or already set up.");
      seedDataIfEmpty();
    }
  });
}

function seedDataIfEmpty() {
  // check if at least one poll is present if not seed the default one
  const checkSql = "SELECT COUNT(*) AS count FROM polls";
  db.get(checkSql, (err, row) => {
    if (err) {
      return console.error("Error checking poll count:", err);
    }
    if (row.count === 0) {
      console.log("No polls found. Inserting default poll...");
      insertDefaultPoll();
    }
  });
}

function insertDefaultPoll() {
  const pollQuestion = "Who will win the Premier League?";
  db.run(
    `INSERT INTO polls (question) VALUES (?)`,
    [pollQuestion],
    function (err) {
      if (err) {
        return console.error("Error inserting default poll:", err);
      }
      const pollId = this.lastID;

      const defaultOptions = ["Manchester City", "Arsenal", "Liverpool"];
      const insertOptionSql = `INSERT INTO options (poll_id, value) VALUES (?, ?)`;

      defaultOptions.forEach((option) => {
        db.run(insertOptionSql, [pollId, option], (optErr) => {
          if (optErr) {
            console.error(`Error inserting option '${option}':`, optErr);
          }
        });
      });

      console.log("Default poll inserted successfully.");
    }
  );
}

initDatabase();

module.exports = db;
