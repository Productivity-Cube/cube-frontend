<template>
  <div>
    <mdb-modal :show="modal" @close="modal = false">
      <mdb-modal-header>
        <mdb-modal-title>Hey {{name}}! Save your API KEY</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <h4 style="overflow-wrap: break-word;">{{ apikey }}</h4>
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="primary" v-on:click="click">I saved it</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
  </div>
</template>

<script>
  import { mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbBtn } from 'mdbvue';
  export default {
    name: 'ApiKeyModal',
    components: {
      mdbModal,
      mdbModalHeader,
      mdbModalTitle,
      mdbModalBody,
      mdbModalFooter,
      mdbBtn
    },
    props: {
      apikey: String,
      modal: Boolean,
      name: String,
    },
    methods: {
      click() {
        this.$router.push(`/events/${this.name}`)
      }
    }
  };
</script>
