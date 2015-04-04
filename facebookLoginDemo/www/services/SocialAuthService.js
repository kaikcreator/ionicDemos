angular.module('SocialAuthService', [])


/**
 * A service that handles methods related with Social authentication
 */
.factory('SocialAuth', function($http, $q) {

	var SocialAuth = {};
	
	var authUser = null;
	
    var isFacebookAPIAvailableOrReject = function(deferred){
        try{
            if(facebookConnectPlugin != null)
            {
                return true;
            }
        }
        catch(err){}
            
        setTimeout(function(){
            console.log("API not available");
            deferred.reject("API not available");
        }, 100);

        return false;

    }
    

    /**
	 * @brief Static method that returns the authenticated user object
     *
	 */
    SocialAuth.getAuthUser = function() {
        return authUser;
    };
	
    
    /**
	 * @brief Static method that check whether google+ is available or not, 
	 * returning a promise, with a unique parameter (true/false).
     *
	 */
    SocialAuth.isFacebookAvailable = function() {
        var deferred = $q.defer();

        if(isFacebookAPIAvailableOrReject(deferred)){
           deferred.resolve(true);      	
        }


        //return the promise object
        return deferred.promise;
    };
    
    /**
	 * @brief Static method that attempts to log-in using Facebook auth API.
     * In a first instance, the method performs the FB login, and in case of success, 
     * it retrieves the access Token, returning all the data in the success callback.
	 * This method returns a promise with success/error callbacks.
	 * 
     * @returns obj The success callback gets a JSON object with the following contents g.e.
     *  obj.email        // 'eddyverbruggen@gmail.com'
     *  obj.userId       // user id
     *  obj.displayName  // 'Eddy Verbruggen'
     *  obj.gender       // 'male' (other options are 'female' and 'unknown'
     *  obj.imageUrl     // 'http://link-to-my-profilepic.google.com'
     *  obj.givenName    // 'Eddy'
     *  obj.middleName   // null (or undefined, depending on the platform)
     *  obj.familyName   // 'Verbruggen'
     *  obj.birthday     // '1977-04-22'
     *  obj.ageRangeMin  // 21 (or null or undefined or a different number)
     *  obj.ageRangeMax  // null (or undefined or a number)
     *  obj.idToken
     *  obj.oauthToken
	 */
    SocialAuth.facebookLogin = function(){
        var deferred = $q.defer();
        
        
        if(isFacebookAPIAvailableOrReject(deferred))
        {    

            facebookConnectPlugin.login(["public_profile"],
                                        function(userData){
                                            alert("UserInfo: " + JSON.stringify(userData));
                                            authUser = angular.fromJson(userData.authResponse);
                                            deferred.resolve(userData.authResponse);
                                        },
                                        function (error) { alert("" + error); deferred.reject(error);}
                                       );    
        }
        
        
        //get the promise object
        var promise = deferred.promise;

        //add success callback to the promise, and associate it with the RESOLVE call
        promise.success = function(fn) {
            return promise.then(function(response) {
                fn(response);
            })
        }

        //add success callback to the promise, and associate it with the REJECT call
        promise.error = function(fn) {
            return promise.then(null, function(response) {
                fn(response);
            })
        }

        //return the promise object
        return promise;
    }
    
    
    
    
    /**
	 * @brief Static method that attempts to log-in silently using Facebook auth API.
	 * This method returns a promise with success/error callbacks.
	 * If it succeeds, you get the same object returned by facebookLogin. If it fails, it
	 * will not show the auth dialog to the user.
	 * 
     * @returns obj The success callback gets a JSON object like the one returned by 
     * SocialAuth.facebookLogin
     * 
     * @see SocialAuth.facebookLogin
	 */
    SocialAuth.facebookSilentLogin = function() {
        var deferred = $q.defer();

        if(isFacebookAPIAvailableOrReject(deferred)){
            
            facebookConnectPlugin.getLoginStatus(
                function(response) {
                    alert("status: " + response.status);
                    if (response.status === 'connected') {
                        alert("UserInfo: " + JSON.stringify(response.authResponse));
                        authUser = angular.fromJson(response.authResponse);
                        deferred.resolve(response.authResponse);

                    } else {
                        deferred.reject("user not logged in facebook");
                    }
                }
                ,function(){deferred.reject("get login status error");}
            );

        }

        //get the promise object
        var promise = deferred.promise;

        //add success callback to the promise, and associate it with the RESOLVE call
        promise.success = function(fn) {
            return promise.then(function(response) {
                fn(response);
            })
        }

        //add success callback to the promise, and associate it with the REJECT call
        promise.error = function(fn) {
            return promise.then(null, function(response) {
                fn(response);
            })
        }

        //return the promise object
        return promise;
    };
    
    
    
    /**
	 * @brief Static method that attempts to clear the OAuth2 token 
	 * returning a promise, with a unique message parameter
     *
	 */
    SocialAuth.facebookLogout = function() {
        var deferred = $q.defer();

        if(isFacebookAPIAvailableOrReject(deferred)){
            facebookConnectPlugin.logout(
                function (msg) {
                    authUser = null;
                    deferred.resolve(msg);
                },
                function (err) {
                    alert("logout error: " + err);
                    deferred.reject(err);
                }              
            );
        }

        //return the promise object
        return deferred.promise;
    };
    
    
    


	return SocialAuth;
});