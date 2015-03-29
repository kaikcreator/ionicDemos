angular.module('userInfo', ['SocialAuthService'])


.controller('UserInfoCtrl', function($scope, $state, SocialAuth) {
    
	$scope.userName = "Demo user";
	
    var initView = function(){
        $scope.userName = SocialAuth.getAuthUser().displayName;
        console.log("user oAuth token: " + SocialAuth.getAuthUser().oauthToken);
    }

    $scope.$on('$ionicView.beforeEnter', function(){
        initView();
    });
    
    $scope.logout = function(){
    	SocialAuth.googlePlusLogout().then(function(value){
    		console.log("logout value: " + value);
    		$state.go('login');
    	})
    }
     
})
