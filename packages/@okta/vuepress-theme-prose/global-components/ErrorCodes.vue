<template>
  <div class="error-codes">
    <div class="error-codes-search-container">
      <input
        :value="search"
        type="text"
        name="filter"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
        placeholder="Search error codes for... (Titles, HTTP Status, or Error Code)"
        id="error-code-search"
        @input="updateSearch"
      >
      <div class="status-wrapper">
        <select
          name="release"
          markdown="block"
          id="error-codes-release"
          v-model="filterStatusCode"
        >
          <option :value="null">
            Status Codes
          </option>
          <option
            :value="statusCode.statusCode"
            v-for="statusCode in statusCodes"
            :key="statusCode.statusCode"
          >
            {{ statusCode.statusCode }} - {{ statusCode.statusReasonPhrase }}
          </option>
        </select>
        <span
          title="Reset Search"
          class="reset-search"
          @click="resetSearch"
        ></span>
      </div>
    </div>
    <div id="error-code-count">
      Found <b>{{ resultCount }}</b> matches
    </div>
    <div
      class="error-code"
      v-for="oktaError in filteredErrorCodes"
      :key="oktaError.errorCode"
    >
      <h4 :id="oktaError.errorCode">
        <span
          class="title-error-code"
          v-html="$options.filters.titleErrorCode(oktaError)"
        ></span>
        <span>
          {{ oktaError.title }}
          <a
            :href="'#' + oktaError.errorCode"
            aria-hidden="true"
            class="header-anchor header-link"
          >
            <i class="fa fa-link"></i>
          </a>
        </span>
      </h4>
      <div class="error-code-mappings">
        <b>HTTP Status: </b>
        <code>{{ oktaError.statusCode }} {{ oktaError.statusReasonPhrase }}</code>
      </div>
      <p
        class="error-code-description"
        v-if="oktaError.errorDescription"
        v-html="oktaError.errorDescription"
      ></p>
      <p
        class="error-code-description"
        v-else
        v-html="oktaError.errorSummary"
      ></p>
      <div class="example">
        <h6
          class="toggleErrorExample"
          :class="{ open: openExample == oktaError.errorCode }"
          @click="toggleResponseExample(oktaError.errorCode)"
        >
          <span class="underline">
            <span v-if="openExample == oktaError.errorCode">Hide</span>
            <span v-else>Show</span> Example Error Response</span>
        </h6>
        <pre
          class="language-http"
          v-if="openExample == oktaError.errorCode"
        >
          <code>
            <span class="token response-status">HTTP/1.1 <span class="token property">{{ oktaError.statusCode }} {{ oktaError.statusReasonPhrase }}</span></span>
            <span class="token header-name keyword">Content-Type:</span> application/json
            <span class="token application/json">
            <span class="token punctuation">{</span>
            <span class="token property">"errorCode"</span><span class="token punctuation">:</span> <span class="token string">"{{ oktaError.errorCode }}"</span><span class="token punctuation">,</span>
            <span class="token property">"errorSummary"</span><span class="token punctuation">:</span> <span class="token string">"{{ oktaError.errorSummary }}"</span><span class="token punctuation">,</span>
            <span class="token property">"errorLink"</span><span class="token punctuation">:</span> <span class="token string">{{ oktaError.errorCode }}</span><span class="token punctuation">,</span>
            <span class="token property">"errorId"</span><span class="token punctuation">:</span> <span class="token string">"{{ errorId() }}"</span><span class="token punctuation">,</span>
            <span class="token property">"errorCauses"</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
            <span class="token punctuation">}</span>
            </span>
          </code>
        </pre>
      </div>
    </div>
  </div>
</template>

<script>
import errorCodes from "./../../vuepress-site/data/error-codes.json";
import _ from "lodash";

export default {
  filters: {
    titleErrorCode: function(oktaError) {
      const parts = oktaError.errorCode.split(/(E0+)(\d+)/);
      return parts[1] + "<b>" + parts[2] + "</b>: ";
    }
  },
  data() {
    return {
      search: this.$route.query.q || "",
      filterStatusCode: this.$route.query.httpStatus || null,
      openExample: ""
    };
  },
  computed: {
    filteredErrorCodes: function() {
      if (!this.search && !this.filterStatusCode) {
        return this.errorCodes.errors;
      }

      return this.errorCodes.errors.filter(oktaError => {
        return (
          (!this.filterStatusCode ||
            oktaError.statusCode == this.filterStatusCode) &&
          (oktaError.errorCode.includes(this.search) ||
            oktaError.statusCode.toString().includes(this.search) ||
            oktaError.title.toLowerCase().includes(this.search.toLowerCase()))
        );
      });
    },

    resultCount() {
      return this.filteredErrorCodes.length;
    }
  },
  watch: {
    search() {
      this.addHistory();
    },
    filterStatusCode() {
      this.addHistory();
    }
  },
  created() {
    this.errorCodes = errorCodes;
    this.statusCodes = _.chain(this.errorCodes.errors)
      .uniqBy(function(error) {
        return error.statusCode;
      })
      .sortBy(function(error) {
        return error.statusCode;
      })
      .value();
  },
  methods: {
    resetSearch() {
      this.filterStatusCode = null;
      this.search = "";
    },
    toggleResponseExample(errorCode) {
      if (errorCode == this.openExample) {
        this.openExample = "";
      } else {
        this.openExample = errorCode;
      }
    },
    updateSearch: _.debounce(function(e) {
      this.search = e.target.value;
    }, 100),
    addHistory() {
      if (history.pushState) {
        if (this.search && this.filterStatusCode) {
          history.pushState(
            null,
            "",
            "?q=" +
              encodeURI(this.search) +
              "&httpStatus=" +
              encodeURI(this.filterStatusCode)
          );
        } else if (this.search) {
          history.pushState(null, "", "?q=" + encodeURI(this.search));
        } else if (this.filterStatusCode) {
          history.pushState(
            null,
            "",
            "?httpStatus=" + encodeURI(this.filterStatusCode)
          );
        } else {
          history.pushState(null, "", this.$route.path);
        }
      }
    },
    errorId() {
      const length = 19;
      const chars =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";
      var result = "sample";
      for (var i = length; i > 0; --i)
        result += chars[Math.floor(Math.random() * chars.length)];
      return result;
    }
  }
};
</script>

