import Ember from 'ember';


export default Ember.Controller.extend({
  actions: {
    didMakeSelection(value) {
      //console.log(value);
      if (!value) {
        this.set('error', 'You must fill out this field');

      } else {
        this.set('selection', value);
      }
      // var x = this.get('selection');
      // console.log(x);
      }
  },
});
