import DS from 'ember-data';

export default DS.Model.extend({
  jobName: DS.attr(),
  jobNumber: DS.attr(),
  streetAddress: DS.attr(),
  zipCode: DS.attr(),
  city: DS.attr(),
  state: DS.attr(),
  foreman: DS.attr(),
  projectManager: DS.attr(),
  open: DS.attr('boolean'),
  created: DS.attr()
});
