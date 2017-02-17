import DS from 'ember-data';

export default DS.Model.extend({
  uid: DS.attr(),
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  role: DS.attr('string'),
  title: DS.attr('string'),
  phone: DS.attr('string'),
  email: DS.attr('string'),
  files: DS.hasMany('fileupload', { async: true, inverse: null}),
  manpowers: DS.hasMany('manpower', { async: true, inverse: null})
});
