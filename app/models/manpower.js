import DS from 'ember-data';

export default DS.Model.extend({
  uid: DS.belongsTo('profile'),
  week1Date: DS.attr(),
  week2Date: DS.attr(),
  week3Date: DS.attr(),
  week1Request: DS.attr(),
  week2Request: DS.attr(),
  week3Request: DS.attr(),
  created: DS.attr()
});
