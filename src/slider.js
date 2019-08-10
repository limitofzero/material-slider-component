export class Slider extends HTMLElement {
    constructor() {
        super();

        const template = document.getElementById('mat-slider-template');
        this.attachShadow({ mode: "open" })
            .appendChild(template.content.cloneNode(true));

        this.startSliding = this.startSliding.bind(this);
        this.stopSliding = this.stopSliding.bind(this);
        this.slide = this.slide.bind(this);

        window.addEventListener('resize', () => this.setWidth());

        this.value = Number(this.getAttribute('value')) || 0;
        this.range = Number(this.getAttribute('range')) || 100;
    }

    static get observedAttributes() {
        return [ 'value', 'range'];
    }

    setWidth() {
        const wrapperRect = this.wrapper.getClientRects();
        this.width = wrapperRect[0].width;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const parsedValue = Number.parseInt(newValue);
        if (this.isValidNumberAttribute(parsedValue)) {
            this[name] = parsedValue;
        } else {
            throw new Error(`Invalid ${ name } value`);
        }
    }

    isValidNumberAttribute(value) {
        const isInvalid = Number.isNaN(value) || value < 0;
        return !isInvalid;
    }

    connectedCallback() {
        this.wrapper = this.shadowRoot.querySelector('.wrapper');
        this.line = this.shadowRoot.querySelector('.line');
        this.circle = this.shadowRoot.querySelector('.circle');

        this.circle.addEventListener('mousedown', this.startSliding);
        this.circle.addEventListener('mousemove', this.slide);
        this.ownerDocument.addEventListener('mouseup', this.stopSliding);

        this.setWidth();
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
            this.calculateValue(position);
        }
    }

    calculateValue(position) {
        const onePercent = this.width / this.range;
        const value = position / onePercent;
        this.value = Math.round(value);
    }

    disconnectedCallback() {
        this.circle.removeEventListener('mousedown', this.startSliding);
        this.circle.removeEventListener('mousemove', this.slide);
        this.ownerDocument.removeEventListener('mouseup', this.stopSliding);
    }
}
