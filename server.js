const express = require("express");
const app = express();
const port = 3000;
const collectibles = [
        { name: 'shiny ball', price: 5.95 },
        { name: 'autographed picture of a dog', price: 10 },
        { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];
const shoes = [
        { name: "Birkenstocks", price: 50, type: "sandal" },
        { name: "Air Jordans", price: 500, type: "sneaker" },
        { name: "Air Mahomeses", price: 501, type: "sneaker" },
        { name: "Utility Boots", price: 20, type: "boot" },
        { name: "Velcro Sandals", price: 15, type: "sandal" },
        { name: "Jet Boots", price: 1000, type: "boot" },
        { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

// Question 1 Solution
app.get("/greetings/:username", (req, res) => {
        res.send(`<h1>Hello there, ${req.params.username}!</h1>`);
});

// Question 2 Solution
app.get("/roll/:number", (req, res) => {
        const number = req.params.number;

        if (isNaN(number)) {
                res.send("<h1>You must specify a number.</h1>");
        } else {
                const randomNumber = Math.floor(Math.random() * number);
                res.send(`<h1>You rolled a ${randomNumber}.</h1>`);
        }
});

// Question 3 Solution
app.get("/collectibles/:index", (req, res) => {
        const index = req.params.index;

        if (isNaN(index) ||
                index < 0 ||
                index > collectibles.length - 1) {
                res.send("<h1>This item is not yet in stock. Check back soon!</h1>");
        } else {
                res.send(`<h1>So, you want the ${collectibles[index].name}? For ${collectibles[index].price}, it can be yours!</h1>`);
        }
});

// Question 4 Solution
app.get("/shoes", (req, res) => {
        const minPrice = req.query["min-price"];
        const maxPrice = req.query["max-price"];
        const type = req.query["type"];
        let result = [...shoes];

        if (minPrice) {
                result = result.filter(shoe => shoe["price"] >= minPrice);
        }

        if (maxPrice) {
                result = result.filter(shoe => shoe["price"] <= maxPrice);
        }

        if (type) {
                result = result.filter(shoe => shoe["type"] === type);
        }

        res.send(result);
});

app.listen(port, () => {
        console.log(`Server is listening on port ${port}.`);
});