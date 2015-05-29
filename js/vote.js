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
require(['Firebase'], function(Firebase) {
	// Firebaseインスタンス
	var firebase = new Firebase('https://analoggamelab-vote.firebaseio.com/');

	// 現在時刻を[MM/DD hh:mm:ss]にして返す
	var getDateString = function() {
		var fix = function(num) {return num > 9 ? ''+num : '0'+num;};
		var date = new Date();
		return [
			date.getMonth()+1, '/',
			date.getDate(), ' ',
			fix(date.getHours()), ':',
			fix(date.getMinutes()), ':',
			fix(date.getSeconds())
		].join('');
	};

	// 投票
	var vote = function(name, value) {
		firebase.set({'name': name, 'value': value, 'date': getDateString()});
	};

	// 投票されたら 表示更新
	firebase.on('child_changed', function(snapshot) {
	});
});
