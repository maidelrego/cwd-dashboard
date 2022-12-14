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

      <v-col cols="12" md="6">
        <CardDesign color="orange" full-header>
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
            <v-data-table :headers="headers" :items="items" />
          </v-card-text>
        </CardDesign>
      </v-col>

      <v-col cols="12" md="6">
        <CardDesign color="orange" full-header>
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
            <v-data-table :headers="headers" :items="items" />
          </v-card-text>
        </CardDesign>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import StatsCard from '@/components/StatsCard/StatsCard.vue'
import CardDesign from '@/components/StatsCard/CardDesign.vue'

export default {
  name: 'DashboardView',
  components: { StatsCard, CardDesign },
  data: () => ({
    headers: [
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
        text: 'Submmited Date',
        value: 'createdAt',
      },
    ],
    stats: [
      {
        actionIcon: 'mdi-alert',
        actionText: 'Get More Space...',
        color: 'success',
        icon: 'mdi-badge-account-outline',
        title: 'Quotes',
        value: '8',
      },
      {
        actionIcon: 'mdi-tag',
        actionText: 'Tracked from Google Analytics',
        color: 'success',
        icon: 'mdi-message-text-outline',
        title: 'Messages',
        value: '5',
      },
      {
        actionIcon: 'mdi-file',
        actionText: 'Last 24 Hours',
        color: 'error',
        icon: 'mdi-badge-account-alert-outline',
        title: 'Unread Quotes',
        value: '10',
      },
      {
        actionIcon: 'mdi-calendar-range',
        actionText: 'Last 24 Hours',
        color: 'error',
        icon: 'mdi-comment-alert-outline',
        title: 'Unread Messages',
        value: '10',
      },
    ],
  }),
  beforeMount() {
    // this.$store.dispatch('getQuotes')
    // this.$store.dispatch('getMessages')
  },
  methods: {
  },
}
</script>
