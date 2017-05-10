import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('sign-in');
  //this.authenticatedRoute('dashboard');
  this.route('sign-up');
  this.route('sign-out');
  this.authenticatedRoute('update-password');
  this.authenticatedRoute('personnel');
  this.authenticatedRoute('jobsites');

  this.authenticatedRoute('dashboard', function() {
    this.route('foreman', function() {
      this.route('home');
      this.route('weekly-submissions');
      this.route('manpower');
      this.route('useful-links');
    });
    this.authenticatedRoute('office', function() {
      this.route('home');
      this.route('weeklysubmissions');
      this.route('manpower');
    });
    this.authenticatedRoute('admin', function() {
      this.route('home');
      this.route('create-profile');
      this.route('edit-profile');
      this.route('create-jobsite');
      this.route('edit-jobsite');
    });
  });
  this.route('catchAll', { path: '*:' });

});

export default Router;
