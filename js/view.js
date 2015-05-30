define(['./util'], function(util) {
	var showcase = document.querySelector('#showcase');
	var showcaseElementTemplate = document.querySelector('#showcase-element-template');

	return {
		// 投票対象(の画像)を一覧に追加
		'appendToShowcase': function(title, path) {
			// templateを実体化コピー
			var e = document.importNode(showcaseElementTemplate.content, true);

			// data-titleにtitleを設定
			var root = e.querySelector('.showcase-element');
			root.dataset.title = title;

			// imgを取得,alt=title,src=path
			var img = e.querySelector('img');
			img.setAttribute('alt', title);
			img.setAttribute('src', path);

			// .detail(詳細部)
			var titleE = e.querySelector('.detail .title');
			titleE.textContent = title;
			var search = e.querySelector('.detail .search');
			search.setAttribute('href', 'https://www.google.co.jp/search?q=boardgame+' + encodeURI(title));

			// #showcaseに追加
			showcase.appendChild(e);
		},
		// 投票対象をセット
		'changeChosen': function(rank, title) {
			// #chosen-[123](画面下部のinput)を取得
			var e = document.querySelector('#chosen-' + rank);
			if (!e) {throw new Error('changeChosen: #chosen-['+rank+']が無い');}
			// #showcase内の投票対象の見本を取得
			var sample = util.maybeQuerySelector('#showcase .showcase-element[data-title=' + title + ']');

			// 対象が既にtitleなら 消す
			if (e.textContent === title) {
				// .chosenを消す
				sample.map(function(e) {e.classList.remove('chosen');});
				// テキストをリセット
				e.textContent = '';
			} else {
				// 選択されてた対象
				var prev = e.textContent;
				// 選択されてた対象の見本
				var prevSample = util.maybeQuerySelector('#showcase .showcase-element[data-title=' + prev + '].chosen');
				// .chosenを消す
				prevSample.map(function(e) {e.classList.remove('chosen');});

				// .chosenを付ける
				sample.map(function(e) {e.classList.add('chosen');});
				// テキストをセット
				e.textContent = title;
			}
		}
	};
});
