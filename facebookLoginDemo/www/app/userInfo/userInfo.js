angular.module('userInfo', ['SocialAuthService'])


.controller('UserInfoCtrl', function($scope, $state, SocialAuth) {
    
	$scope.userName = "Demo user";
	
    var initView = function(){
        $scope.userID = SocialAuth.getAuthUser().userID;
        console.log("user oAuth token: " + SocialAuth.getAuthUser().accessToken);
    }

    $scope.$on('$ionicView.beforeEnter', function(){
        initView();
    });
    
    $scope.logout = function(){
    	SocialAuth.facebookLogout().then(function(value){
    		console.log("logout value: " + value);
    		$state.go('login');
    	})
    }
     
})
