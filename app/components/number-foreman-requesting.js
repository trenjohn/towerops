import Ember from 'ember';

export default Ember.Component.extend({
  // firebaseApp: Ember.inject.service(),
  // store: Ember.inject.service(),
  //
  // foremanRequesting: Ember.computed(function() {
    // var date = new Date();
    // date.setDate(date.getDate() - (7-date.getDay())%7);
    // var millis = date.getMilliseconds();
    // console.log(millis);
    //
    // var count = 0;
    //
    // var numberRequests  = Ember.Object.create({
    //   totalForemen: null,
    //   currentRequests: null
    // });
    //
    // var store = this.get('store');
    // var foremen = store.findAll('profile').filter( function(profile) {
    //     return profile.get('role') === 'foreman';
    //   });
    //
    // var numberForemen = foremen.get('length');
    // numberRequests.set('totalForemen', numberForemen);
    //
    // foremen.forEach( function(foreman) {
    //
    //   var promise = new Ember.RSVP.Promise(function(resolve) {
    //     return resolve(foreman.get('manpowers'));
    //   });
    //
    //   promise.then(function(resolvedManpowers) {
    //     //console.log(resolvedManpowers);
    //     var filteredManpowers = resolvedManpowers.sortBy('created').reverse();
    //     var filteredManpower = filteredManpowers.objectAt(0);
    //     var filteredManpowerCreated = filteredManpower.get('created');
    //
    //     if (filteredManpowerCreated > millis) {
    //       count = count + 1;
    //     }
    //   });
    //
    // }).then( function() {
    //   numberRequests.set('currentRequests', count);
    // });
    //
    // return numberRequests;
    // })
});
