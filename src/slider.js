export class Slider extends HTMLElement {
    constructor() {
        super();

        const template = document.getElementById('mat-slider-template');
        this.attachShadow({ mode: "open" })
            .appendChild(template.content.cloneNode(true));

        this.startSliding = this.startSliding.bind(this);
        this.stopSliding = this.stopSliding.bind(this);
        this.slide = this.slide.bind(this);
    }

    connectedCallback() {
        this.circle = this.shadowRoot.querySelector('.circle');
        this.line = this.shadowRoot.querySelector('.line');

        this.circle.addEventListener('mousedown', this.startSliding);
        this.circle.addEventListener('mousemove', this.slide);
        this.ownerDocument.addEventListener('mouseup', this.stopSliding);
    }

    startSliding() {
        this.isSliding = true;
    }

    stopSliding() {
        this.isSliding = false;
    }

    slide(event) {
        if (this.isSliding) {
            this.moveCircle(event);
        }
    }

    moveCircle(event) {
        const position = event.pageX - this.line.offsetLeft;
        if (position >= 0 && position <= this.width) {
            this.circle.style.left = `${position}px`;
        }
    }

    disconnectedCallback() {
        this.circle.removeEventListener('mousedown', this.startSliding);
        this.circle.removeEventListener('mousemove', this.slide);
        this.ownerDocument.removeEventListener('mouseup', this.stopSliding);
    }
}
