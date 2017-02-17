import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'p',

    todayDate: Ember.computed(function() {
      var time = Date.now();
      var date = new Date(time);
      var month = date.getMonth();
      month = month + 1;
      var day = date.getDate();
      var year = date.getFullYear();

      var todayDate = month + '.' + day + '.' + year;

      //console.log(todayDate);
      return todayDate;
    })
});
