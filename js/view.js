define(function() {
	var carousel = document.querySelector('#carousel');
	var carouselElementTemplate = document.querySelector('#carousel-element-template');
	var chosen = document.querySelector('#chosen');

	return {
		// 投票対象(の画像)を一覧に追加
		'appendToCarousel': function(title, path) {
			var e = document.importNode(carouselElementTemplate.content, true);
			var img = e.querySelector('img');
			img.setAttribute('alt', title);
			img.setAttribute('src', path);
			carousel.appendChild(e);
		},
		// 投票対象をセット
		'changeChosen': function(title) {
			// chosenのテキストをtitleに
		}
	};
});
