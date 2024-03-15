<template>
  <div class="event-types">
    <p>
      <input
        id="event-type-search"
        type="text"
        name="filter"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
        placeholder="Search event types for..."
        :value="search"
        @input="updateSearch"
      >
      <select
        id="event-type-release"
        v-model="release"
        name="release"
        markdown="block"
      >
        <option :value="null">
          All Releases
        </option>
        <option
          v-for="release in releases"
          :key="release"
          :value="release"
        >
          {{ release }}
        </option>
      </select>
    </p>
    <div id="event-type-count">
      Found <b>{{ resultCount }}</b> matches
    </div>
    <div
      v-for="eventType in filteredEventTypes"
      :key="eventType.id"
      class="event-type"
    >
      <h4
        :id="eventType.id | titleAsId"
        v-html="$options.filters.title(eventType.id)"
      />

      <!-- <div
        v-if="eventType.mappings.length > 0"
        class="event-type-mappings"
      >
        <b>Legacy event types: </b> {{ eventType.mappings.join(', ') }}
      </div> -->

      <p
        v-if="eventType.description"
        class="event-type-description"
      >
        {{ eventType.description }}
      </p>
      <p
        v-else
        class="event-type-description"
      >
        No Description
      </p>
      <div v-if="['user.risk.change', 'analytics.feedback.provide', 'security.events.provider.receive_event', 'device.signals.status.timeout', 
      'policy.auth.reevaluate.fail', 'policy.continuous_access.evaluate', 'policy.continuous_access.action', 'user.session.context.changed', 
      'policy.entity_risk.evaluate', 'policy.entity_risk.action', 'user.session.end', 'user.session.clear', 'user.authentication.universal_logout', 
      'workflows.users.delegatedflow.run'].indexOf(eventType.id) !== -1">
        <p class="event-itp-type">
          See also: <a href="http://localhost:8080/docs/reference/api/itp-et">ITP Event Types</a>
        </p>
      </div>
      <div class="event-type-tags">
        <code
          v-for="tag in eventType.tags"
          :key="tag"
          class="event-type-tag"
        >{{ tag }}</code>
      </div>
      <div class="event-type-release">
        Since: <SmartLink :item="{link: '/docs/release-notes/', text: eventType.info.release}" />
      </div>
    </div>
  </div>
</template>

<script>
  import eventTypes from './../../vuepress-site/data/event-types.json'
  import _ from 'lodash'

  export default {
    components: {
      SmartLink: () => import("../components/SmartLink"),
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
    data() {
      return {
        search: this.$route.query.q || '',
        release: this.$route.query.release || null,
        eventTypes: null
      }
    },
    computed: {
      filteredEventTypes: function() {
        if( !this.search && !this.release ) {
          return this.eventTypes
        }

        return this.eventTypes.filter((eventType) => {
          const value = this.search.toLowerCase();
          return (!this.release || eventType.info.release == this.release) && (
             eventType.id.toLowerCase().indexOf(value)>=0
          || eventType.description.toLowerCase().includes(value)
          || eventType.info.release.includes(this.search)
          || eventType.info.created.includes(this.search)
          || eventType.category.includes(this.search)
          || eventType.tags.find((tag) => {
              return tag.toLowerCase().includes(value)
            })
          || eventType.mappings.find((mapping) => {
              return mapping.toLowerCase().includes(value)
            }))
        });
      },

      resultCount() {
        return  this.filteredEventTypes.length
      }
    },
    watch: {
      search() {
        this.addHistory()
      },
      release() {
        this.addHistory()
      }
    },
    created() {
      this.eventTypes = eventTypes.versions
        .find(version => version.version == "V2").eventTypes
        .filter(eventType => !eventType.beta && !eventType.internal)
      this.releases = _.chain(this.eventTypes)
        .map(eventType => eventType.info)
        .map(info => info.release)
        .uniq()
        .sort()
        .reverse()
        .value()
    },
    methods: {
      updateSearch: _.debounce(function(e) {
        this.search = e.target.value
      }, 100),
      addHistory() {
        if (history.pushState) {
          if (this.search && this.release) {
            history.pushState(null, '', '?q=' + encodeURI(this.search) + '&release=' + encodeURI(this.release))
          } else if (this.search) {
            history.pushState(null, '', '?q=' + encodeURI(this.search))
          } else if (this.release) {
            history.pushState(null, '', '?release=' + encodeURI(this.release))
          } else {
            history.pushState(null, '', this.$route.path)
          }
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/css/abstracts/_colors";

  $border_color: map-get(map-get($colors, "form"), "input-border");
  $link_color: map-get(map-get($colors, "link"), "base");

  .event-types .PageContent-main {
    padding-right: 0;
  }

  .event-types #event-type-search {
    padding: 0.5rem 0.3rem;
    width: 100%;

    border: 2px solid $border_color;

    font-size: 1em;
  }

  .event-types #event-type-search::placeholder {
    color: $border_color;
  }

  .event-types #event-type-release {
    margin-top: 1em;
  }

  .event-types #event-type-count {
    margin-top: -1em;
    margin-left: 0.3em;

    font-size: 0.8em;
  }

  .event-types .event-type h4 {
    clear: left;
    margin: 25px 0 0;
    padding: 6px 10px;
    overflow: hidden;

    border-left: 3px solid $link_color;

    text-overflow: ellipsis;
    white-space: nowrap;
    color: $link_color;
  }

  .event-types .event-type h4::before {
    content: "";

    margin-right: 8px;

    font-family: "fontawesome";
  }

  .event-types .event-type .event-type-mappings {
    margin: -1em 0;
    padding: 10px 15px;

    font-size: 0.8em;
    word-break: break-all;
  }

  .event-types .event-type .event-type-description {
    margin-top: 10px;
    margin-bottom: 5px;
  }

  .event-types .event-type .event-itp-type {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .event-types .event-type .event-type-tag::before {
    content: "";

    padding: 2px 4px;

    font-family: "fontawesome";
  }

  .event-types .event-type .event-type-tag {
    display: block;
    float: left;
    margin: 2px;
    padding: 1px 3px;

    border-radius: 3px;
    background-color: #ffffff;

    font-size: 0.7em;
  }

  .event-types .event-type .event-type-release {
    clear: both;

    opacity: 0.7;

    font-size: 0.8em;
  }
</style>
