'use strict';

/**
 * @ngdoc function
 * @name arrangedTweetApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the arrangedTweetApp
 */

function ProfileControl(twitterService) {
	var vm = this;
	vm.info = {};	
	vm.tweets = [];		     
     	vm.showProfile = false;		    
	twitterService.initialize();

	if (twitterService.isReady()) {		
		twitterService.getMe()					
			.then(function(result) {
				vm.info = result;
				vm.showProfile = true;
			}, function() {
				// error
			});
		        twitterService.getUserTimeline()		
	    			.then(function(result) {		
					vm.tweets = vm.tweets.concat(result);
				}, function() {
					// error
				});
	}
}

angular.module('arrangedTweetApp')
    .controller('ProfileCtrl', ProfileControl);
