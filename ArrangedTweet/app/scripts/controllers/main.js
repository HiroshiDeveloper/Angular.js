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
			} else {
				console.log('unable to connect twitter');
			}
		});
	};
	
	vm.signOut = function() {
		twitterService.clearCache();
		vm.tweets = [];
	};

	if (twitterService.isReady()) {
		vm.refresh();
	}
}


angular.module('arrangedTweetApp')
  .controller('MainCtrl', MainController);


/*
angular.module('arrangedTweetApp')
  .controller('MainCtrl', function () {
	this.awesomeThings = [
      		'HTML5 Boilerplate',
      		'AngularJS',
      		'Karma'
    	];
  });
*/
