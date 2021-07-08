import MainSlider from "./modules/slider/slider-main";
import Video from "./modules/video";

window.addEventListener('DOMContentLoaded', () => {
    const slider = new MainSlider({btns: '.next', page: '.page'});
    slider.render();

    const player = new Video('.showup .play', '.overlay');
    player.init();
});

