define(function() {
	var chart;
	var chartElement = document.querySelector('#chart');
	var legendElement = document.querySelector('#chart-legend');

	return {
		'fit': function() {
			chartElement.setAttribute('width', chartElement.innerWidth);
			chartElement.setAttribute('height', chartElement.innerHeight);
		},
		'initialize': function(targetNames, rawVotes, uniqueVotes) {
			var data = {
				'labels': targetNames,
				'datasets': [
					{
						'label': '得票数',
						'fillColor': 'rgba(220, 128, 64, 0.5)',
						'strokeColor': 'rgba(220, 128, 64, 0.8)',
						'data': rawVotes,
					},
					{
						'label': 'ユニーク',
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
				'barDatasetSpacing': 0,
				'legendTemplate': '<ul><% for(var i=0;i<datasets.length;i++){%><li><span style="color:<%=datasets[i].strokeColor%>">■</span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
			};

			chart = new Chart(chartElement.getContext('2d')).Bar(data, option);
			legendElement.innerHTML = chart.generateLegend();
			chartElement.removeAttribute('style');
		},
		'update': function(rawVotes, uniqueVotes) {
			rawVotes.forEach(function(e, i) {
				chart.datesets[0].bars[i].value = e;
			});
			uniqueVotes.forEach(function(e, i) {
				chart.datesets[1].bars[i].value = e;
			});
			chart.update();
			legendElement.innerHTML = chart.generateLegend();
			chartElement.removeAttribute('style');
		}
	};
});
