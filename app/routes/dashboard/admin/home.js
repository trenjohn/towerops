import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
        users: this.store.findAll('user'),
        jobs: this.store.findAll('jobsite'),
        profiles: this.store.findAll('profile'),
        manpowers: this.store.findAll('manpower'),
        files: this.store.findAll('fileupload')
        });
  }
});
