import Ember from 'ember';

export default Ember.Component.extend({
  firebaseApp: Ember.inject.service(),
  store: Ember.inject.service(),

  foremanWeeklySubmissionDate: Ember.computed(function() {

    var submissionDate  = Ember.Object.create({
      created: null
    });

    var uid = this.get('firebaseApp').auth().currentUser.uid;
    var store = this.get('store');

    store.query('profile', {orderBy: 'uid', equalTo: uid}).then((users) => {
        const user = users.get('firstObject');

        var promise = new Ember.RSVP.Promise(function(resolve) {
          return resolve(user.get('files'));
        });

        promise.then(function(resolvedFiles) {
          //console.log(resolvedManpowers);
          var returnedFiles = resolvedFiles.sortBy('created').reverse();
          var file = returnedFiles.objectAt(0);
          //console.log(filteredManpower);

          var created = file.get('created');
          var lastWeeklySubmissionDate = new Date(created);

          submissionDate.set('created', lastWeeklySubmissionDate);

          });
        });
      return submissionDate;
    })
});
