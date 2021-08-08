const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors')

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors());

// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

const db = require("./models");
// Setting
const PORT = process.env.PORT || 3001;

// Routers
const operationRouter = require("./routes/Operations");
app.use("/api/v1/operations", operationRouter);
const usersRouter = require("./routes/Users");
app.use("/api/v1/users", usersRouter);
const categoryRouter = require("./routes/category");
app.use("/api/v1/categories", categoryRouter);


// Arrancamos el servidor
app.listen(PORT, function () {
    console.log(`La app ha arrancado en http://localhost:${PORT}`);

    // Conectase a la base de datos
    // Force true: DROP TABLES
    db.sequelize.sync({ force: false }).then(() => {
        console.log("Nos hemos conectado a la base de datos");
    }).catch(error => {
        console.log('Se ha producido un error', error);
    })

});
