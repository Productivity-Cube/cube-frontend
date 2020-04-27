<template>
  <div class="eventList">
    <EventsList/>
  </div>
</template>

<script>
  // @ is an alias to /src
  import EventsList from '@/components/EventsList.vue'

  export default {
    name: 'eventList',
    components: {
      EventsList
    }
  }
</script>
