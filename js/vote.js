requirejs.config({
	'paths': {
		'Firebase': 'https://cdn.firebase.com/js/client/2.2.5/firebase'
	},
	'shim': {
		'Firebase': {'exports': 'Firebase'}
	}
});

require(['Firebase'], function(Firebase) {
	var firebase = new Firebase('https://analoggamelab-vote.firebaseio.com/');

	// 投票
	var vote = function(name, value) {
		var date = new Date();
		firebase.child(name).set({'value': value, 'date': date});
	};

	// 投票されたら 表示更新
	firebase.on('child_changed', function(snapshot) {
	});
});
