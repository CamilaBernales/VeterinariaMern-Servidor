const express = require("express");
const router = express.Router();
const compraController = require("../controllers/compraController");
const productocompraController = require("../controllers/productocompraController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const authrol = require("../middleware/authrol");
const PaymentController = require("../controllers/PaymentController");
 //importamos el controller

const PaymentService = require("../service/PaymentService"); 
//importamos el service
// const PaymentInstance =  PaymentController( PaymentService()); 
router.post(
  "/",
  auth,
  [
    check("detallesEnvio.direccion", "La dirección es obligatoria").notEmpty(),
    check("detallesEnvio.codigoPostal", "El código postal es obligatorio").notEmpty(),
    check("detallesEnvio.telefono", "El teléfono es obligatorio").notEmpty(),
    check("total", "Falta el total de la compra").notEmpty(),
    check("pedido.*.producto", "No es un ID válido").isMongoId(),
    check("pedido.*.precio", "Falta precio de producto").notEmpty(),
    check("pedido.*.cantidad", "Falta la cantidad").notEmpty(),
  ],
  compraController.crearCompra,
  productocompraController.crearProductoCompra
);
// router.post("/email", compraController.sendEmail);
router.get("/listado", auth, authrol, compraController.obtenerCompras);
router.get("/filtrocompras", auth, authrol, compraController.filtrarCompras);
router.get("/miscompras", auth, compraController.obtenerComprasUsuario);
router.post("/payment/new", PaymentController.createMercadoPagoLink 
);
// router.post("/webhook", PaymentInstance.webhook); //para notificaciones de compras

module.exports = router;
