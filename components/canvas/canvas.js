import {Circle} from "./circle.js";
import {Square} from "./square.js";
import {noSquares, speed} from "../../script.js";

let Canvas = function (width, height, bgColor){
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext('2d');
    this.bgColor = bgColor;
    this.width = width;
    this.height = height;
    this.squaresList = [];
    this.noSquares = noSquares[0];
    this.level = 0;

    this.init = function (width, height, bgColor){
        this.canvas.width = width;
        this.canvas.height = height;

        this.context.fillStyle = bgColor;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    this.init(width, height, bgColor);
    this.pushSquare = function (noSquares){
        for(let i = 0; i < noSquares; i++){
            let square = new Square(this);
            this.squaresList.push(square);
        }
    }

    this.pushSquare(this.noSquares);
    this.circle = new Circle(this);


    this.nextLevel = function (){
        if(this.level < 3){
            this.init(width, height, bgColor);
            this.circle.draw();

            this.level++;
            this.noSquares = noSquares[this.level];

            this.squaresList.forEach(e => {e.level = 3}); // game over for these squares
            this.squaresList = []

            this.pushSquare(this.noSquares);

            this.circle.movementSystem.nextLevel();
            this.squaresList.forEach(e => {
                while(e.level !== this.level)
                    e.nextLevel();
            });
        }
    }
}


export {Canvas}
