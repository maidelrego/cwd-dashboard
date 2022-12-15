<template>
  <v-container id="dashboard-view" fluid tag="section">
    <v-row>
      <v-col v-for="({ actionIcon, actionText, ...attrs }, i) in stats" :key="i" cols="12" md="3" lg="3">
        <StatsCard v-bind="attrs">
          <template #actions>
            <v-icon class="mr-2" small v-text="actionIcon" />
            <div class="text-truncate">
              {{ actionText }}
            </div>
          </template>
        </StatsCard>
      </v-col>

      <v-col cols="12">
        <CardDesign color="primary" full-header :disableHover="true">
          <template #heading>
            <div class="pa-8 white--text">
              <div class="text-h4 font-weight-light">
                Quotes List
              </div>
              <div class="text-caption">
                All quotes listed here
              </div>
            </div>
          </template>
          <v-card-text>
            <v-data-table dense :headers="quotesHeadersTable" :items="quotesList" sort-by="createdAt" :sort-desc="true" @click:row="tableClickQuotes">
              <template v-slot:[`item.fullName`]="{ item }">
                <span>{{ getFullName(item) }}</span>
              </template>
              <template v-slot:[`item.fullAddress`]="{ item }">
                <span>{{ getFullAddress(item) }}</span>
              </template>
              <template v-slot:[`item.createdAt`]="{ item }">
                <span>{{ item.createdAt | prettyDateTime }}</span>
              </template>
              <template v-slot:[`item.phone`]="{ item }">
                <span>{{ item.phone | prettyPhoneNumber }}</span>
              </template>
              <template v-slot:[`item.isRead`]="{ item }">
                <v-icon v-if="item.isRead" color="green">mdi-check</v-icon>
                <v-icon v-else color="red">mdi-message-badge</v-icon>
              </template>
            </v-data-table>
          </v-card-text>
        </CardDesign>
      </v-col>

      <v-col cols="12">
        <CardDesign color="primary" full-header :disableHover="true">
          <template #heading>
            <div class="pa-8 white--text">
              <div class="text-h4 font-weight-light">
                Message List
              </div>
              <div class="text-caption">
                All messages listed here
              </div>
            </div>
          </template>
          <v-card-text>
            <v-data-table dense :headers="messageHeadersTable" :items="messageList" sort-by="createdAt" :sort-desc="true" @click:row="tableClickContactUs">
              <template v-slot:[`item.createdAt`]="{ item }">
                <span>{{ item.createdAt | prettyDateTime }}</span>
              </template>
              <template v-slot:[`item.isRead`]="{ item }">
                <v-icon v-if="item.isRead" color="green">mdi-check</v-icon>
                <v-icon v-else color="red">mdi-message-badge</v-icon>
              </template>
            </v-data-table>
          </v-card-text>
        </CardDesign>
      </v-col>
    </v-row>
    <v-row>
      <v-dialog v-model="contactUsDialog" width="500" persistent scrollable>
        <v-card flat>
          <v-toolbar dense dark flat color="primary">
            <v-toolbar-title class="white--text">Message</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn @click="closeContactUsDialog" color="error" title small>
              <v-icon>mdi-window-close</v-icon>
            </v-btn>
          </v-toolbar>
          <ContactUs @updateDashboard="updateDashboard" v-if="contactUsDialog" :idProp="contactUsFormId" />
        </v-card>
      </v-dialog>
    </v-row>
    <v-row>
      <v-dialog v-model="quotesFormDialog" width="500" persistent scrollable>
        <v-card flat>
          <v-toolbar dense dark flat color="primary">
            <v-toolbar-title class="white--text">Message</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn @click="closeQuotesFormDialog" color="error" title small>
              <v-icon>mdi-window-close</v-icon>
            </v-btn>
          </v-toolbar>
          <QuotesForm @updateDashboard="updateDashboard" v-if="quotesFormDialog" :idProp="quotesFormId" />
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import StatsCard from '@/components/StatsCard/StatsCard.vue'
import CardDesign from '@/components/StatsCard/CardDesign.vue'
import ContactUs from '../components/ContactUsForm/ContactUs.vue'
import QuotesForm from '../components/Quotes/QuotesForm.vue'

