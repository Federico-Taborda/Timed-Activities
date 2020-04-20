const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("./public"));

// GET
app.get("/", (req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.sendFile("./public/index.html");
});

// Muestra las tablas
app.get("/actividades", (req, res) => {
    let sql = "SELECT name FROM sqlite_master WHERE type='table'";

    db.serialize(() => {
        db.all(sql, (err, table) => {
            if(err) console.log(err.message);
            res.json({"message": "succes", "tables": table});
        });
    });
}); 

// Muestra los datos de una tabla
app.post("/actividades/:actividad", (req, res) => {
    let actividad = req.body.actividad;
    let sql = `SELECT * FROM ${actividad}`;
    let params = [];
    
    db.all(sql, params, (err, rows) => {
        if(err) console.log(err.message);
        
        res.json({"message": "success", "data": rows});
    });
});

// POST
app.post("/nueva-actividad", (req, res) => {
    let actividad = req.body.actividad;

    let sql = `CREATE TABLE ${actividad}(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tiempo text,
        hora text,
        dia text,
        mes text,
        año text
    )`;

    db.run(sql, (err) => {
        if(err) console.log("Tabla ya creada");
    });
});

app.post("/ingresar-datos", (req, res) => {
    const { actividad, tiempo, hora, dia, mes, año } = req.body;
    
    db.serialize(() => {
        let sql = `INSERT INTO ${actividad}(tiempo, hora, dia, mes, año)VALUES(?, ?, ?, ?, ?)`;
        db.run(sql, [tiempo, hora, dia, mes, año], (err) => {
            if(err) console.log(err.message);
        });
    });
});

app.listen(port, () => {
    console.log(`Servidor en el puerto ${port}`);
});