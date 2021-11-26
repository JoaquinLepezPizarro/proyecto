"use strict";
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
//mysql
var mysql = require("mysql");
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    port: 3306,
    database: 'educacion'
});
connection.connect(function (err) {
    if (err) {
        console.error('error conectando a la BD: ' + err.stack);
        return;
    }
    console.log('coneccion establecida ' + connection.threadId);
});
// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var configuracion = {
    hostname: "127.0.0.1",
    port: 3000,
};
app.use(cors());
//CRUD: CREATE (post), READ (get), UPDATE (put, path), DELETE (delete)
//CUANDO ENTRA A "USUARIOS" RETORNA UNA RESPUESTA. EJ: "error 404"
app.get('/Usuarios', function (req, res) {
    connection.query("select * from usuarios", function (error, results, field) {
        res.send(JSON.stringify(results));
    });
    /*let Usuarios ={
        "id": 1,
        "nombre": "pepito",
        "apellidos": "perez"
    }

    res.send(JSON.stringify(Usuarios));*/
});
app.get('/Usuarios/:id', function (req, res) {
    var id = req.params.id;
    connection.query("select * from usuarios where id=?", [id], function (error, results, field) {
        res.send(JSON.stringify(results));
    });
    //console.log(`el id del usuario es ${id}`);
    //res.send("se encontro e usuario");
});
app.post('/CrearUsuarios', jsonParser, function (req, res) {
    var usuario = req.body.usuario;
    var clave = req.body.clave;
    var estado = req.body.estado;
    connection.query("insert into usuarios(usuario,clave,estado) values(?,?,?)", [usuario, clave, estado], function (error, results, field) {
        res.send(JSON.stringify(results.insertId));
    });
    /*if (usuario!="") {
        console.log(`Usuario ${usuario} con la clave ${clave} y correo ${correo}`);

        res.status(201).send("datos creados");
    }*/
});
app.put('/Actualizar/:id', jsonParser, function (req, res) {
    var id = req.params.id;
    var usuario = req.body.usuario;
    var clave = req.body.clave;
    var correo = req.body.correo;
    console.log("Usuario " + usuario + " con la clave " + clave + ", correo " + correo + " y id " + id + " no han sido modificados");
    res.send("datos modificados");
});
app.delete('/Eliminar/:id', function (req, res) {
    var id = req.params.id;
    res.status(200).send("se elimin\u00F3 el dato " + id);
});
app.listen(configuracion, function () {
    console.log("Conectandome al servidor http://localhost:" + configuracion.port);
});
