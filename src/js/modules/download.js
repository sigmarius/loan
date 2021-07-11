export default class Download {
    constructor(triggers) {
        this.btns = document.querySelectorAll(triggers);
        this.path = 'assets/img/mainbg.jpg';
    }

    downloadItem(path) {
        // создаем программно ссылку с аттрибутом download, чтобы можно было скачивать
        const link = document.createElement('a');

        link.setAttribute('href', path);
        link.setAttribute('download', 'nice_picture');

        link.style.display = 'none';
        document.body.appendChild(link);

        // программно вызываем клик на ссылке
        link.click();

        // удаляем ссылку после клика
        document.body.removeChild(link);
    }

    init() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.downloadItem(this.path);
            });
        });
    }
}
