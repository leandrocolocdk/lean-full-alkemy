const express = require('express');
const app = express();

const db = require("./models");

// Routers
const operationRouter = require("./routes/Operations");
app.use("/operations", operationRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001");
    });
});