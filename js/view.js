define(function() {
	var showcase = document.querySelector('#showcase');
	var showcaseElementTemplate = document.querySelector('#showcase-element-template');
	var chosen = document.querySelector('#chosen');

	return {
		// 投票対象(の画像)を一覧に追加
		'appendToShowcase': function(title, path) {
			var e = document.importNode(showcaseElementTemplate.content, true);
			var img = e.querySelector('img');
			img.setAttribute('alt', title);
			img.setAttribute('src', path);
			showcase.appendChild(e);
		},
		// 投票対象をセット
		'changeChosen': function(title) {
			// chosenのテキストをtitleに
		}
	};
});
