import Ember from 'ember';

export default Ember.Controller.extend({
  firebaseApp: Ember.inject.service(),

  actions: {
    updatePassword() {
      //console.log(email);
      const auth = this.get('firebaseApp').auth();
      var user = auth.currentUser;
      var uid = user.uid;
      const firstPassword = this.get('firstPassword');
      const secondPassword = this.get('secondPassword');

      var self = this;

      function transitionToDashboard() {
        self.transitionToRoute('dashboard');
      }

      if (firstPassword === secondPassword) {
        user.updatePassword(firstPassword).then(function() {
          self.store.query('profile', {orderBy: 'uid', equalTo: uid}).then((users) => {
              var profileToUpdate = users.get('firstObject');
              var id = profileToUpdate.get('id');
              self.store.findRecord('profile', id).then(function(profile) {
                profile.set('firstLogin', '1');
                profile.save().then(transitionToDashboard);
              });
            });
        });
      } else {
        alert('Passwords do not match!');
      }
    }
  }
});
