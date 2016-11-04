(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;
  var userInfo ;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  service.getItemForSignUp = function(shortName){
    var response = $http({
      method : "GET",
      url : (ApiPath + '/menu_items/'+ shortName + ".json")
    });
    return response;
  };

  service.setUserInfo = function(fname,lname,email,phono,shortName,favmenuitem){
    debugger;
    userInfo = new UserInfo(fname,lname,email,phono,shortName,favmenuitem);
  };

  service.getUserInfo =function(){
    return userInfo;
  };

  function UserInfo(fname,lname,email,phono,shortName,favmenuitem) {
    this.fname=fname;
    this.lname =lname;
    this.email = email;
    this.phono = phono;
    this.shortName= shortName;
    this.favmenuitem = favmenuitem;
  }

}



})();
