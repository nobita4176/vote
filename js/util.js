define(function() {
	return {
		// 現在時刻を[MM/DD hh:mm:ss]にして返す
		'getDateString': function(datetime) {
			var fix = function(num) {return num > 9 ? ''+num : '0'+num;};
			var date = new Date(datetime);
			return [
				date.getMonth()+1, '/',
				date.getDate(), ' ',
				fix(date.getHours()), ':',
				fix(date.getMinutes()), ':',
				fix(date.getSeconds())
			].join('');
		}
	}
});
