import Ember from 'ember';

export default Ember.Service.extend({
  firebaseApp: Ember.inject.service(),
  store: Ember.inject.service(),
  users: null,

  init() {
    this._super(...arguments);
    this.set('users', [])
  },

  set(user) {
    this.get('users').pushObject(user);
  },

  get() {
    return this.get('users');
  }

});
