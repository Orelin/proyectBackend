import express, { request } from "express";
import ProductManager from "./controllers/ProductManager.js";

const productManager = new ProductManager
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
    let products = await productManager.getProducts();
    limit > 0 ? res.send(JSON.stringify(products.slice(0, limit))) : res.send(JSON.stringify(products))
})

app.get("/products/:id", async (req, res) => {
    let productId = parseInt(req.params.id)
    let productById = await productManager.getProductsById(productId);
    res.send(JSON.stringify(productById))
})

app.post("/products", async (req, res) => {
    let { title, description, price, thumbnail, code, stock } = req.body
    await productManager.addProduct(title, description, price, thumbnail, code, stock)
    res.send("Producto Agregado")
})

app.put("/products/:id", async (req, res) => {
    let productId = parseInt(req.params.id);
    let productUpdated = req.body
    let productById = await productManager.getProductsById(productId);
    if (productById && productUpdated) {
        productManager.updateProduct(productId, productUpdated)
        res.send(`Producto ${productId} updated`);
    }else{
        res.send("No se puede actualizar") //!Enviar error
    }
})

app.delete("/products/:id", async (req, res) => {
    let productId = parseInt(req.params.id)
    await productManager.deleteProduct(productId);
    res.send(`product ${productId} deleted`);
})

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
})
