import Ember from 'ember';
var count = 0;

export default Ember.Component.extend({
  firebaseApp: Ember.inject.service(),
  store: Ember.inject.service(),

  foremenRequesting: Ember.computed(function() {
    var date = new Date();
    date.setDate(date.getDate() - (7-date.getDay())%7+1);
    date.setHours(12);
    date.setMinutes(0);
    date.setSeconds(0);
    var millis = date.getTime();
    var datem = new Date(millis);

    count = 0;

    var totalForemen = 0;

    var results = Ember.Object.create({
      currentRequests: null,
      totalForemen: null,
      cutoffDate: null
    });

    var profiles = this.get('model');
    profiles.forEach( function(profile) {
      if(profile.get('manpowers.length') > 0) {
        var promise = new Ember.RSVP.Promise(function(resolve) {
          return resolve(profile.get('manpowers'));
        });
        promise.then(function(resolvedManpowers) {
          var manpowers = resolvedManpowers.sortBy('created').reverse();
          var lastManpowerRequest = manpowers.objectAt(0);
          var lastManpowerRequestCreated = lastManpowerRequest.get('created');
          if (lastManpowerRequestCreated > millis) {
            //console.log(lastManpowerRequest);
            //console.log(count);
            count++;
            results.set('currentRequests', count);
          }
        });
      }
    });


    totalForemen = profiles.get('length');

    //results.set('currentRequests', count);
    results.set('totalForemen', totalForemen);
    results.set('cutoffDate', datem);

    return results;
  })
});
