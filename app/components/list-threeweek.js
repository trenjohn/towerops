//Used on /dashboard/office/manpower template. Returns last manpower request (filteredProfiles)
//submitted by each foreman.

import Ember from 'ember';

export default Ember.Component.extend({

  filteredProfiles: Ember.computed(function() {

    var foremen = this.get('model.foremen');  //Returned from route model "foremen".
    var filtered = foremen.filter( function(profile) {      //filter role of returned profiles for "foreman"
        return profile.get('role') === 'foreman';
    });

    let filteredForemenResults = [];    //array to hold all filteredForeman objects.

    filtered.forEach( function(profile) {      //forEach to iterate over resulting array

      var filteredForeman = Ember.Object.create({    //filteredForeman object holds result for each iteration.
        firstName: null,
        lastName: null,
        week1Date: null,
        week2Date: null,
        week3Date: null,
        week1Request: null,
        week2Request: null,
        week3Request: null,
        created: null
      });

      var firstName = profile.get('firstName');
      var lastName = profile.get('lastName');
      filteredForeman.set('firstName', firstName);    //set foreman name immediately after retrieving.
      filteredForeman.set('lastName', lastName);


      if(profile.get('manpowers.length') > 0) {
        var promise = new Ember.RSVP.Promise(function(resolve) {    //promise to resolve manpower requests associated with a given profile.
          return resolve(profile.get('manpowers'));
        });
        promise.then(function(resolvedManpowers) {
          var filteredManpowers = resolvedManpowers.sortBy('created').reverse();
          var filteredManpower = filteredManpowers.objectAt(0);


          var created = filteredManpower.get('created');
          var show = new Date();   //get Date object
          show.setDate(show.getDate() - show.getDay());   //Sets date to most recent prior Sunday
          show.setHours(8);    //Sets hours to 8 a.m.
          show.setMinutes(0);   //Sets minutes to zero
          show.setSeconds(0);   //Sets seconds to zero
          var millis = show.getTime();     //Converts prior Sunday at 8:00:00 to milliseconds

          if (created > millis) {

            var week1Date = filteredManpower.get('week1Date');
            var week2Date = filteredManpower.get('week2Date');
            var week3Date = filteredManpower.get('week3Date');
            var week1Request = filteredManpower.get('week1Request');
            var week2Request = filteredManpower.get('week2Request');
            var week3Request = filteredManpower.get('week3Request');

            filteredForeman.set('week1Date', week1Date);
            filteredForeman.set('week2Date', week2Date);
            filteredForeman.set('week3Date', week3Date);
            filteredForeman.set('week1Request', week1Request);
            filteredForeman.set('week2Request', week2Request);
            filteredForeman.set('week3Request', week3Request);

          }
        });
      }
      filteredForemenResults.pushObject(filteredForeman);      //push resulting object from forEach iteration to result array.
    });
    return filteredForemenResults;
  })
});