<style scoped lang="scss">
  @import "../assets/css/abstracts/_colors.scss";

  $border_color: map-get(map-get($colors, "form"), "input-border");
  $link_color: map-get(map-get($colors, "link"), "base");

  .error-codes .PageContent-main {
    padding-right: 0;
  }

  .error-codes .error-codes-search-container {
    display: flex;
    align-items: center;
    flex-direction: row;
    margin-bottom: 20px;
  }

  @media (max-width: 786px) {
    .error-codes .error-codes-search-container {
      flex-direction: column;
    }

    .error-codes .error-codes-search-container input#error-code-search {
      width: 100%;
      margin: 0 0 10px 0;
    }

    .error-codes .error-codes-search-container .status-wrapper {
      width: 100%;
    }

    .error-codes .error-codes-search-container .status-wrapper select {
      width: calc(100% - 25px);
    }
  }

  .error-codes .reset-search {
    cursor: pointer;
  }

  .error-codes .reset-search::before {
    content: "";

    margin-left: 8px;

    font-family: "fontawesome", sans-serif;
    text-align: center;
  }

  .error-codes select {
    height: 45px;

    border: 2px solid $border_color;
  }

  .error-codes #error-code-search {
    flex: 1;
    margin-right: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 10px;

    font-size: 18px;

    border: 2px solid $border_color;
  }

  .error-codes #error-code-search::placeholder {
    color: $border_color;
  }

  .error-codes #error-code-release {
    margin-top: 1em;
  }

  .error-codes #error-code-count {
    margin-top: -1em;
    margin-left: 0.3em;

    color: #888888;
    font-size: 0.9em;
  }

  .error-codes .error-code h4 {
    margin: 25px 0 0;
    padding: 6px 10px;
    clear: left;

    color: $link_color;
    text-overflow: ellipsis;
    white-space: nowrap;

    overflow: hidden;
    border-left: 3px solid $link_color;
  }

  .error-codes .error-code h4 .title-error-code {
    font-family: "Menlo", "Monaco", "Consolas", "Courier New", monospace;
  }

  .error-codes .error-code h4::before {
    content: "";

    margin-right: 8px;

    font-family: "fontawesome", sans-serif;
  }

  .error-codes .error-code pre {
    padding: 0.5rem;
    margin: 0;

    white-space: pre-line;
  }

  .error-codes .error-code pre code {
    white-space: pre;
  }

  .error-codes .error-code .toggleErrorExample {
    color: $link_color;

    cursor: pointer;
  }

  .error-codes .error-code .toggleErrorExample .underline:hover {
    text-decoration: underline;
  }

  .error-codes .error-code .toggleErrorExample {
    font-size: 14px;
  }

  .error-codes .error-code .toggleErrorExample::before {
    content: "";

    margin-right: 8px;

    font-family: "fontawesome", sans-serif;
    text-decoration: none;
  }

  .error-codes .error-code .toggleErrorExample.open::before {
    content: "";

    margin-right: 8px;

    font-family: "fontawesome", sans-serif;
    text-decoration: none;
  }

  .error-codes .error-code .error-code-mappings {
    margin: -1em 0;
    padding: 10px 15px;

    color: #888888;
    font-size: 0.9em;
  }

  .error-codes .error-code .error-code-description {
    margin-top: 10px;
    margin-bottom: 5px;
  }

  .error-codes .error-code .error-code-tag::before {
    content: "";

    padding: 2px 4px;

    font-family: "fontawesome", sans-serif;
  }

  .error-codes .error-code .error-code-tag.world::before {
    content: "";

    padding: 2px 4px;

    font-family: "fontawesome", sans-serif;
  }

  .error-codes .error-code .error-code-tag {
    display: block;
    margin: 2px;
    padding: 1px 3px;
    float: left;

    font-size: 0.7em;

    border-radius: 3px;
    background-color: #ffffff;
  }

  .error-codes .error-code .error-code-release {
    clear: both;

    font-size: 0.8em;

    opacity: 0.7;
  }
</style>
