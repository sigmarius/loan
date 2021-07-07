import Slider from "./modules/slider";
import Video from "./modules/video";

window.addEventListener('DOMContentLoaded', () => {
    const slider = new Slider('.page', '.next');
    slider.render();

    const player = new Video('.showup .play', '.overlay');
    player.init();
});

