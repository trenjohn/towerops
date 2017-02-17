import Ember from 'ember';

export default Ember.Route.extend({
  firebaseApp: Ember.inject.service(),

  actions: {
    accessDenied() {
      if (this.get('session.isAuthenticated')) {
        this.transitionTo('dashboard');
      } else {
        this.transitionTo('index');
      }
    }
  }
});
