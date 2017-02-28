import Ember from 'ember';

export default Ember.Controller.extend({
  firebaseApp: Ember.inject.service(),
  progress: 0,
  actions: {
    didSelectFiles(data) {
      //var model = this.get('model');
      console.log(data);
      const storageRef = this.get('firebaseApp').storage().ref();
      let file = data;
      var uid = this.get('firebaseApp').auth().currentUser.uid;
      var fileName = file[0].name;
      console.log(fileName);
      var self = this;
      //window.firebase.storage().ref();

      var uploadTask = storageRef.child(uid + '/' + file[0].name).put(file[0]);
      uploadTask.on(window.firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          this.set('progressText', `Upload is ${Math.round(progress * 100) / 100} % done`);
          this.set('progress', progress);
          switch (snapshot.state) {
            case window.firebase.storage.TaskState.PAUSED:
              this.set('status', 'Upload is paused');
              break;
            case window.firebase.storage.TaskState.RUNNING:
              this.set('status', 'Upload is running');
              break;
          }
        }, (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;
          case 'storage/unknown':
            break;
        }

      }, () => {
        this.set('downloadURL', uploadTask.snapshot.downloadURL);
        const newUpload = this.store.createRecord(('fileupload'), {
            'uid': uid,
            'fileName': fileName,
            'downloadURL': uploadTask.snapshot.downloadURL,
            'created': window.firebase.database.ServerValue.TIMESTAMP
        });
        var uid = this.get('firebaseApp').auth().currentUser.uid;
        this.store.query('profile', {orderBy: 'uid', equalTo: uid}).then((profiles) => {
            const profile = profiles.get('firstObject');
            profile.get('files').addObject(newUpload);
            newUpload.save().then(function() {
              return profile.save();
            }).then(function() {
              alert('File Upload Complete!');
              self.transitionToRoute('dashboard.foreman.home');
            });
         });
          // });
        });
      }
    }
});
