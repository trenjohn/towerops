import Ember from 'ember';

export default Ember.Controller.extend({
  firebaseApp: Ember.inject.service(),

  actions: {
    createProfile: function() {
      var uid = this.get('uid');
      var firstName = this.get('firstName');
      var lastName = this.get('lastName');
      var role = this.get('role');
      var title = this.get('title');
      var phone = this.get('phone');
      var email = this.get('email');
      var firstLogin = 0;

      const profile = this.store.createRecord(('profile'), {
          'uid': uid,
          'firstName': firstName,
          'lastName': lastName,
          'role': role,
          'title': title,
          'phone': phone,
          'email': email,
          'firstLogin': firstLogin
        });
        profile.save();
      }
    }
});
