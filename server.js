import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Node.js viene con "módulos nativos" o "módulos internos"
// Es decir, herramientas que ya vienen incluidas en Node.js, como:
// fs → para leer archivos
// http → para crear servidores
// path → para rutas de archivos
// url → para manejar URLs

// cargar variables del.env 
// dotenv es una libreria externa de node.js su proposito es leer un archivo .env y cargar sus variables en process.env
dotenv.config() //config() es un método que viene con esa librería. buscar automáticamente un archivo llamado .env en la raíz del proyecto y cargar su contenido.
// Estás diciendo:

// "Cárgale a Node las variables que están en el archivo .env y ponlas en process.env."
//Si no llamas a dotenv.config(), las variables del archivo .env no estarán disponibles en process.env.


// Obtener el puerto
const PORT = process.env.PORT || 3000;

// 3. Habilitar __dirname con ESModules
const __filename = fileURLToPath(import.meta.url); // import.meta.url devuelve una URL con formato file:// que representa la ubicacion del archivo actual server.js
// ejemplo file:///home/carlos/proyecto/server.js  Eso no es una ruta del sistema de archivos, es una URL.
// que hace fileURLToPath(import.meta.url) convierte esa URL en una ruta real del sistema operativo = /home/carlos/proyecto/server.js y la guarda en fileName


const __dirname = path.dirname(__filename); // extrae solo la carpeta donde esta el archivo = /home/carlos/proyecto y lo guarda en dirname

const app = express(); //Express es un framework, te permite:
// Crear servidores web fácilmente.
// Manejar rutas (/, /about, /api/usuarios, etc.).
// Procesar peticiones (GET, POST, PUT, DELETE, etc.).
// Enviar respuestas al navegador o cliente.
// Servir archivos estáticos (HTML, CSS, imágenes...).
// Crear APIs.
// 🔄 ¿Qué tipos de acciones puedes manejar con app?
// Método	    ¿Para qué se usa?
// GET	        Obtener información (leer)
// POST	        Enviar información (crear)
// PUT	        Actualizar información existente
// DELETE	    Eliminar información
// USE	        Middleware: código que se ejecuta antes de una ruta


app.use(express.json());


// 5. Servir archivos estáticos desde 'public'
app.use(express.static(path.join(__dirname, 'public')));
//Qué hace app.use(...)?
// Aplica un middleware.
// Un middleware es una función que se ejecuta antes de llegar a cualquier ruta (GET, POST, etc.).
// En este caso, estás diciendo:
// "Para cualquier solicitud, primero intenta buscar un archivo estático en esta carpeta".

// Detalles técnicos:
// express.static() es middleware.
// Su trabajo es: servir archivos estáticos (que no cambian) como:
// .html (páginas)
// .css (estilos)
// .js (scripts frontend)
// .png, .jpg, .svg (imágenes)
// .pdf, .ico, etc.

//Cuando el navegador pide: http://localhost:3000/about.html
//No estás pidiendo directamente una función. Estás pidiendo: → “Dame un archivo llamado about.html”
//Y Express, gracias a express.static(...), sabe que debe buscarlo en esta carpeta: /tu-proyecto/public/about.html


// rutas get
app.get('/about',(req, res)=>{
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/contact',(req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.get('/api/mensaje/',(req, res)=>{
    res.json({mensaje:"hola desde la api"});
});


// ruta post
app.post('/api/mensaje/', (req, res)=>{
    const datos = req.body;
    console.log("datos recibidos: ", datos);

    res.json({
        ok:true,
        mensaje: "datos recibidos correctamente",
        datosRecibidos: datos
    });
});




// 6. Iniciar el servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
// 🧠 ¿Qué hace app.listen(...) exactamente?
// Le dice a Express:"Escucha las solicitudes HTTP que lleguen a este puerto".
// Sin esta línea, tu servidor no está escuchando conexiones, y por tanto no responde a ninguna ruta (/, /about, etc.).
