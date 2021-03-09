<template>
  <div class="error-codes">
    <div class="error-codes-search-container">
      <input type="text" id="error-code-search" name="filter" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="Search error codes for... (Titles, HTTP Status, or Error Code)" :value="search" @input="updateSearch"/>
      <div class="status-wrapper">
        <select id="error-codes-release" name="release" markdown="block" v-model="filterStatusCode">
          <option :value="null">Status Codes</option>
          <option v-for="statusCode in statusCodes" v-bind:key="statusCode.statusCode" v-bind:value="statusCode.statusCode">
            {{ statusCode.statusCode }} - {{ statusCode.statusReasonPhrase}}
          </option>
        </select>
        <span class="reset-search" @click="resetSearch" title="Reset Search"></span>
      </div>
    </div>
    <div id="error-code-count">Found <b>{{ resultCount }}</b> matches</div>
    <div class="error-code" v-for="oktaError in filteredErrorCodes" :key="oktaError.errorCode">
      <h4 :id="oktaError.errorCode">
        <span class="title-error-code" v-html="$options.filters.titleErrorCode(oktaError)"></span>
        <span>{{oktaError.title}} <a :href="'#'+oktaError.errorCode" aria-hidden="true" class="header-anchor header-link"><i class="fa fa-link"></i></a></span>
      </h4>
      <div class="error-code-mappings">
        <b>HTTP Status: </b> <code>{{ oktaError.statusCode }} {{ oktaError.statusReasonPhrase }}</code>
      </div>
      <p class="error-code-description" v-if="oktaError.errorDescription" v-html="oktaError.errorDescription"></p>
      <p class="error-code-description" v-else v-html="oktaError.errorSummary"></p>
      <div class="example">
        <h6 class="toggleErrorExample" :class="{open: openExample == oktaError.errorCode}" @click="toggleResponseExample(oktaError.errorCode)"><span class="underline"><span v-if="openExample == oktaError.errorCode">Hide</span><span v-else>Show</span> Example Error Response</span></h6>

        <pre class="language-http" v-if="openExample == oktaError.errorCode">
          <code>
