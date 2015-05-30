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
require(['Firebase', './view', './event', './util'], function(Firebase, view, event, util) {
	// Firebaseインスタンス
	var firebase = new Firebase('https://analoggamelab-vote.firebaseio.com/');

	// Firebaseに接続したら 投票対象らを表示
	firebase.child('targets').once('value', function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			if (childSnapshot.key() === '_dummy') {return;}
			view.appendToShowcase(childSnapshot.key(), childSnapshot.val());
		});
		event.registerShowcaseEvent();
	});

	// Firebaseの投票インスタンス
	var votes = firebase.child('votes');

	// 投票
	var vote = function(name, values) {
		if (name.length === 0) {throw new Error('vote(): 名前を入力してください');}
		votes.child(name).set({
			'value1': values[0], 'value2': values[1], 'value3': values[2],
			'datetime': (new Date()).valueOf()
		});
	};
	event.registerFooterEvent(vote);

	// 投票されたら 表示更新
	votes.on('child_changed', function(childSnapshot, prevChildName) {
		if (childSnapshot.key() === '_dummy') {return;}
	});
});
