import Ember from 'ember';

export default Ember.Component.extend({

  filteredProfiles: Ember.computed(function() {
    //var manpower = this.get('model.manpower');
    // console.log(manpowers);
    var foremen = this.get('model.foremen');
    var filtered = foremen.filter( function(profile) {
        return profile.get('role') === 'foreman';
    });

    let filteredForemenResults = [];

    filtered.forEach( function(profile) {

      var filteredForeman = Ember.Object.create({
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
      filteredForeman.set('firstName', firstName);
      filteredForeman.set('lastName', lastName);


      if(profile.get('manpowers.length') > 0) {
        var promise = new Ember.RSVP.Promise(function(resolve) {
          return resolve(profile.get('manpowers'));
        });
        promise.then(function(resolvedManpowers) {
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

          filteredForeman.set('week1Date', week1Date);
          filteredForeman.set('week2Date', week2Date);
          filteredForeman.set('week3Date', week3Date);
          filteredForeman.set('week1Request', week1Request);
          filteredForeman.set('week2Request', week2Request);
          filteredForeman.set('week3Request', week3Request);

          //console.log(filteredForeman);
          //return filteredFiles;
        });
      }
      filteredForemenResults.pushObject(filteredForeman);
    });
    //console.log(filteredForemenResults[0]);
    //console.log(filteredForemenResults);
    return filteredForemenResults;
  })
});
