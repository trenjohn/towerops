import Ember from 'ember';

export default Ember.Route.extend({
  firebaseApp: Ember.inject.service(),

  actions: {
    willTransition(transition) {
      if (transition.targetName === 'dashboard.index'){
        const uid = this.get('firebaseApp').auth().currentUser.uid;
        this.store.query('profile', {orderBy: 'uid', equalTo: uid}).then((users) => {
            const user = users.get('firstObject');
            var role = user.get('role');
            var firstLogin = user.get('firstLogin');
            if (firstLogin === '0') {
              this.transitionTo('update-password');
            } else if (role === "admin") {
              this.transitionTo('/dashboard/office/home');
            } else {

            switch (role)
              {
               case "office":
                  this.transitionTo('/dashboard/office/home');
                  break;
               case "admin":
                  this.transitionTo('/dashboard/admin/home');
                  break;
               case "foreman":
                  this.transitionTo('/dashboard/foreman/home');
                  break;
              }
          }
        });
      }
    }
  },

  beforeModel() {
    const uid = this.get('firebaseApp').auth().currentUser.uid;
    this.store.query('profile', {orderBy: 'uid', equalTo: uid}).then((users) => {
        const user = users.get('firstObject');
        var role = user.get('role');
        var firstLogin = user.get('firstLogin');
        if (firstLogin === '0') {
          this.transitionTo('update-password');
        } else {
          switch (role)
            {
             case "office":
                this.transitionTo('/dashboard/office/home');
                break;
             case "admin":
                this.transitionTo('/dashboard/admin/home');
                break;
             case "foreman":
                this.transitionTo('/dashboard/foreman/home');
                break;
            }
      }
    });
  },
  model() {
    const uid = this.get('firebaseApp').auth().currentUser.uid;
    return this.get('store').query('profile', {orderBy: 'uid', equalTo: uid});
  }
});
