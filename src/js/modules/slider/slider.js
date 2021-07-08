export default class Slider {
    constructor({page = "", btns = "", next = "", prev = ""} = {}){
        // передаем пустой объект по дефолту
        this.page = document.querySelector(page);
        this.slides = this.page.children;
        this.btns = document.querySelectorAll(btns);
        // определяет текущий слайд
        this.slideIndex = 1;
    }
}
