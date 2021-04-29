import {MovementSystem} from "./MovementSystem.js";
import {Canvas} from "./canvas.js";

let Circle = function (Canvas){
    this.canvas = Canvas.canvas;
    this.context = Canvas.context;
    this.radius = 20;
    this.color = "blue";
    this.position = getStartPosition(this.canvas);
    this.movementSystem = new MovementSystem(this);

    this.draw = function (){
        this.context.fillStyle = this.color;
        this.context.beginPath();
        this.context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        this.context.fill();
    }

    this.refreshPosition = function (x, y){
        if(Canvas.level < 3){
            // firstly erase old circle
            this.color = Canvas.bgColor;
            this.radius += 1;
            this.draw();

            //secondly, draw new circle
            this.position.x += x;
            this.position.y += y;

            if(this.position.x - this.radius >= this.canvas.width) this.position.x = 0;
            if(this.position.x + this.radius <= 0) this.position.x = this.canvas.width + this.radius;
            if(this.position.y - this.radius >= this.canvas.height) this.position.y = 0;
            if(this.position.y + this.radius <= 0) this.position.y = this.canvas.height + this.radius;

            this.color = "blue";
            this.radius -= 1;
            drawSquares(this, Canvas.squaresList);
            this.draw();
        }
    }

    this.draw();
}


function getStartPosition(canvas){
    let x = canvas.width / 2;
    let y = canvas.height / 2;
    return {x: x, y: y};
}

function drawSquares(circle, squaresList){
    for(let i of squaresList){
        i.draw();
    }
}

export {Circle}
