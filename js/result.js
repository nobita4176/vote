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

	/* 
	// Firebaseインスタンス
	var firebase = new Firebase('https://analoggamelab-vote.firebaseio.com/');
	// Firebaseの投票インスタンス
	var votes = firebase.child('votes');

	// 投票されたら 表示更新
	votes.on('child_changed', function(childSnapshot, prevChildName) {
	});
	*/

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

	var chart = defineChart(
		['イスタンブール', '海底探検', 'ラブレター', 'スコットランドヤード'],
		[1, 5, 6, 4],
		[1, 2, 3, 2]
	);
});
