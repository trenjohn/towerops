import Ember from 'ember';

export default Ember.Component.extend({
  firebaseApp: Ember.inject.service(),
  store: Ember.inject.service(),

  weekOne: Ember.computed(function() {
    var week1 = null;
    week1 = new Date();
    week1.setDate(week1.getDate() + (7-week1.getDay())%7+1);

    var month = week1.getMonth();
    month = month + 1;
    var day = week1.getDate();
    var year = week1.getFullYear();

    var todayDate = month + '.' + day + '.' + year;

    return todayDate;
  }),

  weekTwo: Ember.computed(function() {
    var week2 = null;
    week2 = new Date();
    week2.setDate(week2.getDate() + (7-week2.getDay())%7+8);

    var month = week2.getMonth();
    month = month + 1;
    var day = week2.getDate();
    var year = week2.getFullYear();

    var todayDate = month + '.' + day + '.' + year;

    return todayDate;
  }),

  weekThree: Ember.computed(function() {
    var week3 = null;
    week3 = new Date();
    week3.setDate(week3.getDate() + (7-week3.getDay())%7+15);

    var month = week3.getMonth();
    month = month + 1;

    var day = week3.getDate();
    var year = week3.getFullYear();

    var todayDate = month + '.' + day + '.' + year;

    return todayDate;
  }),

  actions: {
    submitThreeWeek() {
      var uid = this.get('firebaseApp').auth().currentUser.uid;
      var store = this.get('store');

      var week1Request = this.get('week1');
      var week1Date = this.get('weekOne');
      var week2Request = this.get('week2');
      var week2Date = this.get('weekTwo');
      var week3Request = this.get('week3');
      var week3Date = this.get('weekThree');


      const newManpower = store.createRecord(('manpower'), {
          'uid': uid,
          'week1Date': week1Date,
          'week2Date': week2Date,
          'week3Date': week3Date,
          'week1Request': week1Request,
          'week2Request': week2Request,
          'week3Request': week3Request,
          'created': window.firebase.database.ServerValue.TIMESTAMP
      });

      //console.log(newManpower);

      store.query('profile', {orderBy: 'uid', equalTo: uid}).then((profiles) => {
          const profile = profiles.get('firstObject');
          profile.get('manpowers').addObject(newManpower);
          newManpower.save().then(function() {
            return profile.save();
          });
       }).then(function() {
         alert('Manpower Request Submitted!');
       });
      }
  }

});
