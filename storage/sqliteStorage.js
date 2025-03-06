const Database = require('better-sqlite3');
const db = new Database("messages.db", { verbose: console.log });

// vytvoreni nove tabulky pomoci sql 
db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        username TEXT NOT NULL, 
        message TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, 
        ip TEXT
    )
`);

function getMessages () {
    return db.prepare(`SELECT * FROM messages`).all();
}

function addMessage (username, message, ip = '0') {
    try {
        db.prepare (`
                INSERT INTO messages (username, message, ip)
                VALUES (?, ?, ?)
            `).run(username, message, ip);
        console.log("Záznam byl uložen");
    } catch (error) {
        console.error("Chyba uložení. dat: " + error);
    }
}

module.exports = { getMessages, addMessage }