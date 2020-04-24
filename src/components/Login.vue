<template>
  <mdb-container>
    <hr/>
    <h4>Productivity Cube</h4>
    <hr/>
    <mdb-row class="text-center">
      <mdb-col sm="6" style="margin: auto">
        <form v-on:submit="submitForm" action="#" method="post" novalidate="true">
          <mdb-input type="text" label="Username" v-model="name" />
          <div v-if="errors.length">
            Please enter username.
          </div>
          <mdb-btn type="submit">Login</mdb-btn>
        </form>
      </mdb-col>
    </mdb-row>
    <ApiKeyModal :apikey="apiKey" :modal="modal" />
  </mdb-container>
</template>

<script>

  import ApiKeyModal from "./ApiKeyModal";
  const apiUrl = "http://localhost:8000/api";
  let apiEndPoint = apiUrl + "/login";

  import {mdbBtn, mdbCol, mdbRow, mdbContainer, mdbInput} from "mdbvue";
  import axios from 'axios';

  export default {
    name: 'Login',
    components: {
      ApiKeyModal,
      mdbCol,
      mdbInput,
      mdbContainer,
      mdbBtn,
      mdbRow
    },
    data: function () {
      return {
        errors: [],
        name: '',
        modal: false,
        apiKey: "",
      }
    },
    methods: {
      submitForm: function (event) {
        event.preventDefault();
        this.errors = [];
        console.log(this)
        if (this.name.length < 4) {
          this.errors.push('Name required.')

          return;
        }

        axios.post(apiEndPoint, {
          name: this.name
        }).then(response => {
          if (response.data.hasOwnProperty('apiKey')) {
            this.apiKey = response.data.apiKey.key
            this.modal = true
          } else {
            this.modal = false
            //redirect to page
          }
          // this.$emit('update:modal', this.modal)
          console.log(response.data);
          console.log(response);
          // eslint-disable-next-line no-unused-vars
        }, response => {});
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    font-weight: normal;
    padding-top: 20px;
    padding-bottom: 30px;
  }

  p {
    color: #969696;
    margin-bottom: 0;
    font-size: 14px;
  }
</style>
