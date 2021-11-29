//----------------------------------------------------------------------------------------------------------------------//
//-----------------------------------CONEXION Y CONFIGURACION-----------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------------------//
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require("mysql");

//Variable para conexion
let connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    port: 3306,
    database : 'TriviaSano'
});

//Generar conexion mysql
connection.connect(function(err:any) {
    if (err) {
        console.error('Error al conectar a la base de datos: ' + err.stack);
        return;
    }
    else{
        console.log('Conexion establecida ' + connection.threadId);
    }    
});

//create application/json parser
var jsonParser = bodyParser.json()
 
//create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//Generar conexion postman
const configuracion ={
    hostname: "127.0.0.1",
    port: 3000,
}    

app.use(cors());



//--------------------------------------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------CRUD------------------------------------------------------------//
//--------------------------------------CREATE (post), READ (get), UPDATE (put, path), DELETE (delete)----------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------//


//----------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------GET-USUARIO----------------------------------------------------------------//
//--------------------------validar si existe el usuario por el id, que es el correo------------------------------------//
//----------------------------------------------------------------------------------------------------------------------//
app.get('/usuarios/correo', jsonParser, async(req:any, res:any) => {
    let correo = req.body.correo;
    await connection.query("select correo from usuarios where correo=?", [correo], function(error:any, results:any, field:any){

        /*console.log(`results: ${JSON.stringify(results)}`);
        console.log(`correoooo: ${JSON.stringify(correo)}`);*/
        let aux = "[{\"correo\":\"" +correo+"\"}]";
        //console.log(`aux: ${aux}`);
        if (aux == JSON.stringify(results) ) {
            console.log(`SI EXISTE EL CORREO: ${correo}`);
            res.send('El usuario ya existe en el sistema');
            return 1;
        }
        else {
            console.log(`NO EXISTE EL CORREO`);
            res.send('El usuario no existe en el sistema');
            return 0;
        }
    });
})



//----------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------GET-LOGIN--------------------------------------------------------------//
//----------validar si la contraseña ingresada es la misma que la del usuario segun su id, que es el correo-------------//
//----------------------------------------------------------------------------------------------------------------------//
app.get('/usuarios/login', jsonParser, async(req:any, res:any) => {
    let correo = req.body.correo;
    let contrasenna = req.body.contrasenna;
    console.log("La contraseña ingresada es :" + contrasenna);
    console.log("El correo ingresado es: "+ correo);
    await connection.query("select contrasenna from usuarios where correo = ?", [correo], function(error:any, results:any, field:any){
        
        let aux = "[{\"contrasenna\":\""+contrasenna+"\"}]";
        //console.log("la contraseña es: " + contrasenna);
        //console.log("el resultado de la consulta es: " + JSON.stringify(results));
        //console.log("el aux es: " + aux);
        if (aux == JSON.stringify(results)) {
            console.log(`LA CONTRASEÑA ES CORRECTA: ${contrasenna}`);
            res.send('Contraseña validada con exito');
            return 1;
        }
        else {
            console.log(`CONTRASEÑA INCORRECTA`);
            res.send('Contraseña incorrecta');
            return 0;
        }        
    });
})



//----------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------POST-------------------------------------------------------------------//
//--------------------crear un nuevo usuario dados los valores de todos los atributos-----------------------------------//
//----------------------------------------------------------------------------------------------------------------------//
app.post('/usuarios/CrearUsuario', jsonParser, async(req:any, res:any) => {
    let correo = req.body.correo;
    let contrasenna = req.body.contrasenna;
    let nombre = req.body.nombre;
    let edad = req.body.edad;
    let fechaNacimiento = req.body.fechaNacimiento;
    let sexo = req.body.sexo;
    let estatura = req.body.estatura;
    let peso = req.body.peso;
    let enfermedadCardiaca = req.body.enfermedadCardiaca;
    let enfermedadRespiratoria = req.body.enfermedadRespiratoria;
    let cirugia = req.body.cirugia;
    let alergia = req.body.alergia;
    let enfermedadDegenerativa = req.body.enfermedadDegenerativa;
    let futbol = req.body.futbol;
    let baloncesto = req.body.baloncesto;
    let voleyball = req.body.voleyball;
    let salsa = req.body.salsa;
    let zumba = req.body.zumba;
     
    const nuevoUsuario = {
        correo,
        contrasenna,
        nombre,
        edad,
        fechaNacimiento,
        sexo,
        estatura,
        peso,
        enfermedadCardiaca,
        enfermedadRespiratoria,
        cirugia,
        alergia,
        enfermedadDegenerativa,
        futbol,
        baloncesto,
        voleyball,
        salsa,
        zumba
    }
    await connection.query("insert into usuarios set ?",[nuevoUsuario]);
    res.send('Usuario creado con exito');
})



//----------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------DELETED-------------------------------------------------------------------//
//-----------------------borrar un usuario segun la id ingresada, que es el correo--------------------------------------//
//----------------------------------------------------------------------------------------------------------------------//
app.delete('/usuarios/EliminarUsuario/:correo', jsonParser, async(req:any, res:any) => {
    let correo = req.params.correo;
    //console.log("correo: ${correo}", correo);
    await connection.query( "delete from usuarios where correo = ?", [correo] );
    res.send('Usuario eliminado con exito');
})



//----------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------PUT--------------------------------------------------------------------//
//-------------actualizar un usuario segun la id ingresada, que es el correo, y con los valores dados-------------------//
//----------------------------------------------------------------------------------------------------------------------//
app.put('/usuarios/ActualizarUsuario', jsonParser, async(req:any, res:any) => {
    let correo = req.body.correo;
    let contrasenna = req.body.contrasenna;
    let nombre = req.body.nombre;
    let edad = req.body.edad;
    let fechaNacimiento = req.body.fechaNacimiento;
    let sexo = req.body.sexo;
    let estatura = req.body.estatura;
    let peso = req.body.peso;
    let enfermedadCardiaca = req.body.enfermedadCardiaca;
    let enfermedadRespiratoria = req.body.enfermedadRespiratoria;
    let cirugia = req.body.cirugia;
    let alergia = req.body.alergia;
    let enfermedadDegenerativa = req.body.enfermedadDegenerativa;
    let futbol = req.body.futbol;
    let baloncesto = req.body.baloncesto;
    let voleyball = req.body.voleyball;
    let salsa = req.body.salsa;
    let zumba = req.body.zumba;
    await connection.query("update usuarios set contrasenna = ?,  nombre = ?, edad = ?, fechaNacimiento = ?, sexo = ?, estatura = ?,  peso = ?, enfermedadCardiaca = ?, enfermedadRespiratoria = ?, cirugia = ?, alergia = ?, enfermedadDegenerativa = ?, futbol = ?, baloncesto = ?, voleyball = ?, salsa = ?, zumba = ?  where correo = ?",[contrasenna, nombre, edad, fechaNacimiento, sexo, estatura, peso, enfermedadCardiaca, enfermedadRespiratoria, cirugia, alergia, enfermedadDegenerativa, futbol, baloncesto, voleyball, salsa, zumba, correo]);
    res.send('Usuario actualiz');
})


//----------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------LISTEN--------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------------------//
app.listen(configuracion, () => {
    console.log(`Conectandome al servidor http://localhost:${configuracion.port}`)
})
