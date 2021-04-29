import {speed} from "../../script.js"

let MovementSystem = function (myCircle){
    this.circle = myCircle;
    this.speed = speed[0];
    this.level = 0;
    this.keysPressed = {
      "ArrowDown": false,
      "ArrowUp": false,
      "ArrowLeft": false,
      "ArrowRight":false
    };

    document.body.addEventListener('keydown', (e) => {
        this.keysPressed[e.key] = true;

        if(this.keysPressed["ArrowDown"] && this.keysPressed["ArrowLeft"]){
            this.circle.refreshPosition(-this.speed, this.speed);
        }
        else if(this.keysPressed["ArrowDown"] && this.keysPressed["ArrowRight"]){
            this.circle.refreshPosition(this.speed, this.speed);
        }
        else if(this.keysPressed["ArrowUp"] && this.keysPressed["ArrowRight"]){
            this.circle.refreshPosition(this.speed, -this.speed);
        }
        else if(this.keysPressed["ArrowUp"] && this.keysPressed["ArrowLeft"]){
            this.circle.refreshPosition(-this.speed, -this.speed);
        }
        else if(this.keysPressed["ArrowUp"]) this.circle.refreshPosition(0, -this.speed);
        else if(this.keysPressed["ArrowLeft"]) this.circle.refreshPosition(-this.speed, 0);
        else if(this.keysPressed["ArrowRight"]) this.circle.refreshPosition(this.speed, 0);
        else if(this.keysPressed["ArrowDown"]) this.circle.refreshPosition(0, this.speed);
    })

    document.body.addEventListener("keyup", (e) => {
        this.keysPressed[e.key] = false;
    })

    this.nextLevel = function (){
        if(this.level < 3){
            this.level++;
            this.speed = speed[this.level];
        }
    }
}

export {MovementSystem}
