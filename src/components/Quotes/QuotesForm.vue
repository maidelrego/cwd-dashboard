<template>
  <v-card class="mt-5" flat tile>
    <v-card-text>
      <v-form class="mt-3">
        <v-row>
          <v-col cols="12" class="d-flex justify-center">
            <v-switch @change="markAsRead" v-model="isRead" :label="isRead ? 'Is Read' : 'Mark As Read'" />
          </v-col>
        </v-row>
        <v-row no-gutters>
        <v-col cols="12">
          <v-icon color="primary" class="mr-5" x-large>mdi-account</v-icon><span class="aboutUsBody">{{ fullName }}</span>
        </v-col>
        <v-col cols="12">
          <v-icon color="primary" class="mr-5" x-large>mdi-phone</v-icon><span class="aboutUsBody">{{ phone | prettyPhoneNumber }}</span>
        </v-col>
          <v-col cols="12">
          <v-icon color="primary" class="mr-5" x-large>mdi-map-marker</v-icon><span class="aboutUsBody">{{ fullAddress }}</span>
        </v-col>
        <v-col cols="12">
          <v-icon color="primary" class="mr-5" x-large>mdi-door</v-icon><span class="aboutUsBody">{{ doorDesign }}</span>
        </v-col>
        <v-col cols="12">
          <v-icon color="primary" class="mr-5" x-large>mdi-brush-variant</v-icon><span class="aboutUsBody">{{ finishColor }}</span>
        </v-col>
        <v-col cols="12">
          <v-icon color="primary" class="mr-5" x-large>mdi-hanger</v-icon><span class="aboutUsBody">{{ doorKit }}</span>
        </v-col>
        <v-col cols="12">
          <v-icon color="primary" class="mr-5" x-large>mdi-hand-extended</v-icon><span class="aboutUsBody">{{ doorHandleString}}</span>
        </v-col>
          <v-col cols="12">
          <v-icon color="primary" class="mr-5" x-large>mdi-ruler</v-icon><span class="aboutUsBody">{{ fullDimensions }}</span>
        </v-col>
        <v-col cols="12">
          <v-icon color="primary" class="mr-5" x-large>{{ installOrDeliveryIcon }}</v-icon><span class="aboutUsBody">{{ installOrDeliveryString }}</span>
        </v-col>
      </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>
    
<script>
import { mapFields } from '../../store/dataMappers'
import { mapState } from 'vuex'

export default {
  name: 'QuotesForm',
  props: {
    idProp: {
      type: Number,
      required: true
    }
  },
  beforeMount() {
    this.$store.dispatch('Quotes/initById', this.idProp)
  },
  computed: {
    ...mapState('Quotes', ['obj', 'error', 'changed']),
    ...mapFields({
      fields: [
        'firstName',
        'lastName',
        'email',
        'phone',
        'address',
        'address2',
        'city',
        'state',
        'zip',
        'installOrDelivery',
        'doorDesign',
        'finishColor',
        'doorKit',
        'doorHandle',
        'dimensionsW',
        'dimensionsH',
        'isRead'
      ],
      base: 'Quotes',
      mutation: 'INIT_OBJECT'
    }),
    fullAddress() {
      if (this.address && this.city && this.state && this.zip) {
        return `${this.address} ${this.address2}, ${this.city}, ${this.state} ${this.zip}`;
      } else {
        return '';
      }
    },
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
    fullDimensions() {
      return `${this.dimensionsH}in H  x ${this.dimensionsW}in W`;
    },
    doorHandleString() {
      return 'Door Handle' + ' - ' + this.doorHandle;
    },
    installOrDeliveryString() {
      return this.fullName + ' ' + 'wants ' + this.installOrDelivery;
    },
    installOrDeliveryIcon() {
      if (this.installOrDelivery === 'Delivery') {
        return 'mdi-truck-delivery';
      } else {
        return 'mdi-account-hard-hat';
      }
    }
  },
  methods: {
    markAsRead() {
      this.$store.dispatch('Quotes/updateData', this.idProp).then(() => {
        this.$emit('updateDashboard')
      })
    },
  },
}
</script>