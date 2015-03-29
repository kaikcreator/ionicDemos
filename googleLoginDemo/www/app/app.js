// Google Login Demo App

angular.module('googleLoginDemo', ['ionic', 'login', 'userInfo'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/')
	
	$stateProvider
	.state('login', {
	    url: '/',
	    controller: 'LoginCtrl',
	    templateUrl: 'app/login/login.html'
	})
	.state('userInfo', {
	    url: '/userInfo',
	    controller: 'UserInfoCtrl',
	    templateUrl: 'app/userInfo/userInfo.html'
	});
})
