<template>
  <div class="event-types">
    <p>
    <input type="text" id="event-type-search" name="filter" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="Search event types for..." v-model="search"/>
    </p>
    <div id="event-type-count">Found <b>{{resultCount}}</b> matches</div>
    <div class="event-type" v-for="eventType in filteredEventTypes" :key="eventType.id">
      <h4 :id="eventType.id | titleAsId" v-html="$options.filters.title(eventType.id)"></h4>

      <div class="event-type-mappings" v-if="eventType.mappings.length > 0">
        <b>Legacy event types: </b> {{ eventType.mappings.join(', ') }}
      </div>

      <p class="event-type-description" v-if="eventType.description">{{ eventType.description}}</p>
      <p class="event-type-description" v-else>No Description</p>

      <div class="event-type-tags">
        <code class="event-type-tag" v-for="tag in eventType.tags" :key="tag">{{ tag }}</code>
      </div>
      <div class="event-type-release">
        Since: <a href="/docs/change-log/">{{ eventType.info.release }}</a>
      </div>
    </div>
  </div>
</template>

<script>
  import eventTypes from './../../vuepress-site/data/event-types.json'
  export default {
    created() {
      this.eventTypes = eventTypes.versions[1].eventTypes
    },
    data() {
      return {
        search: '',
        eventTypes: null
      }
    },
    computed: {
      filteredEventTypes:function()
      {
        if( this.search == '' ) {
          return this.eventTypes
        }

        return this.eventTypes.filter((eventType) => {
          console.log(this.search.toLowerCase())
          return eventType.id.toLowerCase().indexOf(this.search.toLowerCase())>=0
        });


      },

      resultCount: function() {
        return  this.filteredEventTypes.length
      }
    },
    filters: {
      title: function (value) {
        const parts = value.split('.')
        let res = "<b>" + parts[0] + "</b>."
        parts.shift()
        return res + parts.join('.')
      },
      titleAsId: function (value) {
        return value.replace(/[\s_.]/g, '');
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../styles/event-types';
</style>
