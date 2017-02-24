//Used on /dashboard/office/weeklysubmissions template. Returns cutoff date (displayTime)
//for submissions displayed and object containing files uploaded and foreman name
//since cutoff date.

import Ember from 'ember';
var time = Date.now(); //Get current time since epoch in milliseconds
var cutoffTime = time - 86400000; //Set default cutoff date. 86400000 milliseconds in a week.

export default Ember.Component.extend({

//displayTime depends on "selection" from dropdown box for cutoff date.

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
  }).property('selection'), //listens to "selection". See controller /dashboard/office/weeklysubmissions
                            //didMakeSelection action.

  filteredProfiles: Ember.computed(function() {
    var cutoffTimer = null;
    var selection = this.get('selection');
    if (selection) {
      cutoffTimer = time - selection;
    } else {
      cutoffTimer = cutoffTime;
    }

    var cutoffTime = time - selection;
    var foremen = this.get('model.foremen');  //Returned from route model "foremen".
    var filtered = foremen.filter( function(profile) {  //filter role of returned profiles for "foreman"
        return profile.get('role') === 'foreman';
    });

    let filteredForemenResults = [];  //array to hold all filteredForeman objects.

    filtered.forEach( function(profile) {     //forEach to iterate over resulting array
      var filteredForeman = Ember.Object.create({
        firstName: null,
        lastName: null,
        files: []    //array for files allowing return of more than 1 file created after cutoff date.
      });

      var firstName = profile.get('firstName');
      var lastName = profile.get('lastName');
      filteredForeman.set('firstName', firstName);  //set foreman name immediately after retrieving.
      filteredForeman.set('lastName', lastName);

      if(profile.get('files.length') > 0) {
        var promise = new Ember.RSVP.Promise(function(resolve) {
          return resolve(profile.get('files'));
        });
        promise.then(function(resolvedFiles) {
          var filteredFiles = resolvedFiles.filter( function(file) {
            //var time = Date.now();
            return file.get('created') > cutoffTimer; //cutoffTimer set above. Either default 1 week or based on selection.
          });
          filteredForeman.set('files', filteredFiles);
          //return filteredFiles;
        });
      }
      filteredForemenResults.pushObject(filteredForeman);  //push resulting object from forEach iteration to result array.
    });

    return filteredForemenResults;
  }).property('selection') //listens to "selection". See controller /dashboard/office/weeklysubmissions
                            //didMakeSelection action.
});
