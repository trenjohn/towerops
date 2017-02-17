import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return Ember.RSVP.hash({
        manpowers: this.store.findAll('manpower'),
        foremen: this.store.findAll('profile')
      });
    }
});
