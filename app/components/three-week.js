//Used on /dashboard/foreman/manpower template. Returns formatted dates for
//upcoming three mondays.

import Ember from 'ember';

export default Ember.Component.extend({
  firebaseApp: Ember.inject.service(),
  store: Ember.inject.service(),

  weekOne: Ember.computed(function() {
    var week1 = null;
    week1 = new Date();   //get Date object
    week1.setDate(week1.getDate() + (7-week1.getDay())%7+1);   //Sets date to immediate upcoming Monday
    var month = week1.getMonth();   //extract month from date object
    month = month + 1;  //getMonth() -- 0 is January, so to return correct number of month add 1
    var day = week1.getDate();    //extract day from date object
    var year = week1.getFullYear();   //extract year from date object

    var todayDate = month + '.' + day + '.' + year;   //string back together in desired format

    return todayDate;
  }),

  weekTwo: Ember.computed(function() {
    var week2 = null;
    week2 = new Date();   //get Date object
    week2.setDate(week2.getDate() + (7-week2.getDay())%7+8);  //Sets date to Monday following immediate upcoming Monday
    var month = week2.getMonth();   //extract month from date object
    month = month + 1;    //getMonth() -- 0 is January, so to return correct number of month add 1
    var day = week2.getDate();    //extract day from date object
    var year = week2.getFullYear();   //extract year from date object

    var todayDate = month + '.' + day + '.' + year;   //string back together in desired format

    return todayDate;
  }),

  weekThree: Ember.computed(function() {
    var week3 = null;
    week3 = new Date();   //get Date object
    week3.setDate(week3.getDate() + (7-week3.getDay())%7+15);   //Sets date for Monday two weeks after immediate upcoming Monday
    var month = week3.getMonth();   //extract month from date object
    month = month + 1;    //getMonth() -- 0 is January, so to return correct number of month add 1
    var day = week3.getDate();    //extract day from date object
    var year = week3.getFullYear();   //extract year from date object

    var todayDate = month + '.' + day + '.' + year;   //string back together in desired format

    return todayDate;
  }),

  actions: {      //See templates/components/three-week for submitThreeWeek() usage.
    submitThreeWeek() {
      var uid = this.get('firebaseApp').auth().currentUser.uid;
      var store = this.get('store');

      var week1Request = this.get('week1');   //Assigns info submitted in form to variables.
      var week1Date = this.get('weekOne');
      var week2Request = this.get('week2');
      var week2Date = this.get('weekTwo');
      var week3Request = this.get('week3');
      var week3Date = this.get('weekThree');


      const newManpower = store.createRecord(('manpower'), {      //Creates object matching 'manpower' model
          'uid': uid,
          'week1Date': week1Date,
          'week2Date': week2Date,
          'week3Date': week3Date,
          'week1Request': week1Request,
          'week2Request': week2Request,
          'week3Request': week3Request,
          'created': window.firebase.database.ServerValue.TIMESTAMP   //get Firebase timestamp...consider just changing to JS date.now()
      });

      store.query('profile', {orderBy: 'uid', equalTo: uid}).then((profiles) => {  //get current user profile
          const profile = profiles.get('firstObject');
          profile.get('manpowers').addObject(newManpower);    //add to existing manpowers
          newManpower.save().then(function() {                //save to 'manpower' model
            return profile.save();    //save associated profile
          });
       }).then(function() {
         alert('Manpower Request Submitted!');    //popup for success
       });
      }
  }
});
