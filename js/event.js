define(['view'], function(view) {
	return {
		// showcaseのイベント登録処理
		'registerShowcaseEvent': function() {
			var showcaseElements = document.querySelectorAll('#showcase .showcase-element');

			Array.prototype.forEach.call(
				showcaseElements,
				function(e) {
					// 要素の何処かをクリックしたらactive付ける
					e.addEventListener('click', view.activateOnClick);

					// ボタンをクリックしたら選択する
					var buttons = e.querySelectorAll('.detail .controller .pure-button');
					Array.prototype.forEach.call(
						buttons,
						function(e) {
							e.addEventListener('click', view.chooseOnClick);
						}
					);
				}
			);
		},
		// footerのイベント登録処理
		'registerFooterEvent': function(vote) {
			var voteButton = document.querySelector('#vote');
			var nameForm = document.querySelector('#name');
			var chosenForm = document.querySelector('#chosen');

			voteButton.addEventListener('click', function(ev) {
				var name = nameForm.value;
				var values = Array.prototype.map.call(
					chosenForm.querySelectorAll('input'),
					function(e) {return e.value;}
				);

				if (name.length === 0) {
					alert('名前を入力してください');
					return;
				}
				if (values[0].length === 0) {
					alert('1つ目の投票先は必須です');
					return;
				}

				console.log(name, values);
				vote(name, values);
				view.showModal(
					'Thanks!!!',
					'投票ありがとうございます. 結果発表をお待ちください.'
				);
			});
		},
		// 開票時間になった時のイベント登録処理
		'registerOnDeadLine': function() {
			var deadline = new Date('1 June 2015 18:00 GMT+0900');
			var timerId;
			timerId = setInterval(function() {
				var now = new Date();
				if (now >= deadline) {
					clearInterval(timerId);

					var voteButton = document.querySelector('#vote');
					voteButton.setAttribute('disabled', true);
					voteButton.classList.add('pure-button-disabled');

					view.showModal(
						'Now Is The Time!!',
						'<a href="./result/">結果発表:<i class="fa fa-arrow-right"></i></a>',
						true
					);
				}
			}, 60000)
		}
	};
});
