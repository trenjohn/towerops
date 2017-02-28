import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    signOut() {
      let controller = this;
      this.get('session').close().then(() => {
        controller.transitionToRoute('sign-out');
      }, (error) => {
        console.log('Error!!!!!'+error);
      }).catch(function(err) {
        console.log(err);
      });
    }
  }
});
