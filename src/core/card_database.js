import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
//const sqlite3 = require('sqlite3')
//const sqlite = require('sqlite');
//const open = sqlite.open

async function fetch_set(set_code) {
  const path = require('path')
  const dbPath = path.resolve(__dirname, '../../db/AllPrintings.sqlite')
  return open({
    filename: dbPath,
    driver: sqlite3.Database
  }).then(async(db) => {
    const query = 'SELECT * FROM cards WHERE setCode = "' + set_code + '"'
    return await db.get(query);
  })
}

export function fetch_cards_for_set(set_code) {
  return fetch_set(set_code)
}

fetch_cards_for_set('M21').then((cards) => {
  console.log(cards);
});
