import Ember from 'ember';

export default Ember.Route.extend({
  firebaseApp: Ember.inject.service(),

  model() {
    const uid = this.get('firebaseApp').auth().currentUser.uid;

    return Ember.RSVP.hash({
        user: this.get('store').query('profile', {orderBy: 'uid', equalTo: uid}),
        personnel: this.store.findAll('profile')
        });
      }
});
