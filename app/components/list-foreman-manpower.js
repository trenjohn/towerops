//Used on /dashboard/foreman/home template. Returns most recently submitted manpower request.

import Ember from 'ember';

export default Ember.Component.extend({
  firebaseApp: Ember.inject.service(),
  store: Ember.inject.service(),

  foremanManpowerRequest: Ember.computed(function() {

//manpowerRequest Ember object used to store last manpower request.

    var manpowerRequest  = Ember.Object.create({
      week1Date: null,
      week2Date: null,
      week3Date: null,
      week1Request: null,
      week2Request: null,
      week3Request: null,
      created: null
    });

    var uid = this.get('firebaseApp').auth().currentUser.uid;
    var store = this.get('store');

//Get current user's profile, return resolved promise of manpower requests associated
//with that user, get last manpower request, set results to manpowerRequest object,
//and return.

    store.query('profile', {orderBy: 'uid', equalTo: uid}).then((users) => {
        const user = users.get('firstObject');

        var promise = new Ember.RSVP.Promise(function(resolve) {
          return resolve(user.get('manpowers'));
        });

        promise.then(function(resolvedManpowers) {
          if (resolvedManpowers.get('length') > 0) {
            //console.log(resolvedManpowers);
            var filteredManpowers = resolvedManpowers.sortBy('created').reverse();
            var filteredManpower = filteredManpowers.objectAt(0);
            //console.log(filteredManpower);

            var week1Date = filteredManpower.get('week1Date');
            var week2Date = filteredManpower.get('week2Date');
            var week3Date = filteredManpower.get('week3Date');
            var week1Request = filteredManpower.get('week1Request');
            var week2Request = filteredManpower.get('week2Request');
            var week3Request = filteredManpower.get('week3Request');
            var create = filteredManpower.get('created');
            var created = new Date(create);  //Turn epoch milliseconds into date.

            manpowerRequest.set('week1Date', week1Date);
            manpowerRequest.set('week2Date', week2Date);
            manpowerRequest.set('week3Date', week3Date);
            manpowerRequest.set('week1Request', week1Request);
            manpowerRequest.set('week2Request', week2Request);
            manpowerRequest.set('week3Request', week3Request);
            manpowerRequest.set('created', created);
          } else {
            manpowerRequest.set('created', 'No Manpower Requested!');
          }

          });
        });
      return manpowerRequest;
    })
});
