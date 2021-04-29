import {Canvas} from "./canvas.js";
import {counter, speed} from "../../script.js";

let Square = function (Canvas){
    this.canvas = Canvas.canvas;
    this.context = Canvas.context;
    this.color = "green";
    this.lifeTime = Math.floor(Math.random() * (10 - 3)) + 3; // max = 20, min = 3 -> lifeTime is a random number in this range
    this.counter = 20;
    this.context.font = "20px Arial";
    this.size = 50;
    this.counterSpeed = counter[0];
    this.isTouched = false;
    this.level = 0;

    this.squarePosition = function (size){
        let min_X = 0;
        let min_Y = 0;
        let max_X = this.canvas.width - size - 15;
        let max_Y = this.canvas.height - size - 15;
        let x, y;
        do{
            x = Math.floor(Math.random() * (max_X - min_X)) + min_X;
            y = Math.floor(Math.random() * (max_Y - min_Y)) + min_Y;
        } while(checkPosition(x, y, size, Canvas.squaresList) === false);

        return {x: x, y: y};
    }

    this.position = this.squarePosition(this.size);

    this.draw = function (){
        this.context.fillStyle = this.color;
        this.context.beginPath();
        this.context.rect(this.position.x, this.position.y, this.size, this.size);
        this.context.fill();
    }

    this.drawText = function (){
        this.context.fillStyle = "black";
        this.context.fillText(this.counter.toString(), this.position.x, this.position.y);
    }



    let squareSystem = setInterval(() => {
        if(this.level < 3){
            if(this.counter > 0){
                //firstly, clear old text
                this.context.fillStyle = Canvas.bgColor;
                this.context.fillText((this.counter--).toString(), this.position.x, this.position.y);

                //secondly, fill new text
                this.context.fillStyle = "black";
                this.context.fillText(this.counter.toString(), this.position.x, this.position.y);
            }
            else if(this.counter > -this.lifeTime){
                if(this.color === "green"){
                    this.color = "red";
                    this.draw();
                }

                //firstly, clear old text
                this.context.fillStyle = Canvas.bgColor;
                this.context.fillText((-1 * this.counter--).toString(), this.position.x, this.position.y);

                //secondly, fill new text
                this.context.fillStyle = "black";
                this.context.fillText((-this.counter).toString(), this.position.x, this.position.y);
            }
            else if(this.counter === -this.lifeTime){
                this.context.fillStyle = Canvas.bgColor;
                this.context.fillRect(this.position.x, this.position.y-22, 22, 22);
                this.context.fillRect(this.position.x, this.position.y, this.size, this.size);
                Canvas.circle.draw();

                Canvas.squaresList.splice(Canvas.squaresList.indexOf(this), 1);
                Canvas.squaresList.push(new Square(Canvas));
                this.counter--;
            }
            else this.counter--;
        }
        else clearInterval(squareSystem);
    }, this.counterSpeed);

    this.draw();
    this.drawText();

    this.nextLevel = function (){
        if(this.level < 3){
            this.level++;
            this.counterSpeed = counter[this.level];
        }
    }
}

function checkPosition(x, y, size, list){
    for(let i of list){
        if(squaresOverlap(x, y, size, i)) return false;
    }
    return true;
}

function squaresOverlap(x, y, size, s2){
    return x + size >= s2.position.x &&
        x <= s2.position.x + s2.size &&
        y + size >= s2.position.y && y <= s2.position.y + s2.size
}

export {Square};
