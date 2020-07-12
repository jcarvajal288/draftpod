


import * as cube from './cube'
import { CARDPOOL } from '../../../constants'


export default {

  name: "Custom Cube",

  capabilities: {
    arena_decklists: false,
  },

  pack_cards: () => 0,

  cube: cube.build,

  default_cube: CARDPOOL.CUBE + '1/1/1/1',

  is_custom_cube: true,

  booster(selectCards) {
    const cards = selectCards(() => true, 15);
    return cards
  },

}



