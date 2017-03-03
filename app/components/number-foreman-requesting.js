//Used on /dashboard/office/home template. Returns number of foreman requesting manpower
//out of total foreman and cutoff date for the requests.

import Ember from 'ember';
var count = 0;  //create global variable to count requests

export default Ember.Component.extend({
  firebaseApp: Ember.inject.service(),
  store: Ember.inject.service(),

  foremenRequesting: Ember.computed(function() {
    var date = new Date();
    date.setDate(date.getDate() - date.getDay());    //Sets date to most recent prior Sunday
    date.setHours(12);    //Sets hours to noon
    date.setMinutes(0);   //Sets minutes to zero
    date.setSeconds(0);   //Sets seconds to zero
    var millis = date.getTime();     //Converts prior Sunday at 12:00:00 to milliseconds
    var datem = new Date(millis);    //Converts milliseconds back to date object

    count = 0;

    var totalForemen = 0;

    var results = Ember.Object.create({    //results object to hold results.
      currentRequests: null,
      totalForemen: null,
      cutoffDate: null
    });

    var profiles = this.get('model');         //get profiles returned from route model
    profiles.forEach( function(profile) {     //iterate over returned profiles
      if(profile.get('manpowers.length') > 0) {
        var promise = new Ember.RSVP.Promise(function(resolve) {   //get promise of associated manpower requests for each profile
          return resolve(profile.get('manpowers'));
        });
        promise.then(function(resolvedManpowers) {    //work on resolved promise
          var manpowers = resolvedManpowers.sortBy('created').reverse();    //flip results to most recent first
          var lastManpowerRequest = manpowers.objectAt(0);                  //get first / most recent result in array
          var lastManpowerRequestCreated = lastManpowerRequest.get('created');   //get date that request was created in milliseconds
          if (lastManpowerRequestCreated > millis) {
            count++;    //if greater than cutoff date, increment counter of foreman requesting manpower
            results.set('currentRequests', count);   //could not figure out how to wait until final count, to set...so right now it sets during each iteration. result correct :/
          }
        });
      } else {
        results.set('currentRequests', count); //Set to 0 if no manpower requests.
      }
    });

    totalForemen = profiles.get('length');    //assign totalForemen the number of foremen in filtered profiles array

    results.set('totalForemen', totalForemen);
    results.set('cutoffDate', datem);  //assign cutoff date formed above

    return results;
  })
});
