const path = require('path');
const fs = require('fs');

const usersFilePath = path.join(__dirname, '../database/user-json/user.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


const controlador = {

    login: (req, res) => {
        res.render('login')
        res.redirect('/');
    },


    editar: (req, res) => {
        res.render('editar-perfil')
        res.redirect('/');
    },



    // Create - Form to create


    create: (req, res) => {
        res.render('crear')
    },


    // Create -  Method to store
    store: (req, res) => {
        console.log(req.body)
        let nuevoUsuario = {
            id: (users[users.length - 1].id) + 1,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            ciudad: req.body.ciudad,
            provincia: req.body.provincia,
            contraseña: req.body.contra,
            mail: req.body.mail
        }

        users.push(nuevoUsuario)

        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "));
        res.redirect('/');
    },


    // Update - Form to edit
    change: (req, res) => {
        let idUsuario = req.params.id;
        let objetoUsuario;

        for (let obj of users) {
            if (idUsuario == obj.id) {
                objetoUsuario = obj;
                break;
            }
        }

        res.render('editar-perfil.ejs',{ usuario: objetoUsuario})

        res.redirect('/');
    },


    // Update - Method to update
    update: (req, res) => {
        let idUsuario = req.params.id;
        let objetoUsuario;

        for (let obj of users) {
            if (idUsuario == obj.id) {

                obj.nombre = req.body.nombre;
                obj.apellido = req.body.apellido;
                obj.usuario = req.body.usuario;
                obj.ciudad = req.body.ciudad;
                obj.provincia = req.body.provincia;
                obj.contraseña = req.body.contraseña;
                obj.mail = req.body.mail

                break;
            }

        }

        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "));

        res.redirect('/');
    },


    // // Delete - Delete one product from DB
    // destroy: (req,res) => {
    //     let idUsuario = req.params.id;

    // 	let arregloUsuarios = users.filter(function(elemento){
    // 		return elemento.id!=idUsuario;
    // 	})

    // 	fs.writeFileSync(usersFilePath, JSON.stringify(arregloUsuarios, null, " "));

    // 	res.redirect('/'); 
    // }

}


module.exports = controlador;