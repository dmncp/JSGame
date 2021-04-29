let playerName = "";
do{
    playerName = prompt("Twój nick (min. 3 znaki):");
} while(playerName.length < 3);

let noSquares1;
let speed1;
let counter1;
let noSquares2;
let speed2;
let counter2;
let noSquares3;
let speed3;
let counter3;


if(confirm(`
    Przyjąć ustawienia domyślne?
    Etap 1:
        - liczba kwadratów = 2
        - szybkość koła = 10
        - prędkość licznika = 1000 ms
    Etap 2:
        - liczba kwadratów = 3
        - szybkość koła = 20
        - prędkość licznika = 800 ms
    Etap 3:
        - liczba kwadratów = 4
        - szybkość koła = 30
        - prędkość licznika = 500 ms
`)){
    noSquares1 = 10;
    speed1 = 10;
    counter1 = 500;
    noSquares2 = 6;
    speed2 = 20;
    counter2 = 300;
    noSquares3 = 4;
    speed3 = 30;
    counter3 = 100;
}

else{
    // Etap 1
    do{
        noSquares1 = prompt("Etap 1. Liczba kwadratów: ");
        noSquares1 = parseInt(noSquares1);
    } while(isNaN(noSquares1));


    do{
        speed1 = prompt("Etap 1. Szybkość koła (przesunięcie w px): ");
        speed1 = parseInt(speed1);
    } while(isNaN(speed1));


    do{
        counter1 = prompt("Etap 1. Prędkość licznika (w ms): ");
        counter1 = parseInt(counter1);
    } while(isNaN(counter1));



    // Etap 2
    do{
        noSquares2 = prompt("Etap 2. Liczba kwadratów: ");
        noSquares2 = parseInt(noSquares2);
    } while(isNaN(noSquares2) || noSquares2 <= noSquares1);


    do{
        speed2 = prompt("Etap 2. Szybkość koła (przesunięcie w px): ");
        speed2 = parseInt(speed2);
    } while(isNaN(speed2) || speed2 <= speed1);


    do{
        counter2 = prompt("Etap 2. Prędkość licznika (w ms): ");
        counter2 = parseInt(counter2);
    } while(isNaN(counter2) || counter2 >= counter1);




    // Etap 3
    do{
        noSquares3 = prompt("Etap 3. Liczba kwadratów: ");
        noSquares3 = parseInt(noSquares3);
    } while(isNaN(noSquares3) || noSquares3 <= noSquares2);


    do{
        speed3 = prompt("Etap 3. Szybkość koła (przesunięcie w px): ");
        speed3 = parseInt(speed3);
    } while(isNaN(speed3) || speed3 <= speed2);


    do{
        counter3 = prompt("Etap 3. Prędkość licznika (w ms): ");
        counter3 = parseInt(counter3);
    } while(isNaN(counter3) || counter3 >= counter2);
}




let noSquares = [noSquares1, noSquares2, noSquares3];
let speed = [speed1, speed2, speed3];
let counter = [counter1, counter2, counter3];


export {playerName, noSquares, speed, counter}
