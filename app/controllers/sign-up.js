import Ember from 'ember';

export default Ember.Controller.extend({
  firebaseApp: Ember.inject.service(),

  actions: {
  signUp() {
    //console.log(email);
    const auth = this.get('firebaseApp').auth();
    const email = this.get('email');
    const password = this.get('password');

    var self = this;

    function transitionToSignIn() {
      self.transitionToRoute('sign-in');
    }

    auth.createUserWithEmailAndPassword(email, password).then((userResponse) => {
        const user = this.store.createRecord('user', {
          uid: userResponse.uid,
          email: userResponse.email
        });
        user.save().then(transitionToSignIn);
      }).catch(function(error) {
        alert(error.message);
        console.log(error);
      });
    }
  }
});
