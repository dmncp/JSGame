import {Canvas} from "./canvas.js";

let myCanvas;
function getCanvas(canvas){
    myCanvas = canvas;
}

class CanvasComponent extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({"mode": "open"}); // manipulacja elementami shadow DOM z poziomu DOM

        let myCanvas = new Canvas(800, 700, "#EDEDED");
        this._shadowRoot.appendChild(myCanvas.canvas);

        getCanvas(myCanvas);
    }
}
window.customElements.define("canvas-component", CanvasComponent);


export {CanvasComponent, myCanvas};
