// requirejsの設定
requirejs.config({
	'paths': {
		'Firebase': 'https://cdn.firebase.com/js/client/2.2.5/firebase'
	},
	'shim': {
		'Firebase': {'exports': 'Firebase'}
	}
});

// main
require(['Firebase', './view', './util'], function(Firebase, view, util) {
	// Firebaseインスタンス
	var firebase = new Firebase('https://analoggamelab-vote.firebaseio.com/');

	// Firebaseに接続したら 投票対象らを表示
	firebase.child('targets').once('value', function(snapshot) {
		window.console.log(snapshot.val());
		snapshot.forEach(function(childSnapshot) {
			if (childSnapshot.key() === '_dummy') {return;}
			view.appendToShowcase(childSnapshot.key(), childSnapshot.val());
		})
	});

	// Firebaseの投票インスタンス
	var votes = firebase.child('votes');

	// 投票
	var vote = function(name, value) {
		votes.child(name).set({'value': value, 'datetime': (new Date()).valueOf()});
	};

	// 投票されたら 表示更新
	votes.on('child_changed', function(childSnapshot, prevChildName) {
		if (childSnapshot.key() === '_dummy') {return;}
	});
});
