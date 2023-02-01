import express from "express";
import ProductManager from "./components/ProductManager.js";

const product = new ProductManager
/*//! Crear productos
product.addProduct("Titulo", "Description", 150, "Image", "adc120", 3);
product.addProduct("Titulo1", "Description1", 230, "Image1", "adc121", 2);
product.addProduct("Titulo2", "Description2", 420, "Image2", "adc122", 5);
product.addProduct("Titulo3", "Description3", 580, "Image3", "adc123", 7);
product.addProduct("Titulo4", "Description4", 124, "Image4", "adc124", 3);
product.addProduct("Titulo5", "Description5", 524, "Image5", "adc125", 6);
product.addProduct("Titulo6", "Description6", 326, "Image6", "adc126", 4);
product.addProduct("Titulo7", "Description7", 850, "Image7", "adc127", 2);
product.addProduct("Titulo8", "Description8", 9000, "Image8", "adc128", 1);
product.addProduct("Titulo9", "Description9", 500, "Image9", "adc129", 2);*/


const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/products", async (req, res) => {
    let limit = parseInt(req.query.limit);
    let products = await product.getProducts();
    limit > 0 ? res.send(products.slice(0, limit)) : res.send(products)
})

app.get("/products/:pid", async (req, res) => {
    let productId = parseInt(req.params.pid)
    let products = await product.getProductsById(productId);
    
    res.send(products)
})

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
})


/*
app.get("/user/:id", (req, res) => {
    console.log(req.params.id);
    res.send("Bienvenido a mi pagina de Get User");
})

app.post("/user/:id", (req, res) => {
    console.log(req.params.id);
    res.send("Bienvenido a mi pagina de Post User");
})

app.put("/user/:id", (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    res.send("Bienvenido a mi pagina de Put User");
})

app.delete("/user/:id", (req, res) => {
    console.log(req.params.id);
    res.send("Bienvenido a mi pagina de Delete User");
})*/