import { Slider } from './slider';

window.addEventListener('load', () => {
    customElements.define('mat-slider', Slider);

    window.document.getElementById('slider')
        .addEventListener('valueChanged', (event) => {
            console.log(event);
        });
});
