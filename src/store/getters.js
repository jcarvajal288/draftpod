
import * as set from './set/'
import * as filters from './card-filters'
import * as utils from './utils'

export default {
  started: (state) => state.current_pack > 0,
  set_code: (state) => state.set_code,
  set_name: (state) => set.name(state.set_code),
  current_pack: (state) => state.current_pack,
  current_pick: (state) => state.current_pick,
  pick_timer: (state) => state.pick_timer,
  pick_time_remaining: (state) => {
    return Math.round((state.pick_end_time - state.current_time) / 1000);
  },
  pick_time_expired: (state, getters) => {
    return state.pick_timer &&
           !getters.picks_complete &&
           state.current_pack > 0 && 
           state.current_pick > 0 &&
           getters.pick_time_remaining < 0;
  },
  picks_complete: (state) => state.picks_complete,
  show_pick_analysis: (state) => state.show_pick_analysis,
  card_preview: (state) => state.card_preview,
  draft: (state) => (player) => state.players[player].draft,
  deck: (state) => (player) => state.players[player].deck,
  deck_cards: (state) => (player) => state.players[player].deck.piles.slice(0, 6).flat(),
  deck_land_count: (state) => (player) => {
    let deck = state.players[player].deck;
    let basic_lands = deck.basic_lands;
    return deck.piles[6].length + utils.sumValues(basic_lands);
  },
  deck_list: (state) => (player) => deckList(state.players[player].deck),
  card_types: () => (cards) => {
    return {
      creatures: cards.filter(filters.creature).length,
      other: cards.filter((card) => !filters.creature(card) && !filters.land(card)).length,
      lands: cards.filter(filters.land).length
    }
  },
}

function deckList(deck) {
 
  // main deck
  const card_name = (card) => card.name;
  let main_deck = [].concat(
    // cards
    deck.piles.slice(0, 6).flat().map(card_name),
    // special lands
    deck.piles[6].map(card_name),
    // basic lands
    Array(deck.basic_lands.R).fill("Mountain"),
    Array(deck.basic_lands.W).fill("Plains"),
    Array(deck.basic_lands.U).fill("Island"),
    Array(deck.basic_lands.B).fill("Swamp"),
    Array(deck.basic_lands.G).fill("Forest")
  );

  // sideboard
  let sideboard = deck.piles[7].map(card_name);
    
  // return deck list w/ main deck and sideboard
  return asDeckList(main_deck) + 
         '\n\n' +
         asDeckList(sideboard);
}


// function to produce a text deck list
function asDeckList(cards) {
    
  // conslidate duplicates
  let deck_list = {};
  cards
    .slice()
    .sort()
    .map((name) => {
      if (!deck_list.hasOwnProperty(name))
        deck_list[name] = 0;
      deck_list[name]++;
    }
  );

  // return as list
  return Object.keys(deck_list)
    .map((name) => deck_list[name] + ' ' + name)
    .join("\n");
}