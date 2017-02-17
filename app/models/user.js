import DS from 'ember-data';

export default DS.Model.extend({
  uid: DS.attr(),
  email: DS.attr(),
});
