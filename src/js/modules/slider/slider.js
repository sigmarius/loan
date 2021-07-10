export default class Slider {
    constructor({
        container = null, 
        btns = null, 
        next = null, 
        prev = null,
        activeClass = '',
        animate,
        autoplay 
        } = {}){
        // передаем пустой объект по дефолту
        this.container = document.querySelector(container);
        try {this.slides = this.container.children;} catch(evt){}
        this.btns = document.querySelectorAll(btns);
        this.prev = document.querySelector(prev);
        this.next = document.querySelector(next);
        this.activeClass = activeClass;
        this.animate = animate;
        this.autoplay = autoplay;
        // определяет текущий слайд
        this.slideIndex = 1;
    }
}
