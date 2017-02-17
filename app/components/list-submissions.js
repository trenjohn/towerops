import Ember from 'ember';
var time = Date.now();
var cutoffTime = time - 86400000;

export default Ember.Component.extend({
  
  displayTime: Ember.computed(function() {
    var cutoffTimer = null;
    var selection = this.get('selection');
    if (selection) {
      cutoffTimer = time - selection;
    } else {
      cutoffTimer = cutoffTime;
    }
    //var cutoffTime = time - selection;
    var displayTime = new Date(cutoffTimer);
    return displayTime;
  }).property('selection'),

  filteredProfiles: Ember.computed(function() {
    var cutoffTimer = null;
    var selection = this.get('selection');
    if (selection) {
      cutoffTimer = time - selection;
    } else {
      cutoffTimer = cutoffTime;
    }
    //console.log(selection);
    var cutoffTime = time - selection;
    var foremen = this.get('model.foremen');
    var filtered = foremen.filter( function(profile) {
        return profile.get('role') === 'foreman';
    });

    let filteredForemenResults = [];

    filtered.forEach( function(profile) {
      var filteredForeman = Ember.Object.create({
        firstName: null,
        lastName: null,
        files: []
      });

      var firstName = profile.get('firstName');
      var lastName = profile.get('lastName');
      filteredForeman.set('firstName', firstName);
      filteredForeman.set('lastName', lastName);

      if(profile.get('files.length') > 0) {
        var promise = new Ember.RSVP.Promise(function(resolve) {
          return resolve(profile.get('files'));
        });
        promise.then(function(resolvedFiles) {
          var filteredFiles = resolvedFiles.filter( function(file) {
            //var time = Date.now();
            return file.get('created') > cutoffTimer; //1486590898958
          });
          filteredForeman.set('files', filteredFiles);
          //return filteredFiles;
        });
      }
      filteredForemenResults.pushObject(filteredForeman);
    });
    //console.log(filteredForemenResults[0]);
    return filteredForemenResults;
  }).property('selection')
});
