import {PointsTable} from "./table.js";

let myTable;
function getTable(table){
    myTable = table;
}

class PointsTableComponent extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({"mode": "open"}); // manipulacja elementami shadow DOM z poziomu DOM

        let myTable = new PointsTable();
        getTable(myTable);
        this._shadowRoot.appendChild(myTable.table);
    }
}
window.customElements.define("points_table-component", PointsTableComponent);



export {PointsTableComponent, myTable}
