(function(){
  'use strict';
  angular.module('public')
  .controller('SignupController',SignupController);
  SignupController.$inject= ['MenuService'];
  function SignupController(MenuService){
    var signupCtrl =this;
    signupCtrl.isInvalid = false;
    signupCtrl.inSuccess = false;
    function reset() {
      signupCtrl.fname = "";
      signupCtrl.lname = "";
      signupCtrl.email = "";
      signupCtrl.pno = "";
      signupCtrl.regForm.shortname = "";
      signupCtrl.regForm.fname.$touched = false;
      signupCtrl.regForm.lname.$touched = false;
      signupCtrl.regForm.email.$touched = false;
      signupCtrl.regForm.pno.$touched = false;

     }

    signupCtrl.submit =function(){
      var promise = MenuService.getItemForSignUp(signupCtrl.shortName);
      promise.then(function (response) {
        signupCtrl.myFavItem = response.data;
        signupCtrl.isInvalid = false;
        signupCtrl.inSuccess = true;
        MenuService.setUserInfo(signupCtrl.fname,signupCtrl.lname,signupCtrl.email,signupCtrl.pno,signupCtrl.shortName,signupCtrl.myFavItem);
        //reset();
      });
      promise.catch(function(error){
        signupCtrl.isInvalid = true;
        signupCtrl.inSuccess = false;
      });
    };
  }

})();
