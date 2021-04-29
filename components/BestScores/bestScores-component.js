import {ScoreTable} from "./scores_table.js";

let scoresTable;
function getTable(table){
    scoresTable = table;
}


class BestScoresComponent extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({"mode": "open"}); // manipulacja elementami shadow DOM z poziomu DOM

        let scoresTable = new ScoreTable();
        getTable(scoresTable);
        this._shadowRoot.appendChild(scoresTable.table);
    }
}
window.customElements.define("best_scores-component", BestScoresComponent);

export {BestScoresComponent, scoresTable}
