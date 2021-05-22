// Configuración del puerto

process.env.PORT = process.env.PORT || 3005;

//Vencimiento del token
process.env.CADUCIDAD_TOKEN = "48h";

//semilla de token
process.env.SEED = process.env.SEED || "este-es-el-seed";

process.env.NODE_ENV = process.env.NODE_ENV || "dev";
//Base de datos
let urlDB;

if (process.env.NODE_ENV === "dev") {
  urlDB = "mongodb://localhost:27017/test";
} else {
  urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;
