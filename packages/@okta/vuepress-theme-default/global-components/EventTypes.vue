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
  import _ from 'lodash'

  export default {

    created() {
      this.eventTypes = eventTypes.versions[1].eventTypes
    },
    data() {
      return {
        search: this.$route.query.q ? this.$route.query.q : '',
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
          return (eventType.id.toLowerCase().indexOf(this.search.toLowerCase())>=0
          || eventType.description.toLowerCase().includes(this.search.toLowerCase())
          || eventType.info.release.includes(this.search)
          || eventType.info.created.includes(this.search)
          || eventType.category.includes(this.search)
          || eventType.tags.find((tag) => {
              return tag.toLowerCase().includes(this.search.toLowerCase())
            })
          || eventType.mappings.find((mapping) => {
              return mapping.toLowerCase().includes(this.search.toLowerCase())
            }))
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
    },

    watch: {
      search: _.debounce((value) => {
        if (history.pushState) {
          history.pushState(null, '', '?q=' + encodeURI(value));
        }
      }, 100)
    }
  }
</script>

<style scoped lang="scss">
  .event-types {
    .PageContent-main {
      padding-right: 0;
    }

    #event-type-search {
      width: 100%;
      border: 2px solid #d2d2d6;
    }

    #event-type-search::placeholder {
      color: #d2d2d6;
    }

    #event-type-count {
      margin-top: -1em;
      margin-left: 0.3em;
      color: #888888;
      font-size: 0.9em;
    }

    .event-type {
      h4 {
        margin: 25px 0 0;
        padding: 6px 10px;
        clear: left;
        overflow: hidden;
        border-left: 3px solid #007dc1;
        color: #007dc1;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      h4::before {
        content: '\f0a2';
        margin-right: 8px;
        font-family: fontawesome;
      }

      .event-type-mappings {
        margin: -1em 0;
        padding: 10px 15px;
        color: #888888;
        font-size: 0.9em;
      }

      .event-type-description {
        margin-top: 10px;
        margin-bottom: 5px;
      }

      .event-type-tag::before {
        content: '\f02b';
        padding: 2px 4px;
        font-family: fontawesome;
      }

      .event-type-tag {
        display: block;
        margin: 2px;
        padding: 1px 3px;
        float: left;
        border-radius: 3px;
        background-color: #ffffff;
        font-size: 0.7em;
      }

      .event-type-release {
        clear: both;
        opacity: 0.7;
        font-size: 0.8em;
      }
    }
  }
</style>
