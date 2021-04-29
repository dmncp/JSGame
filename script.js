import {playerName, noSquares, speed, counter} from "./promptInfo.js"
import {CanvasComponent, myCanvas} from "./components/canvas/canvas-component.js";
import {PointsTableComponent, myTable} from "./components/PointsAndTime/pointsTable-component.js";
import {BestScoresComponent, scoresTable} from "./components/BestScores/bestScores-component.js";
import {engine, render, engineElements} from "./PhysicsEngine/main.js";
export {playerName, noSquares, speed, counter}

Matter.World.add(engine.world, engineElements);
Matter.Engine.run(engine);
Matter.Render.run(render);

let div = document.getElementById("name");

let lvl = document.createElement("p");
lvl.style.margin = "0";
lvl.textContent = "Level: 1";
lvl.style.fontSize = "20px";
div.insertBefore(lvl, div.firstChild);

let name = document.createElement("p");
name.style.margin = "0";
name.textContent = "Witaj, " + playerName;
name.style.fontSize = "20px";
div.insertBefore(name, div.firstChild);

let level = 0;
let time = 60;


let timeCounter = setInterval(() => {
    if(level < 3){
        if(time > 0){
            time--;
        }
        else if(time === 0){
            time = 60;
            level++;
            if(level <= 2) lvl.textContent = "Level: " + (level + 1).toString();
            myCanvas.nextLevel();
        }
    }
    else if(level === 3){
        // send points and nick to BestScoresComponent
        sendScoreAndNick(playerName, myTable.points, scoresTable.table);

        clearInterval(timeCounter);
    }
}, 1000);


let checkPlayerPoints = setInterval(() => { //sending points from Canvas to PointsTable
    calculatePoints(myCanvas.circle);
    if(level === 3) clearInterval(checkPlayerPoints);
})

myTable.table.addEventListener("points", e => { //receiving points from Canvas
    myTable.points += e.detail.points;
})

scoresTable.table.addEventListener("score", e => { // receiving nick and score
    scoresTable.receivedScore = e.detail.score;
    scoresTable.receivedName = e.detail.name;
    scoresTable.updateSystem();
})

function calculatePoints(circle){
    let points = 0;

    for(let i of myCanvas.squaresList){
        let fit = figuresOverlap(circle, i);
        if(i.isTouched === false && fit)
        {
            i.isTouched = true;
            points += i.counter;
        }
        else if(!fit) i.isTouched = false;
    }

    sendPoints(points, myTable.table);
}

function figuresOverlap(circle, square){
    return circle.position.x + circle.radius >= square.position.x &&
        circle.position.x - circle.radius <= square.position.x + square.size &&
        circle.position.y + circle.radius >= square.position.y && circle.position.y - circle.radius <= square.position.y + square.size
}

function sendPoints(points, table){
    let event = new CustomEvent("points", {
        detail: {
            points: points,
        }
    });
    table.dispatchEvent(event);
}

function sendScoreAndNick(nick, score, table){
    let event = new CustomEvent("score", {
        detail: {
            score: score,
            name: nick
        }
    });

    table.dispatchEvent(event);
}
