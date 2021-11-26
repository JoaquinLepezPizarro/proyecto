const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

//mysql
const mysql = require("mysql");

let connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    port: 3306,
    database : 'educacion'
});

connection.connect(function(err:any) {
    if (err) {
      console.error('error conectando a la BD: ' + err.stack);
      return;
    }
   
    console.log('coneccion establecida ' + connection.threadId);
  });

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const configuracion ={
    hostname: "127.0.0.1",
    port: 3000,
}    

app.use(cors());
//CRUD: CREATE (post), READ (get), UPDATE (put, path), DELETE (delete)

//CUANDO ENTRA A "USUARIOS" RETORNA UNA RESPUESTA. EJ: "error 404"
app.get('/Usuarios', (req:any, res:any) => {
    connection.query("select * from usuarios", function(error:any, results:any, field:any){
        res.send(JSON.stringify(results));
    });

    /*let Usuarios ={
        "id": 1,
        "nombre": "pepito",
        "apellidos": "perez"
    }

    res.send(JSON.stringify(Usuarios));*/
})

app.get('/Usuarios/:id', (req:any, res:any) => {
    let id = req.params.id;

    connection.query("select * from usuarios where id=?", [id], function(error:any, results:any, field:any){
        res.send(JSON.stringify(results));
    });

    //console.log(`el id del usuario es ${id}`);
    //res.send("se encontro e usuario");
})

app.post('/CrearUsuarios',jsonParser, (req:any, res:any) => {
    let usuario = req.body.usuario;
    let clave = req.body.clave;
    let estado = req.body.estado;
    
    connection.query("insert into usuarios(usuario,clave,estado) values(?,?,?)",[usuario,clave,estado],function(error:any, results:any, field:any){
        res.send(JSON.stringify(results.insertId));
    });

    /*if (usuario!="") {
        console.log(`Usuario ${usuario} con la clave ${clave} y correo ${correo}`);

        res.status(201).send("datos creados");
    }*/
    
    
})

app.put('/Actualizar/:id',jsonParser, (req:any, res:any) => {
    let id = req.params.id;
    let usuario = req.body.usuario;
    let clave = req.body.clave;
    let correo = req.body.correo;

        
    console.log(`Usuario ${usuario} con la clave ${clave}, correo ${correo} y id ${id} no han sido modificados`);
        
    res.send("datos modificados");
    
})

app.delete('/Eliminar/:id', (req:any, res:any) => {
    let id = req.params.id;
    res.status(200).send(`se eliminó el dato ${id}`);
})

app.listen(configuracion, () => {
  console.log(`Conectandome al servidor http://localhost:${configuracion.port}`)
})