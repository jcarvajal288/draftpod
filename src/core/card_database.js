import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

async function fetch_set(set_code) {
  const path = require('path')
  const dbPath = path.resolve(__dirname, '../../db/AllPrintings.sqlite')
  return open({
    filename: dbPath,
    driver: sqlite3.Database
  }).then(async(db) => {
    //const query = 'SELECT * FROM cards WHERE name = "Alchemist\'s Gift"'
    const query = 'SELECT * FROM cards WHERE setCode = "' + set_code + '"'
    return await db.all(query);
  })
}

export function fetch_cards_for_set(set_code) {
  return fetch_set(set_code).then((cards) => {
    return cards.filter(remove_promos).map((card) => {
      return {
        id: card.multiverseId,
        name: card.name,
        collector_number: card.number,
        multiverse_ids: [card.multiverseId],
        image_uris: [construct_image_uri(card.scryfallId)],
        layout: card.layout,
        type_line: card.type,
        oracle_text: card.text,
        mana_cost: card.manaCost,
        cmc: card.convertedManaCost,
        colors: card.colors,
        latent_color: fetch_latent_color(),
        rarity: card.rarity,
        rating: fetch_rating(card.multiverseId),
        set: set_code.toLowerCase()
      };
    });
  });
}

function construct_image_uri(scryfall_id) {
  const char0 = scryfall_id.charAt(0)
  const char1 = scryfall_id.charAt(1)
  return `https://img.scryfall.com/cards/normal/front/${char0}/${char1}/${scryfall_id}.jpg`
}

function remove_promos(card) {
  // TODO: filter out if 'promoTypes' field is populated
  return card.promoTypes === null;
}

function fetch_rating(id) {
  // TODO: fetch this value from ~/tools/ratings/set_code.csv
  return 1;
}

function fetch_latent_color(id) {
  // TODO fetch this value from ~/tools/ratings/set_code-latent.csv
  return null;
}

/*
fetch_cards_for_set('M21').then((cards) => {
  console.log(cards);
});
*/
