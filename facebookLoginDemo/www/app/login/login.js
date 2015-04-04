angular.module('login', ['SocialAuthService'])


.controller('LoginCtrl', function($ionicPlatform, $scope, $state, SocialAuth) {
    
	var silentLoginAttempt = function(){
		SocialAuth.isFacebookAvailable()
    	.then(function(available){
    		console.log("facebook plus availability is: " + available);
    		if(!available){
                $scope.showFacebookLogin = false;
    		}
    		else{
    			var promise = SocialAuth.facebookSilentLogin();
    	    	
    	    	promise.success(function(msg){
    	    		console.log("silent login success");
    	    		$state.go('userInfo');
    		    });
    	    	
    	    	promise.error(function(err){
    	    		console.log("silent login failed: " + err);
                    $scope.showFacebookLogin = true;
    		    });
    		}
    	});
	}
	
    var initView = function(){
    	
        $scope.showFacebookLogin = false;
    	
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
    	
		var promise = SocialAuth.facebookLogin();
		
		promise.success(function(msg){
			$state.go('userInfo');
	    });
		promise.error(function(err){
	  		alert("Invalid login!! Error: " + err);
	    });
    }
     
})
