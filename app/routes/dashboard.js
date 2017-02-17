import Ember from 'ember';

export default Ember.Route.extend({
  firebaseApp: Ember.inject.service(),

  actions: {
    willTransition(transition) {
      if (transition.targetName === 'dashboard.index'){
        //console.log('Trying to go to /dashboard');
        //console.log("DEBUG2: Router.didTransition");
        const uid = this.get('firebaseApp').auth().currentUser.uid;
        this.store.query('profile', {orderBy: 'uid', equalTo: uid}).then((users) => {
            const user = users.get('firstObject');
            var role = user.get('role');
            //console.log(role);
            //console.log('beforeModel');
            switch (role)
              {
               case "office":
                  this.transitionTo('/dashboard/office');
                  break;
               case "admin":
                  this.transitionTo('/dashboard/admin');
                  break;
               case "foreman":
                  this.transitionTo('/dashboard/foreman');
                  break;
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
        //console.log(role);
        //console.log('beforeModel');
        switch (role)
          {
           case "office":
              this.transitionTo('/dashboard/office');
              break;
           case "admin":
              this.transitionTo('/dashboard/admin');
              break;
           case "foreman":
              this.transitionTo('/dashboard/foreman');
              break;
          }
    });
  },
  model() {
    const uid = this.get('firebaseApp').auth().currentUser.uid;
    //console.log('model');
    return this.get('store').query('profile', {orderBy: 'uid', equalTo: uid});
  }
});
