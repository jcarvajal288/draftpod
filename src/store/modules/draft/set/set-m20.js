

import * as cube from './cube'
import * as booster from './booster'
import * as filters from '../card-filters'

export default {

  name: "Core Set 2020",

  pack_cards: () => 15,

  cube: cube.build,

  cardpool_basics: [467015,467019,467023,467027,467031],

  booster(selectCards) {

    let cards = [].concat(
      selectCards(booster.packRareSlot, 1),
      selectCards(booster.uncommon, 3),
      selectCards(commonNotDualLand, 10)
    );
    
    if (Math.random() <= (5/12)) {
      // fallback to basic if there aren't enough dual lands
      const dualLand = [m20DualLand, filters.basicLand];
      return cards.concat(selectCards(dualLand, 1));
    } else {
      return cards.concat(selectCards(filters.basicLand, 1));
    }
  },

}

export function m20DualLand(card) {
  const DUAL_LANDS =  ['Tranquil Cove', 'Scoured Barrens', 'Dismal Backwater',
                       'Swiftwater Cliffs', 'Bloodfell Caves', 'Jungle Hollow',
                       'Rugged Highlands', 'Wind-Scarred Crag', 'Blossoming Sands',
                       'Thornwood Falls', 'Evolving Wilds'];
  return DUAL_LANDS.indexOf(card.name) >= 0;
}

const commonNotDualLand = filters.join(filters.common, card => !m20DualLand(card));




