export default class Video {
    constructor(triggers, overlay) {
        this.btns = document.querySelectorAll(triggers);
        this.overlay = document.querySelector(overlay);
        this.close = this.overlay.querySelector('.close');
        // привязываем контекст состояния видео к экземпляру класса во избежание потери окружения
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    }

    bindTriggers() {
        this.btns.forEach((btn, i) => {
            try {
                // получаем первого родителя нажатой кнопки => нажодим соседний блок с видео
                const blockedElem = btn.closest('.module__video-item').nextElementSibling;

                // получаем каждый второй элемент
                if (i % 2 == 0) {
                    // назначаем собственный data-атрибут
                    blockedElem.setAttribute('data-disabled', 'true');
                }
            } catch (evt) {}

            btn.addEventListener('click', () => {
                if (!btn.closest('.module__video-item') || btn.closest('.module__video-item').getAttribute('data-disabled') !== 'true') {
                    // кнопка, которую нажал пользователь
                    this.activeBtn = btn;

                    if (document.querySelector('iframe#frame')) {
                        this.overlay.style.display = 'flex';
                        if (this.path !== btn.getAttribute('data-url')) {
                            this.path = btn.getAttribute('data-url');
                            this.player.loadVideoById({
                                videoId: this.path
                            });
                        }
                    } else {
                        this.path = btn.getAttribute('data-url');

                        this.createPlayer(this.path);
                    }
                }
            });
        });
    }

    bindCloseBtn() {
        this.close.addEventListener('click', () => {
            this.overlay.style.display = 'none';
            this.player.stopVideo();
        });
    }

    createPlayer(url) {
        // frame - из верстки div id="frame" - место для видео
        this.player = new YT.Player('frame', {
            height: '100%',
            width: '100%',
            videoId: `${url}`,
            events: {
                'onStateChange': this.onPlayerStateChange
            }
        });

        this.overlay.style.display = 'flex';
    }

    onPlayerStateChange(state) {
        try {
            // получаем первого родителя нажатой кнопки => нажодим соседний блок с видео
            const blockedElem = this.activeBtn.closest('.module__video-item').nextElementSibling;

            // копируем иконку Play => разместим ее вместо иконки замка
            const playBtn = this.activeBtn.querySelector('svg').cloneNode(true);

            // из документации API Youtube => state.data=0 видео завершено
            if (state.data === 0) {
                if (blockedElem.querySelector('.play__circle').classList.contains('closed')) {
                    blockedElem.querySelector('.play__circle').classList.remove('closed');

                    blockedElem.querySelector('svg').remove();
                    blockedElem.querySelector('.play__circle').appendChild(playBtn);

                    blockedElem.querySelector('.play__text').textContent = 'play video';
                    blockedElem.querySelector('.play__text').classList.remove('attention');

                    blockedElem.style.opacity = 1;
                    blockedElem.style.filter = 'none';

                    blockedElem.setAttribute('data-disabled', 'false');
                }
            }
        } catch (evt) {}
    }

    init() {
        if (this.btns.length > 0) {
            const tag = document.createElement('script');

            tag.src = "https://www.youtube.com/iframe_api";

            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            this.bindTriggers();
            this.bindCloseBtn();
        }
    }
}
