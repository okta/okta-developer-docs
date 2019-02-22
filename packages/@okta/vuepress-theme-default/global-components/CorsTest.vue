<template>
  <div id="cors-test">
    <form class="form-cors-test" role="form">
      <div class="form-group col-md-6">
        <div class="input-group">
          <div class="input-group-addon">https://</div>
          <input id="input-orgUrl" type="text" class="form-control" v-model="domain">
        </div>
      </div>
      <button type="button" class="btn btn-primary" @click="testCors"><i class="fa fa-cloud-download"></i> Test</button>
    </form>
    <div class="cors-test-result" v-if="info">
      <div class="panel panel-default panel-profile">
        <div class="panel-heading">
          <span class="panel-title">Profile</span>
        </div>
        <div class="panel-body">
          <div class="form-horizontal" role="form">
            <div class="form-group">
              <label class="col-1-3 control-label">ID</label>
              <div class="col-2-3">
                <p class="form-control-static">{{ info.data.id }}</p>
              </div>
            </div>
            <div class="form-group">
              <label class="col-1-3 control-label">Status</label>
              <div class="col-2-3">
                <p class="form-control-static">{{ info.data.status }}</p>
              </div>
            </div>
            <div class="form-group">
              <label class="col-1-3 control-label">Login</label>
              <div class="col-2-3">
                <p class="form-control-static">{{ info.data.profile.login }}</p>
              </div>
            </div>
            <div class="form-group">
              <label class="col-1-3 control-label">Email</label>
              <div class="col-2-3">
                <p class="form-control-static">{{ info.data.profile.email }}</p>
              </div>
            </div>
            <div class="form-group">
              <label class="col-1-3 control-label">First Name</label>
              <div class="col-2-3">
                <p class="form-control-static">{{ info.data.profile.firstName }}</p>
              </div>
            </div>
            <div class="form-group">
              <label class="col-1-3 control-label">Last Name</label>
              <div class="col-2-3">
                <p class="form-control-static">{{ info.data.profile.lastName }}</p>
              </div>
            </div>
            <div class="form-group">
              <label class="col-1-3 control-label">Mobile Phone</label>
              <div class="col-2-3">
                <p class="form-control-static">{{ info.data.profile.mobilePhone }}</p>
              </div>
            </div>
            <div class="form-group">
              <label class="col-1-3 control-label">Created</label>
              <div class="col-2-3">
                <p class="form-control-static">{{ info.data.created }}</p>
              </div>
            </div>
            <div class="form-group">
              <label class="col-1-3 control-label">Updated</label>
              <div class="col-2-3">
                <p class="form-control-static">{{ info.data.lastUpdated }}</p>
              </div>
            </div>
            <div class="form-group">
              <label class="col-1-3 control-label">Last Login</label>
              <div class="col-2-3">
                <p class="form-control-static">{{ info.data.lastLogin }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cors-test-result" v-if="error">
      <strong>Cross-Origin Request Blocked</strong>
      <p>You must explicitly add this site to the list of allowed websites in your Okta Admin Dashboard</p>
    </div>
  </div>
</template>

<script>
  const axios = require('axios')

  export default {
    data() {
      return {
        domain: '',
        info: null,
        error: null
      }
    },

    methods: {
      testCors: function() {
        this.info = null
        this.error = null
        axios.defaults.withCredentials = true;
        axios
          .get('https://'+this.domain+'/api/v1/users/me')
          .then(response => {
            this.info = response
            this.error = null
          })
          .catch(error => {
            this.info = null
            this.error = true
          })
      }
    }
  }
</script>
