import Ember from 'ember';

export default Ember.Component.extend({

    siteStats: Ember.computed(function() {
      var totalUsers = this.get('model.users.length');
      var totalJobs = this.get('model.jobs.length');
      var totalProfiles = this.get('model.profiles.length');
      var totalManpowers = this.get('model.manpowers.length');
      var totalFiles = this.get('model.files.length');

      var results = Ember.Object.create({    //results object to hold results.
        totalUsers: null,
        totalJobs: null,
        totalProfiles: null,
        totalManpowers: null,
        totalFiles: null
      });

      results.set('totalUsers', totalUsers);
      results.set('totalJobs', totalJobs);
      results.set('totalProfiles', totalProfiles);
      results.set('totalManpowers', totalManpowers);
      results.set('totalFiles', totalFiles);

      return results;
  })

});
