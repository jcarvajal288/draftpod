<script>

import { CARDPOOL } from '@/store/constants'
import { SET_CARDPOOL, REMOVE_CARDPOOL } from '@/store/mutations'

import { mapGetters, mapMutations } from 'vuex'
import * as utils from '@/components/core/utils'
import * as filters from '@/components/core/filters'
import * as selectors from '@/store/selectors.js'

import * as set from '@/store/modules/draft/set/'

import { handleCardpoolUpload, uploadStatusEmpty } from './upload'

import * as messagebox from '@/components/core/messagebox.js'

import CardpoolUploadStatus from './CardpoolUploadStatus'

import DeleteIcon from "vue-material-design-icons/DeleteOutline.vue"
import UploadIcon from "vue-material-design-icons/CloudUpload.vue"

export default {
  name: 'CardpoolSelect',

  components: {
    DeleteIcon, UploadIcon, CardpoolUploadStatus
  },

  filters: {
    prettyDate: filters.prettyDate,
    prettyNumber: filters.prettyNumber
  },

  props: {
    value: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      required: true
    },
    options: {
      type: Object,
      required: true
    },
    set_code: {
      type: String,
      required: true
    }
  },

  data: function() {
    return {
      new_cardpool: {
        name: null,
        cards: [],
        upload_status: uploadStatusEmpty()
      },
      custom_cardpool: {
        upload_status: uploadStatusEmpty()
      }
    }
  },

  computed: {
    ...mapGetters([
      'cardpool',
    ]),

    supports_custom_cardpool() {
      return set.capabilities(this.set_code).custom_cardpool;
    },
  
    is_new_cardpool() {
      return this.value === 'new-cardpool';
    },

    selected_custom_cardpool() {
      const isInputVal = (option) => option.value === this.value;
      let option = this.options.custom.find(isInputVal);
      if (option) {
        let name = option.value.replace(CARDPOOL.CUSTOM, '');
        return {
          name: name,
          value: option.value,
          caption: option.caption,
          updated: this.cardpool(this.set_code, name).updated
        }
      } else {
        return null;
      }
    },

    selected_custom_cardpool_card_count() {
      if (this.selected_custom_cardpool) {
        let name = this.selected_custom_cardpool.name;
        let cardpool = this.cardpool(this.set_code, name);
        return selectors.countCardpoolCards(cardpool.cards);
      } else {
        return 0;
      }
    }
  },

  watch: {
    set_code() {
      this.clearCardpoolInput();
    },
    value(newValue, oldValue) {
      if (this.is_new_cardpool) {
        this.$nextTick(this.focusCardpoolName);
        utils.scrollIntoView(this.$refs.selectCardpool);
      } else if (oldValue === 'new-cardpool') {
        this.$emit('newCardpoolComplete')
      }
    }
  },

  methods: {

    ...mapMutations({
      setCardpool: SET_CARDPOOL,
      removeCardpool: REMOVE_CARDPOOL
    }),

    onChangeCardpool(event) {
      this.clearCardpoolInput();
      this.$emit('input', event.target.value);
    },

    onUploadCardpool(event) {

      // clear status ui
      this.new_cardpool.upload_status = uploadStatusEmpty();

      // check for file input (null on cancel)
      const file = event.target.files[0];
      if (!file)
        return;

      // handle upload
      handleCardpoolUpload(this.set_code, file, (cards, status) => {
        
        // handle cards if we got them
        if (cards) {
          this.new_cardpool.cards = cards;
          if (!this.new_cardpool.name)
            this.focusCardpoolName();
        
        // otherwise clear the input
        } else {
          event.target.value = "";
        }    

        // update status
        this.new_cardpool.upload_status = status;
        
      });
    },

    onUseCardpool() {
      // validate inputs
      if (!this.new_cardpool.name)
        messagebox.alert('Custom Cardpool', 'Please provide a name for the cardpool', this.focusCardpoolName);
      else if (this.new_cardpool.cards.length === 0)
        messagebox.alert('Custom Cardpool', 'Please upload a CSV for the cardpool');
      else {
        // save the cardpool
        this.setCardpool({
          set_code: this.set_code,
          name: this.new_cardpool.name,
          cards: this.new_cardpool.cards
        });
        // notify parent listener of the selection
        this.$nextTick(() => {
          this.$emit('input', CARDPOOL.CUSTOM + this.new_cardpool.name);
          this.clearNewCardpoolInput();
        });
      }
    },

    onRemoveCardpool() {
      this.clearCustomCardpoolUploadStatus();
      let cardpool = this.selected_custom_cardpool;
      messagebox.confirm(
        "Remove Cardpool",
        "<p>You will no longer be able to use the " + cardpool.caption + " cardpool after it is removed.</p>" +
        "Remove the cardpool?",
        () => {
          this.removeCardpool({
            set_code: this.set_code, 
            name: cardpool.name
          }); 
          this.$emit('input', this.options.cubes[0].value);
        }
      )
    },

    onUpdateCardpoolClicked() {
      this.clearCustomCardpoolUploadStatus();
      this.$refs.cardpool_upload_update.click();
    },

    onUpdateCardpoolUpload(event) {

      const file = event.target.files[0];
      if (!file)
        return;

      handleCardpoolUpload(this.set_code, file, (cards, status) => {

        // handle cards if we got them
        if (cards) {
          let cardpool = this.selected_custom_cardpool;
          this.setCardpool({
            set_code: this.set_code,
            name: cardpool.name,
            cards: cards
          });
        }

        // clear input
        event.target.value = "";

        // provide status
        this.custom_cardpool.upload_status = status;
      });
    },

    clearCardpoolInput() {
      this.clearNewCardpoolInput();
      this.clearCustomCardpoolInput();
    },

    clearNewCardpoolInput() {
      this.new_cardpool.name = null;
      this.new_cardpool.cards = [];
      this.new_cardpool.upload_status = uploadStatusEmpty();
    },

    clearCustomCardpoolInput() {
      this.clearCustomCardpoolUploadStatus();
    },

    clearCustomCardpoolUploadStatus() {
      this.custom_cardpool.upload_status = uploadStatusEmpty();
    },

    focusCardpoolName() {
      utils.focus(this.$refs.cardpool_name);
    },

   
  },

}

