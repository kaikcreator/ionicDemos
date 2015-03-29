angular.module('login', ['SocialAuthService'])


.controller('LoginCtrl', function($ionicPlatform, $scope, $state, SocialAuth) {
    
	var silentLoginAttempt = function(){
		SocialAuth.isGooglePlusAvailable()
    	.then(function(available){
    		console.log("google plus availability is: " + available);
    		if(!available){
    			$scope.showGoogleLogin = false;
    		}
    		else{
    			var promise = SocialAuth.googlePlusSilentLogin();
    	    	
    	    	promise.success(function(msg){
    	    		console.log("silent login success");
    	    		$state.go('userInfo');
    		    });
    	    	
    	    	promise.error(function(err){
    	    		console.log("silent login failed: " + err);
    	    		$scope.showGoogleLogin = true;
    		    });
    		}
    	});
	}
	
    var initView = function(){
    	
    	$scope.showGoogleLogin = false;
    	
    	$ionicPlatform.ready(function(){
    		if(SocialAuth.getAuthUser() == null){
    			silentLoginAttempt();
    		}
    		else{
    			$state.go('userInfo');
    		}
    	})
    	
    }

    
    $scope.$on('$ionicView.beforeEnter', function(){
        initView();
    });
    
    
    $scope.login = function(){
    	
		var promise = SocialAuth.googlePlusLogin();
		
		promise.success(function(msg){
			$state.go('userInfo');
	    });
		promise.error(function(err){
	  		alert("Invalid login!! Error: " + err);
	    });
    }
     
})