<span class="token response-status">HTTP/1.1 <span class="token property">{{oktaError.statusCode}} {{oktaError.statusReasonPhrase}}</span></span>
<span class="token header-name keyword">Content-Type:</span> application/json
<span class="token application/json">
<span class="token punctuation">{</span>
    <span class="token property">"errorCode"</span><span class="token punctuation">:</span> <span class="token string">"{{oktaError.errorCode}}"</span><span class="token punctuation">,</span>
    <span class="token property">"errorSummary"</span><span class="token punctuation">:</span> <span class="token string">"{{oktaError.errorSummary}}"</span><span class="token punctuation">,</span>
    <span class="token property">"errorLink"</span><span class="token punctuation">:</span> <span class="token string">{{oktaError.errorCode}}</span><span class="token punctuation">,</span>
    <span class="token property">"errorId"</span><span class="token punctuation">:</span> <span class="token string">"{{errorId()}}"</span><span class="token punctuation">,</span>
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
  import errorCodes from './../../vuepress-site/data/error-codes.json'
  import _ from 'lodash'

  export default {
    created() {
      this.errorCodes = errorCodes
      this.statusCodes = _.chain(this.errorCodes.errors)
        .uniqBy(function(error) {
          return error.statusCode
        })
        .sortBy(function(error) {
          return error.statusCode
        })
        .value()
    },
    data() {
      return {
        search: this.$route.query.q || '',
        filterStatusCode: this.$route.query.httpStatus || null,
        openExample: ''
      }
    },
    computed: {
      filteredErrorCodes: function() {
        if( !this.search && !this.filterStatusCode ) {
          return this.errorCodes.errors
        }

        return this.errorCodes.errors.filter((oktaError) => {
          return (!this.filterStatusCode || oktaError.statusCode == this.filterStatusCode) &&  (
            oktaError.errorCode.includes(this.search)
          || oktaError.statusCode.toString().includes(this.search)
          || oktaError.title.toLowerCase().includes(this.search.toLowerCase()));
        });
      },

      resultCount() {
        return  this.filteredErrorCodes.length
      }
    },
    watch: {
      search() {
        this.addHistory()
      },
      filterStatusCode() {
        this.addHistory()
      }
    },
    filters: {
      titleErrorCode: function (oktaError) {
        const parts = oktaError.errorCode.split(/(E0+)(\d+)/)
        return parts[1] + "<b>" + parts[2] + "</b>: "
      },
    },
    methods: {
      resetSearch() {
        this.filterStatusCode = null;
        this.search = '';
      },
      toggleResponseExample(errorCode) {
        if(errorCode == this.openExample) {
          this.openExample = ''
        } else {
          this.openExample = errorCode
        }
      },
      updateSearch: _.debounce(function(e) {
        this.search = e.target.value
      }, 100),
      addHistory() {
        if (history.pushState) {
          if (this.search && this.filterStatusCode) {
            history.pushState(null, '', '?q=' + encodeURI(this.search) + '&httpStatus=' + encodeURI(this.filterStatusCode))
          } else if (this.search) {
            history.pushState(null, '', '?q=' + encodeURI(this.search))
          } else if (this.filterStatusCode) {
            history.pushState(null, '', '?httpStatus=' + encodeURI(this.filterStatusCode))
          } else {
            history.pushState(null, '', this.$route.path)
          }
        }
      },
      errorId() {
          const length = 19;
          const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-'
          var result = 'sample';
          for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
          return result;
      }
    }
  }
</script>

<style scoped lang="scss">
  .error-codes {
    .PageContent-main {
      padding-right: 0;
    }

    .error-codes-search-container {
      display: flex;
      align-items: center;
      flex-direction: row;
      margin-bottom: 20px;
    }

    @media screen and (max-width: 786px) {
      .error-codes-search-container {
        flex-direction: column;
        input#error-code-search {
          width: 100%;
          margin: 0 0 10px 0;
        }
        .status-wrapper {
          width: 100%;
          select {
            width: calc(100% - 25px);
          }
        }
      }
    }

    .reset-search {
      cursor: pointer;
    }

    .reset-search::before {
      content: '\f00d';
      margin-left: 8px;
      font-family: fontawesome;
      text-align: center;
    }

    select {
      height: 45px;
      border: 2px solid #d2d2d6;
    }

    #error-code-search {
      flex: 1;
      margin-right: 10px;
      border: 2px solid #d2d2d6;
      font-size: 18px;
      padding-top:10px;
      padding-bottom: 10px;
      padding-left: 10px;
    }

    #error-code-search::placeholder {
      color: #d2d2d6;
    }

    #error-code-release {
      margin-top: 1em;
    }

    #error-code-count {
      margin-top: -1em;
      margin-left: 0.3em;
      color: #888888;
      font-size: 0.9em;
    }

    .error-code {
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

      h4 .title-error-code {
        font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
      }

      h4::before {
        content: '\f071';
        margin-right: 8px;
        font-family: fontawesome;
      }

      pre {
        padding: 5px 0px;
        margin: 0px;
        white-space: pre-line;
      }

      pre code {
        white-space: pre;
        padding-left: 20px;
      }

      .toggleErrorExample {
        color: #007dc1;
        cursor: pointer;

        .underline:hover {
          text-decoration: underline;
        }
      }

      .toggleErrorExample {
        font-size: 14px;
      }
      .toggleErrorExample:before {
        content: '\f0a9';
        margin-right: 8px;
        font-family: fontawesome;
        text-decoration: none;
      }
      .toggleErrorExample.open::before {
        content: '\f0ab';
        margin-right: 8px;
        font-family: fontawesome;
        text-decoration: none;
      }

      .error-code-mappings {
        margin: -1em 0;
        padding: 10px 15px;
        color: #888888;
        font-size: 0.9em;
      }

      .error-code-description {
        margin-top: 10px;
        margin-bottom: 5px;
      }

      .error-code-tag::before {
        content: '\f02b';
        padding: 2px 4px;
        font-family: fontawesome;
      }

      .error-code-tag.world::before {
        content: '\f0ac';
        padding: 2px 4px;
        font-family: fontawesome;
      }

      .error-code-tag {
        display: block;
        margin: 2px;
        padding: 1px 3px;
        float: left;
        border-radius: 3px;
        background-color: #ffffff;
        font-size: 0.7em;
      }

      .error-code-release {
        clear: both;
        opacity: 0.7;
        font-size: 0.8em;
      }
    }
  }

</style>
