let express = require("express");
const guestMiddleware = require("../middlewares/guestMiddleware");
const usuarioController = require("../controllers/usuarioController");
const validations = require("../middlewares/userRegisterValidations");
const uploadFile = require("../middlewares/userMulter");

let router = express.Router();

/*** CREATE PERFIL ***/
router.get("/create", guestMiddleware, usuarioController.create);
router.post("/create", uploadFile.single("imagenPerfil"), validations, usuarioController.store);

// // /*** EDIT ONE USUARIO ***/
router.get("/change", usuarioController.renderizarEditarPerfil);
router.put("/change", uploadFile.single("imagenPerfil"), usuarioController.editUser);

// Perfil

router.get("/profile", usuarioController.renderizarPerfil);
router.get("/logout", usuarioController.logout);

// LOG IN

router.get("/login", guestMiddleware, usuarioController.login);

// PROCESAR EL LOGIN
router.post("/login", usuarioController.loginProcess);

//BORRAR PERFIL
router.delete("/borrar/:id", usuarioController.borrar);

module.exports = router;
