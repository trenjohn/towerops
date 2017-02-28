import Ember from 'ember';

export default Ember.Controller.extend({
  firebaseApp: Ember.inject.service(),

  jobNumberx: Ember.computed(function() {
    var jobNumber = this.get('selection');
    return jobNumber;
  }).property('selection'),


  actions: {
    didMakeSelection(value) {
      if (!value) {
        this.set('error', 'You must fill out this field');
      } else {
        this.set('selection', value);
        this.store.query('jobsite', {orderBy: 'jobNumber', equalTo: value}).then((jobsites) => {
          var jobsite = jobsites.get('firstObject');
          var id = jobsite.get('id');
          var selectedJobsite = this.store.findRecord('jobsite', id);
          this.set('selectedJobsite', selectedJobsite);
        });
      }
    },

    editJobsite: function() {

      var jobNumberx = this.get('jobNumberx');
      var jobName = this.get('jobName');
      var foreman = this.get('foreman');
      var projectManager = this.get('projectManager');
      var streetAddress = this.get('streetAddress');
      var city = this.get('city');
      var state = this.get('state');
      var zipCode = this.get('zipCode');
      var open = this.get('isOpen');

      this.store.query('jobsite', {orderBy: 'jobNumber', equalTo: jobNumberx}).then((jobsites) => {
        //console.log(jobsites);
        var jobsite = jobsites.get('firstObject');
        var id = jobsite.get('id');

      this.store.findRecord('jobsite', id).then(function(jobsiteToUpdate) {
        if(jobNumberx) {
          jobsiteToUpdate.set('jobNumber', jobNumberx);
        }
        if(jobName) {
          jobsiteToUpdate.set('jobName', jobName);
        }
        if(foreman) {
          jobsiteToUpdate.set('foreman', foreman);
        }
        if(projectManager) {
          jobsiteToUpdate.set('projectManager', projectManager);
        }
        if(streetAddress) {
          jobsiteToUpdate.set('streetAddress', streetAddress);
        }
        if(city) {
          jobsiteToUpdate.set('city', city);
        }
        if(state) {
          jobsiteToUpdate.set('state', state);
        }
        if(zipCode) {
          jobsiteToUpdate.set('zipCode', zipCode);
        }
        if (open === undefined || false) {
          open = false;
          jobsiteToUpdate.set('open', open);
        } else if (open === true) {
          jobsiteToUpdate.set('open', open);
        }


        jobsiteToUpdate.save().then(function() {
          alert('Jobsite Updated!');
        });
        }).catch((error)=>{
          console.log(error);
        });
      });
    }
  }
});
