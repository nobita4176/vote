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
		},
		// querySelectorをMaybeで返す
		'maybeQuerySelector': function(query, baseElement) {
			var Maybe = function(v) {
				if (v != null) {this.just = v;}
				else {this.none = true;}
			};
			Maybe.prototype.map = function(f) {
				return this.none ? new Maybe() : new Maybe(f(this.just));
			};
			Maybe.prototype.return = function() {
				if (this.none) {throw new ReferenceError('Maybe.return(): there is only null');}
				return this.just;
			}

			var parent = baseElement ? baseElement : document;
			var e = parent.querySelector(query);

			return new Maybe(e? e : null);
		}
	}
});
