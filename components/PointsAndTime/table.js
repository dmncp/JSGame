let PointsTable = function (){
    this.points = 0;
    this.time = 60;
    this.level = 0;
    this.create = createTable(this.points, this.time);
    this.table = this.create[0];
    this.td1 = this.create[1];
    this.td2 = this.create[2];


    let gameStats = setInterval(() => {
        if(this.level < 3){
            if(this.time > 0){
                this.time--;
                this.td2.textContent = this.time;
            }
            else{
                //end level
                this.level++;
                this.time = 60;
            }
        }
        else{
            // end game
            clearInterval(gameStats);
        }
    }, 1000);

    let pointsStats = setInterval(() => {
        if(this.level < 3)
            this.td1.textContent = this.points;
        else if(this.level === 3) clearInterval(pointsStats);
    })

}


function createTable(points, time){
    let table = document.createElement("table");
    table.setAttribute("border", "1px");

    let thead = document.createElement("thead");
    let tr = document.createElement("tr");

    let th1 = document.createElement("th");
    let th2 = document.createElement("th");

    th1.setAttribute("border", "1px");
    th2.setAttribute("border", "1px");

    th1.textContent = "Punkty";
    th2.textContent = "Czas";

    tr.appendChild(th1);
    tr.appendChild(th2);

    thead.appendChild(tr);
    table.appendChild(thead);

    let tbody = document.createElement("tbody");
    let tr2 = document.createElement("tr");

    let td1 = document.createElement("td");
    let td2 = document.createElement("td");

    td1.setAttribute("border", "1px");
    td2.setAttribute("border", "1px");

    td1.textContent = points;
    td2.textContent = time;

    tr2.appendChild(td1);
    tr2.appendChild(td2);
    tbody.appendChild(tr2);
    table.appendChild(tbody);


    return [table, td1, td2];
}

export {PointsTable}
