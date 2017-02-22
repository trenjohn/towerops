import Ember from 'ember';

export default Ember.Controller.extend({
  firebaseApp: Ember.inject.service(),

  actions: {
    updatePassword() {
      //console.log(email);
      const auth = this.get('firebaseApp').auth();
      var user = auth.currentUser;
      const firstPassword = this.get('firstPassword');
      const secondPassword = this.get('secondPassword');

      var self = this;

      function transitionToDashboard() {
        self.transitionToRoute('dashboard');
      }

      if (firstPassword === secondPassword) {
        user.updatePassword(firstPassword).then(transitionToDashboard);
      } else {
        alert('Passwords do not match!');
      }
    }
  }
});
