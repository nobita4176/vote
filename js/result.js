// requirejsの設定
requirejs.config({
	'paths': {
		'Firebase': 'https://cdn.firebase.com/js/client/2.2.5/firebase',
		'Chart': 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.2/Chart.min'
	},
	'shim': {
		'Firebase': {'exports': 'Firebase'}
	}
});

require(['Firebase', 'Chart', './compile', './chart'], function(Firebase, Chart, compile, chart) {
	chart.fit();

	// Firebaseインスタンス
	var firebase = new Firebase('https://analoggamelab-vote.firebaseio.com/');
	var initialized = false;

	// 最初にグラフを作る
	firebase.once('value', function(snapshot) {
		var r = compile.compileResult(snapshot);
		chart.initialize(r.targetNames, r.rawVotes, r.uniqueVotes);

		initialized = true;
	});
	// 投票されたら 表示更新
	firebase.on('value', function(snapshot) {
		if (!initialized) {return;}

		var r = compile.compileResult(snapshot);
		chart.update(r.rawVotes, r.uniqueVotes);
	});
});