export default {
  name: 'DashboardView',
  components: { StatsCard, CardDesign, ContactUs, QuotesForm },
  data: () => ({
    quotesList: [],
    messageList: [],
    unreadQuotes: [],
    unreadMessages: [],
    contactUsDialog: false,
    quotesFormDialog: false,
    contactUsFormId: null,
    quotesFormId: null,
    messageHeadersTable: [
      {
        text: 'Name',
        value: 'name',
      },
      {
        text: 'Email',
        value: 'email',
      },
      {
        text: 'Is Read',
        value: 'isRead',
      },
      {
        text: 'Submmited Date',
        value: 'createdAt',
      },
    ],
    quotesHeadersTable: [
      {
        text: 'Name',
        value: 'fullName',
      },
      {
        text: 'Email',
        value: 'email',
      },
      {
        text: 'Phone',
        value: 'phone',
      },
      {
        text: 'Address',
        value: 'fullAddress',
      },
      {
        text: 'Is Read',
        value: 'isRead',
      },
      {
        text: 'Submmited Date',
        value: 'createdAt',
      },
    ],
    stats: [
      {
        actionIcon: 'mdi-badge-account-outline',
        actionText: 'Total Quotes',
        color: 'success',
        icon: 'mdi-badge-account-outline',
        title: 'Quotes',
      },
      {
        actionIcon: 'mdi-message-text-outline',
        actionText: 'Total Messages',
        color: 'success',
        icon: 'mdi-message-text-outline',
        title: 'Messages',
      },
      {
        actionIcon: 'mdi-alert-circle-outline',
        actionText: '',
        color: 'error',
        icon: 'mdi-badge-account-alert-outline',
        title: 'Unread Quotes',
      },
      {
        actionIcon: 'mdi-alert-circle-outline',
        actionText: '',
        color: 'error',
        icon: 'mdi-comment-alert-outline',
        title: 'Unread Messages',
      },
    ],
  }),
  beforeMount() {
    this.populateTable()
  },
  methods: {
    tableClickContactUs(row) {
      this.contactUsDialog = true
      this.contactUsFormId = row.id
    },
    tableClickQuotes(row) {
      this.quotesFormDialog = true
      this.quotesFormId = row.id
    },
    closeContactUsDialog() {
      this.contactUsDialog = false
      this.contactUsFormId = null
    },
    closeQuotesFormDialog() {
      this.quotesFormDialog = false
      this.quotesFormId = null
    },
    updateDashboard() {
      this.populateTable()
    },
    getFullAddress(data) {
      if (data.address && data.city && data.state && data.zip) {
        return `${data.address} ${data.address2}, ${data.city}, ${data.state} ${data.zip}`;
      } else {
        return '';
      }
    },
    getFullName(data) {
      return `${data.firstName} ${data.lastName}`;
    },
    async populateTable() {
      await this.$store.dispatch('Quotes/pullData').then((data) => {
        this.unreadQuotes = data.filter((item) => item.isRead === false)
        this.quotesList = data
        this.stats.find((item) => item.title === 'Quotes').value = data.length
        this.stats.find((item) => item.title === 'Unread Quotes').value = this.unreadQuotes.length
        if (this.unreadQuotes.length > 0) {
          this.stats.find((item) => item.title === 'Unread Quotes').actionText = 'You haven\'t seen these yet'
        } else {
          this.stats.find((item) => item.title === 'Unread Quotes').actionText = 'No unread Quotes'
        }
      })
      await this.$store.dispatch('ContactUs/pullData').then((data) => {
        this.unreadMessages = data.filter((item) => item.isRead === false)
        this.messageList = data
        this.stats.find((item) => item.title === 'Messages').value = data.length
        this.stats.find((item) => item.title === 'Unread Messages').value = this.unreadMessages.length
        if (this.unreadMessages.length > 0) {
          this.stats.find((item) => item.title === 'Unread Messages').actionText = 'You haven\'t seen these yet'
        } else {
          this.stats.find((item) => item.title === 'Unread Messages').actionText = 'No unread messages'
        }
      })
    },
  },
}
</script>
