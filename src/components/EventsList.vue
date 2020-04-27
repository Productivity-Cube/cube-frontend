<template>
  <mdb-container>
    <mdb-row class="mt-5 align-items-center justify-content-start">
      <h4 class="demo-title"><strong>Hey {{ $route.params.name }}</strong></h4>
    </mdb-row>
    <hr/>
    <mdb-row class="mt-5 pt-5 mx-3">
      <mdb-col class="sm-1">
        <h4>Date</h4>
        <datepicker v-on:selected="selectDate" style="border: 1px solid #ced4da;border-radius: .25rem;padding: .375rem 1.75rem .375rem .75rem;" :value="date"></datepicker>
      </mdb-col>
      <mdb-col class="sm-1">
        <h4>Group By</h4>
        <section>
          <select class="browser-default custom-select" v-model="groupBy">
            <option selected value=""></option>
            <option value="activityId">Activity</option>
            <option value="productivityRate">Productivity</option>
          </select>
        </section>
      </mdb-col>
      <mdb-col class="sm-1">
        <h4>Activity</h4>
        <section>
          <select class="browser-default custom-select" v-model="activity">
            <option selected value=""></option>
            <option value="break">Break</option>
            <option value="call">Call</option>
            <option value="meeting">Meeting</option>
            <option value="planning">planning</option>
            <option value="work">Work</option>
          </select>
        </section>
      </mdb-col>
      <mdb-col class="sm-1">
        <h4>Productivity Rate</h4>
        <section>
          <select class="browser-default custom-select" v-model="productivityRate">
            <option selected value=""></option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </section>
      </mdb-col>
    </mdb-row>
    <mdb-row class="text-center">
      <mdb-col sm="12" style="margin: auto">
        <mdb-tbl>
          <mdb-tbl-head>
            <tr>
              <th>Activity</th>
              <th>Productivity Rate</th>
              <th>Time Spent</th>
              <th>Date</th>
            </tr>
          </mdb-tbl-head>
          <mdb-tbl-body>
            <tr v-for="event in events" :key="event.uuid">
              <td>{{ event.activity.name }}</td>
              <td>{{ event.productivityRate }}</td>
              <td>{{ event.time }}</td>
              <td>{{ event.createdAt | moment("L HH:mm") }}</td>
            </tr>
          </mdb-tbl-body>
        </mdb-tbl>
      </mdb-col>
    </mdb-row>
  </mdb-container>
</template>

<script>
  import {mdbContainer, mdbRow, mdbCol, mdbTbl, mdbTblHead, mdbTblBody} from "mdbvue"
  import Datepicker from 'vuejs-datepicker';
  import axios from 'axios'
  import querystring from 'querystring'
  import * as moment from 'moment';

  export default {
    name: 'EventList',
    components: {
      Datepicker,
      mdbContainer,
      mdbRow,
      mdbCol,
      mdbTbl,
      mdbTblHead,
      mdbTblBody,
    },
    data: function () {
      return {
        activity: null,
        groupBy: null,
        date: new Date(),
        productivityRate: null,
        events: [],
      }
    },
    watch: {
      activity: function () {
        this.refresh()
      },
      productivityRate: function () {
        this.refresh()
      },
      groupBy: function () {
        this.refresh()
      },
      date: function () {
        console.log('DATE CHANGED')
        this.refresh()
      },
    },
    created() {
      this.refresh()
    },
    methods: {
      selectDate(date) {
        this.date = new Date(date)
        this.refresh()
      },
      refresh() {
        const dateFrom= moment(this.date).format('MM-DD-Y')
        const dateTo= moment(this.date).add(1, 'day').format('MM-DD-Y')
        console.log('this.date', this.date)
        console.log('dateFrom', dateFrom)
        console.log('dateFrom', dateTo)

        let url = `${process.env.VUE_APP_API_URL}/user/${this.$route.params.name}/events`
        let params = {
          dateFrom: dateFrom,
          dateTo: dateTo,
        }

        console.log(this.activity)
        if (this.activity !== null && this.activity !== '') {
          params.activity = this.activity
        }
        if (this.productivityRate !== null && this.productivityRate !== '') {
          params.productivityRate = this.productivityRate
        }
        if (this.groupBy !== null && this.groupBy !== '') {
          params.groupBy = this.groupBy
        }
        console.log(`${url}?${querystring.stringify(params)}`)
        axios.get(`${url}?${querystring.stringify(params)}`)
          .then(response => {
            console.log(response.data)
            this.events = response.data
          })
      }
    }
  }
</script>
