(function() {
	if (!('jQuery' in window) || !('Firebase' in window)) {
		throw new Error('jQueryかFirebaseが読み込まれてない');
	}

	var firebase = new Firebase('https://analoggamelab-vote.firebaseio.com/');

	// 投票
	var vote = function(name, value) {
		var date = new Date();
		firebase.child(name).set({'value': value, 'date': date});
	};

	// 投票されたら 表示更新
	firebase.on('child_changed', function(snapshot) {
	});
})();
