import DS from 'ember-data';

export default DS.Model.extend({
  uid: DS.belongsTo('profile'),
  fileName: DS.attr(),
  downloadURL: DS.attr(),
  created: DS.attr()
});
