import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    createJobsite: function() {
      var jobName = this.get('jobName');
      var jobNumber = this.get('jobNumber');
      var streetAddress = this.get('streetAddress');
      var zipCode = this.get('zipCode');
      var city = this.get('city');
      var state = this.get('state');
      var foreman = this.get('foreman');
      var projectManager = this.get('projectManager');
      var open = this.get('isOpen');
      var created = Date.now();
      //console.log(open);

      var jobsite = this.store.createRecord(('jobsite'), {
          'jobName': jobName,
          'jobNumber': jobNumber,
          'streetAddress': streetAddress,
          'zipCode': zipCode,
          'city': city,
          'state': state,
          'foreman': foreman,
          'projectManager': projectManager,
          'open': open,
          'created': created
        });
        jobsite.save();
      }
    }
});
