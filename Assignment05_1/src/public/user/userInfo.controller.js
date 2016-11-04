(function(){
  'use strict';
  angular.module('public')
  .controller('UserInfoController',UserInfoController);
  UserInfoController.$inject= ['MenuService'];
  function UserInfoController(MenuService){
    debugger;
    var ctrl =this;
    var userInfo = MenuService.getUserInfo();
    if(userInfo !== undefined){
      ctrl.fullname =userInfo!="undefined" ?  userInfo.fname + " " +  userInfo.lname: " ";
      ctrl.email = userInfo!="undefined" ?userInfo.email: "";
      ctrl.phono  =userInfo!="undefined" ? userInfo.phono: "";
      ctrl.shortname = userInfo!="undefined" ?userInfo.shortname : "";
      ctrl.favmenuitem=userInfo.favmenuitem;
      ctrl.showmainDiv= true;
      ctrl.showmsgDiv=false;
    }else{
      ctrl.showmainDiv= false;
      ctrl.showmsgDiv=true;
    }

    // ctrl.success(function(){
    //   debugger;
    //   if(MenuService.userInfo !== undefined){
    //     return true;
    //   }else{
    //     return false;
    //   }
    // });
  }
})();
