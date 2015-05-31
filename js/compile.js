define(function() {
	return {
		// Firebase::DataSnapshotから投票結果を集計
		'compileResult': function(snapshot) {
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

			return {
				'targetNames': targetNames,
				'rawVotes': rawVotes,
				'uniqueVotes': uniqueVotes
			};
		}
	};
});
