'use strict';

/**
 * @ngdoc function
 * @name arrangedTweetApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the arrangedTweetApp
 */
function MainController(twitterService) {
	var vm = this;
	
	vm.tweets = [];
	twitterService.initialize();
	
	if (twitterService.isReady()){
		twitterService.getMe()
			.then(function(result){
				vm.info = result;
				vm.showProfile = true;
				$("#user").show();
				
				var date = new Date();
				document.getElementById("date").innerText = date;
			}, function(){
				// error
			});
	}

	vm.refresh = function() {
		twitterService.getLatestTweets().then(function(result) {
			vm.tweets = vm.tweets.concat(result);
		}, function(){
			// error
		});
	};

	vm.connect = function() {
		twitterService.connectTwitter().then(function() {
			if (twitterService.isReady()) {
				vm.refresh();
				twitterService.getMe()
			      		.then(function(result){
						vm.info = result;
						vm.showProfile = true;
						$("#user").show();
						var date = new Date();
						document.getElementById("date").innerText = date;
					}, function(){
						// error
					});
			} else {
				console.log('unable to connect twitter');
			}
		});
	};
	
	vm.signOut = function() {
		twitterService.clearCache();
		vm.tweets = [];
		document.getElementById("date").innerText = "";
		$("#user").css('display', 'none');
	};

	if (twitterService.isReady()) {
		vm.refresh();
	}
}

angular.module('arrangedTweetApp')
  .controller('MainCtrl', MainController);

