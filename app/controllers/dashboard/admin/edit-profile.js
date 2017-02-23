import Ember from 'ember';

export default Ember.Controller.extend({
  firebaseApp: Ember.inject.service(),

  uid: Ember.computed(function() {
    var id = this.get('selection');
    return id;
  }).property('selection'),

  // selectedProfile: Ember.computed(function() {
  //   var id = this.get('selection');
  //   var selectedProfile = this.store.findRecord('profile', id)
  //   return selectedProfile;
  // }).property('selection'),

  actions: {
    didMakeSelection(value) {
      //console.log(value);
      if (!value) {
        this.set('error', 'You must fill out this field');
      } else {
        this.set('selection', value);
        this.store.query('profile', {orderBy: 'uid', equalTo: value}).then((profiles) => {
          var profile = profiles.get('firstObject');
          var id = profile.get('id');
          var selectedProfile = this.store.findRecord('profile', id);
          this.set('selectedProfile', selectedProfile);
        });
      }
      //var x = this.get('selection');
      //console.log(x);
    },

    editProfile: function() {

      var uid = this.get('uid');
      console.log(uid);

      //onst uid = this.get('firebaseApp').auth().currentUser.uid;
      const firstName = this.get('firstName');
      const lastName = this.get('lastName');
      const role = this.get('role');
      const title = this.get('title');
      const phone = this.get('phone');
      const email = this.get('email');
      const firstLogin = this.get('firstLogin');

      this.store.query('profile', {orderBy: 'uid', equalTo: uid}).then((profiles) => {

        var profile = profiles.get('firstObject');
        var id = profile.get('id');
        console.log(profile);
        console.log(id);

      this.store.findRecord('profile', id).then(function(profileToUpdate) {
        if(firstName) {
          profileToUpdate.set('firstName', firstName);
        }
        if(lastName) {
          profileToUpdate.set('lastName', lastName);
        }
        if(role) {
          profileToUpdate.set('role', role);
        }
        if(title) {
          profileToUpdate.set('title', title);
        }
        if(phone) {
          profileToUpdate.set('phone', phone);
        }
        if(email) {
          profileToUpdate.set('email', email);
        }
        if(firstLogin) {
          profileToUpdate.set('firstLogin', firstLogin);
        }
        profileToUpdate.save().then(console.log(profileToUpdate));
        }).catch((error)=>{
          console.log(error);
        });
      });
    }
  }
});