</script>

<template>
  <div class="form-group row">
    <label 
      for="draft-cardpool" 
      class="col-sm-3 col-form-label"
    >
      Cardpool:
    </label>
    <div class="col-sm-8">
      <select 
        id="draft-cardpool" 
        ref="selectCardpool" 
        :disabled="disabled" 
        :value="value"
        class="form-control" 
        @change="onChangeCardpool"
      >
        <optgroup label="Set Cube">
          <option 
            v-for="option in options.cubes" 
            :key="option.value"
            :value="option.value"
          >
            {{ option.caption }}
          </option>
        </optgroup>
        <optgroup 
          v-if="supports_custom_cardpool" 
          label="Custom"
        >
          <option 
            v-for="option in options.custom" 
            :key="option.value"
            :value="option.value"
          >
            {{ option.caption }}
          </option>
          <option value="new-cardpool">
            New Custom Cardpool...
          </option>
        </optgroup>
      </select>
      <div>
        <div class="custom-cardpool">
          <div 
            v-if="is_new_cardpool" 
            class="cardpool-new navigator-inline-panel card-body bg-primary"
          >
            <div class="form-group">
              <label for="custom-cardpool-name">
                Cardpool Name:
              </label>
              <input 
                id="custom-cardpool-name" 
                ref="cardpool_name" 
                v-model="new_cardpool.name" 
                class="form-control" 
                placeholder="Enter name"
              >
            </div>
            <div class="form-group">
              <label for="custom-cardpool-upload">
                Upload Cardpool:
              </label>
              <input 
                id="custom-cardpool-upload" 
                type="file" 
                class="form-control cardpool-upload" 
                aria-describedby="custom-cardpool-upload-help" 
                accept="text/csv,text/plain,.coll2" 
                @change="onUploadCardpool"
              >
              <CardpoolUploadStatus :status="new_cardpool.upload_status" />
              <small 
                id="custom-cardpool-upload-help" 
                class="form-text text-muted"
              >
                <p>
                  The cardpool file should either be a Decked Builder collection file (.coll2), or a CSV exported from Deckbox.org or 
                  Decked Builder. See the article on <a href="/guide#cardpools/" target="_blank">Cardpools</a>
                  for additional details.
                </p>
              </small>

              <div class="form-group">
                <button 
                  type="button" 
                  class="btn btn-warning" 
                  @click="onUseCardpool"
                >
                  Use Cardpool
                </button>
              </div>
            </div>
          </div>
          <div 
            v-else-if="selected_custom_cardpool" 
            class="cardpool-bar"
          >
            <span class="cardpool-card-count">
              {{ selected_custom_cardpool_card_count | prettyNumber }} cards
            </span>
            {{ selected_custom_cardpool.updated | prettyDate }}
            <a 
              class="cardpool-action float-right" 
              @click="onRemoveCardpool"
            >
              <DeleteIcon title="Remove Cardpool" /><span>Remove</span>
            </a>
            <a 
              class="cardpool-action float-right" 
              @click="onUpdateCardpoolClicked"
            >
              <UploadIcon title="Update Cardpool" /><span>Update...</span>
            </a>
            <input 
              id="custom-cardpool-update" 
              ref="cardpool_upload_update" 
              type="file"
              accept="text/csv,.coll2" 
              @change="onUpdateCardpoolUpload"
            >
          </div>
          <div style="clear: both;" />
          <CardpoolUploadStatus :status="custom_cardpool.upload_status" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>

.custom-cardpool .btn {
  margin-top: 10px;
}

.cardpool-bar {
  padding-right: 8px;
  padding-top: 6px;
  padding-bottom: 3px;
  vertical-align: middle;
}

.cardpool-bar .cardpool-card-count {
  padding-right: 20px;
}

.cardpool-bar .cardpool-action {
  margin-top: -2px;
  margin-left: 18px;
  cursor: pointer;
}

.cardpool-bar .cardpool-action:hover {
  color: #e9ecef !important;
}


.cardpool-bar .cardpool-action .material-design-icon {
  margin-right: 3px;
}

.cardpool-bar #custom-cardpool-update {
  display: none;
}

.cardpool-bar .cardpool-action .cloud-upload-icon {
  margin-right: 6px;
}

.cardpool-upload, .cardpool-upload:focus {
  background: transparent;
  border: 0;
  color: #aaa;
}

.form-text.text-muted a {
  color: inherit;
  text-decoration: underline;
}

.form-text.text-muted a:hover {
  text-decoration: underline;
}


</style>