define(function() {
	var chartElement = document.querySelector('#chart');
	var chart;

	return {
		'define': function(targetNames, rawVotes, uniqueVotes) {
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

			chart = new Chart(chartElement.getContext('2d')).Bar(data, option);
		},
		'update': function(rawVotes, uniqueVotes) {
			rawVotes.forEach(function(e, i) {
				chart.datesets[0].bars[i].value = e;
			});
			uniqueVotes.forEach(function(e, i) {
				chart.datesets[1].bars[i].value = e;
			});
			chart.update();
		}
	};
});
