//Used on /dashboard template. Returns formatted date...file needs to be renamed.

import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'p',   //default component returns as <div>, was screwing up display until changed to <p>

    todayDate: Ember.computed(function() {
      var time = Date.now();  //get time since epoch in milliseconds
      var date = new Date(time);   //convert milliseconds to date object
      var month = date.getMonth();  //extract month from date object
      month = month + 1;  //getMonth() -- 0 is January, so to return correct number of month add 1
      var day = date.getDate();   //extract day from date object
      var year = date.getFullYear();   //extract year from date object

      var todayDate = month + '.' + day + '.' + year;    //string back together in desired format

      return todayDate;
    })
});
