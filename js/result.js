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

require(['Firebase', 'Chart', './util'], function(Firebase, Chart, util) {
	var chartElement = document.querySelector('#chart');
	chartElement.setAttribute('width', window.innerWidth);
	chartElement.setAttribute('height', window.innerHeight);

	var defineChart = function(targetNames, rawVotes, uniqueVotes) {
		var data = {
			'labels': targetNames,
			'datasets': [
				{
					'label': 'Votes',
					'fillColor': 'rgba(220, 128, 64, 0.5)',
					'strokeColor': 'rgba(220, 128, 64, 0.8)',
					'data': rawVotes,
				},
				{
					'label': 'Votes(unique)',
					'fillColor': 'rgba(64, 128, 220, 0.5)',
					'strokeColor': 'rgba(64, 128, 220, 0.8)',
					'data': uniqueVotes,
				}
			]
		};
		var option = {
			'scaleBeginAtZero': true,
			'scaleShowGridLines': true,
			'scaleGridLineColor': 'rbga(0, 0, 0, .2)',
			'scaleGridLineWidth': 1,
			'scaleShowHorizontalLines': true,
			'scaleShowVerticalLines': true,
			'barShowStroke': true,
			'barStrokeWidth': 1,
			'barValueSpacing': 3,
			'barDatasetSpacing': 0
		};

		return new Chart(chartElement.getContext('2d')).Bar(data, option);
	};
	var updateChart = function(chart, rawVotes, uniqueVotes) {
		rawVotes.forEach(function(e, i) {
			chart.datesets[0].bars[i].value = e;
		});
		uniqueVotes.forEach(function(e, i) {
			chart.datesets[1].bars[i].value = e;
		});
		chart.update();
	}
	var resizeChart = function(chart) {
		chart.update();
	};


	var chart;
	// Firebaseインスタンス
	var firebase = new Firebase('https://analoggamelab-vote.firebaseio.com/');

	// 最初にグラフを作る
	firebase.once('value', function(snapshot) {
		// 対象の名前のArrayを作る
		var targetsSS = snapshot.child('targets');
		var targetNames = [];
		targetsSS.forEach(function(child) {targetNames.push(child.key());});

		// 投票の集計を取る
		var votesSS = snapshot.child('votes');
		var rawVotesMap = {};
		var uniqueVotesMap = {};
		targetNames.forEach(function(e) {
			rawVotesMap[e] = 0;
			uniqueVotesMap[e] = 0;
		});
		votesSS.forEach(function(child) {
			var value = [
				child.child('value1').val(),
				child.child('value2').val(),
				child.child('value3').val(),
			];
			// 普通に加算
			value.forEach(function(v) {
				if (v.length === 0) {return;}
				rawVotesMap[v] += 1;
			});
			// 重複を取り除く
			if (value[2] === value[0] || value[2] === value[1]) {delete value[2];}
			if (value[1] === value[0]) {delete value[1];}
			// ユニーク票として加算
			value.forEach(function(v) {
				if (v.length === 0) {return;}
				uniqueVotesMap[v] += 1;
			});
		});

		// 投票結果を配列に
		var rawVotes = new Array(targetNames.length);;
		var uniqueVotes = new Array(targetNames.length);
		targetNames.forEach(function(e, i) {
			rawVotes[i] = rawVotesMap[e];
			uniqueVotes[i] = uniqueVotesMap[e];
		});

		// グラフを作る
		chart = defineChart(targetNames, rawVotes, uniqueVotes);
	});
	// 投票されたら 表示更新
	/*
	firebase.child('votes').on('child_changed', function(childSnapshot, prevChildName) {
	});
	*/
});
