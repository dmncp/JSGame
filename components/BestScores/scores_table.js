let ScoreTable = function (){
    this.scores = localStorage; // 3 the best players scores
    this.table = createTable();
    initTd(this.table.children[1], this.scores)
    this.receivedScore = 0;
    this.receivedName = "";

    this.updateSystem = function (){
        compare(this.scores, this.receivedName, this.receivedScore);
        initTd(this.table.children[1], this.scores)
    }

}

function compare(scoresList, name, score){ //todo: refactor
    let first = scoresList.getItem("firstPlace");
    let second = scoresList.getItem("secondPlace");
    let third = scoresList.getItem("thirdPlace");


    if(first === "" || first === null || first === undefined){
        scoresList.setItem("firstPlace", "nick:" + name + ":score:" + score);
        return 0;
    }
    else if(second === "" || second === null || second === undefined){
        if(score >= getScore(first)){
            if(getNick(first) !== name) scoresList.setItem("secondPlace", first);
            scoresList.setItem("firstPlace", "nick:" + name + ":score:" + score);
            return 0;
        }
        else{
            if(getNick(first) !== name) {
                scoresList.setItem("secondPlace", "nick:" + name + ":score:" + score);
                return 1;
            }
            return -1;
        }
    }
    else if(third === "" || third === null || third === undefined){
        if(score >= getScore(first)){
            if(getNick(second) === name){
                scoresList.setItem("secondPlace", first);
            }
            else if(getNick(first) !== name){
                scoresList.setItem("thirdPlace", second);
                scoresList.setItem("secondPlace", first);
            }
            scoresList.setItem("firstPlace", "nick:" + name + ":score:" + score);
            return 0;
        }
        else if(score >= getScore(second)){
            if(getNick(second) === name){
                scoresList.setItem("secondPlace", "nick:" + name + ":score:" + score);
                return 1;
            }
            else if(getNick(first) !== name){
                scoresList.setItem("thirdPlace", second);
                scoresList.setItem("secondPlace", "nick:" + name + ":score:" + score);
                return 1;
            }
            return -1;
        }
        else{
            if(getNick(first) !== name && getNick(second) !== name){
                scoresList.setItem("thirdPlace", "nick:" + name + ":score:" + score);
                return 2;
            }
            return -1;
        }
    }
    else{
        if(score >= getScore(first)){
            if(getNick(second) === name){
                scoresList.setItem("secondPlace", first);
            }
            else if(getNick(first) !== name){
                scoresList.setItem("thirdPlace", second);
                scoresList.setItem("secondPlace", first);
            }
            scoresList.setItem("firstPlace", "nick:" + name + ":score:" + score);
            return 0;
        }
        else if(score >= getScore(second)){
            if(getNick(second) === name){
                scoresList.setItem("secondPlace", "nick:" + name + ":score:" + score);
                return 1;
            }
            else if(getNick(first) !== name){
                scoresList.setItem("thirdPlace", second);
                scoresList.setItem("secondPlace", "nick:" + name + ":score:" + score);
                return 1;
            }
        }
        else if(score >= getScore(third)){
            if(getNick(first) !== name && getNick(second) !== name){
                scoresList.setItem("thirdPlace", "nick:" + name + ":score:" + score);
                return 2;
            }
            return -1;
        }
    }
}

function getScore(value){
    let score = value.split(":");
    return parseInt(score[3]);
}

function getNick(value){
    let nick = value.split(":");
    return nick[1];
}

function initTd(tbody, list){
    let tr = tbody.children[0];
    let td1 = tr.children[0];
    let td2 = tr.children[1];

    let player = list.getItem("firstPlace")
    if(player !== null){
        td1.textContent = getNick(player);
        td2.textContent = getScore(player);
    }

    //-----------------------
    tr = tbody.children[1];
    td1 = tr.children[0];
    td2 = tr.children[1];

    player = list.getItem("secondPlace")
    if(player !== null){
        td1.textContent = getNick(player);
        td2.textContent = getScore(player);
    }

    //----------------
    tr = tbody.children[2];
    td1 = tr.children[0];
    td2 = tr.children[1];

    player = list.getItem("thirdPlace")
    if(player !== null){
        td1.textContent = getNick(player);
        td2.textContent = getScore(player);
    }
}

function createTable(){
    let table = document.createElement("table");
    table.setAttribute("border", "1px");
    table.appendChild(createHeader()); // create and append thead

    let tbody = createBody();
    table.appendChild(tbody);

    return table;
}

function createHeader(){
    let thead = document.createElement("thead");
    let tr = document.createElement("tr");

    let th1 = document.createElement("th");
    let th2 = document.createElement("th");

    th1.setAttribute("border", "1px");
    th2.setAttribute("border", "1px");

    th1.textContent = "Gracz";
    th2.textContent = "Wynik";

    tr.appendChild(th1);
    tr.appendChild(th2);

    thead.appendChild(tr);

    return thead;
}

function createTdElement(){
    let td = document.createElement("td");
    td.setAttribute("border", "1px");
    td.textContent = " ";

    return td;
}

function createRow(){
    let tr = document.createElement("tr");

    for(let i = 0; i < 2; i++){
        let td = createTdElement();
        tr.appendChild(td);
    }
    return tr;
}

function createBody(){
    let tbody = document.createElement("tbody");

    for(let i = 0; i < 3; i++){
        let tr = createRow();
        tbody.appendChild(tr);
    }

    return tbody;
}


export {ScoreTable}
