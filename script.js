"use strict";
class Car {
    constructor(make, model, mileage, price) {
        this.make = "";
        this.model = "";
        this.mileage = 0;
        this.price = 0;
        this.make = make;
        this.model = model;
        this.mileage = mileage;
        this.price = price;
    }
}
//localStorage.clear();
let makes = { ford: [], tesla: [], bmw: [], vauxhall: [] };
makes.ford = "Fiesta,Focus,KA,Mondeo,Fusion,Transit".split(",");
makes.tesla = "3,sport,Cybertruck".split(",");
makes.bmw = "3,5,i3,i7,1 series".split(",");
makes.vauxhall = "Corsa,Insignia,Movano,Astra,Senator".split(",");
//cars= generateRandomCars(makes,10)
let cars = [];
cars = JSON.parse(localStorage.getItem("cars")); //! is a null ascertion and tells typescript that u know theres a null there
if (cars == null) {
    cars = generateRandomCars(makes, 15);
    saveEnteredCarForever();
}
cars.push(new Car("BMW", "i3", 2000, 3000));
let holder = document.getElementById("holder");
renderCars();
function renderCars() {
    holder.innerHTML = "";
    for (let i = 0; i < cars.length; i++) {
        let card = document.createElement("div");
        card.classList.add("card");
        holder.appendChild(card);
        let heading = document.createElement("h1");
        heading.innerHTML = cars[i].make + " " + cars[i].model;
        card.appendChild(heading);
        let price = document.createElement("p");
        price.innerHTML = `£${cars[i].price.toString()}`;
        card.appendChild(price);
        let mileage = document.createElement("p");
        mileage.innerHTML = cars[i].mileage.toString() + " Miles";
        card.appendChild(mileage);
        let deleteButton = document.createElement("button");
        // deleteButton.dataset.index=i
        deleteButton.setAttribute("id", "deleteCard");
        deleteButton.innerHTML = "Delete";
        deleteButton.addEventListener("click", deleteSquare);
        card.appendChild(deleteButton);
        function deleteSquare() {
            card.remove();
            localStorage.removeItem("card");
        }
    }
}
// function deleteSquare(){
//     card.remove()
//     localStorage.removeItem("card")
// }
function generateRandomCars(makes, numCars) {
    //let color="red,orange,yellow,green,blue,violet,black,white".split(",")
    let cars = [];
    for (let i = 0; i < numCars; i++) {
        let make = pickFrom(Object.keys(makes)); //Pick a manufacturer from the makes object
        let model = pickFrom(makes[make]);
        // let mileage:string= pickFrom(makes[mileage]).toString()
        cars.push({ make: make, model: model, price: randomInteger(10000), mileage: randomInteger(100000) });
    }
    return cars; //send back the 'complete' list of cars
}
// a generic function to return a random selection from ANY array (i choose to pass it)
function pickFrom(list) {
    let r = Math.floor(Math.random() * list.length); // generate a random number between 0 and the list length (-1)
    return list[r]; //return the chosen item
}
function randomInteger(max) {
    return Math.floor(Math.random() * max) + 1;
}
let saveButton = document.getElementById("save");
saveButton.addEventListener("click", addCarAndRefresh);
function addCarAndRefresh() {
    let make = document.getElementById("make").value;
    let model = document.getElementById("model").value;
    let mileage = parseInt(document.getElementById("mileage").value);
    let price = parseInt(document.getElementById("price").value);
    //let color=(<HTMLInputElement>document.getElementById("color")).value
    let newCar = { make: make, model: model, mileage: mileage, price: price };
    cars.push(newCar);
    renderCars();
    saveEnteredCarForever();
}
//function $(id){return document.getElementById(id)}
function saveEnteredCarForever() {
    localStorage.setItem("cars", JSON.stringify(cars));
}
//# sourceMappingURL=script.js.map














