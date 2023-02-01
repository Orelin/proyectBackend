import { promises as fs } from 'fs';

class ProductManager {
    constructor() {
        this.products = [];
        this.path = './products.txt';
        this.id = 0;
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock)
            return console.error(`Todos los campos son necesarios`);

        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].code === code)
                return console.error(`Codigo ${code} repetido`);
        }

        this.products.push({
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: this.id++,
        });

        await fs.writeFile(this.path, JSON.stringify(this.products));
    }

    async getProducts() {
        let readProducts = await fs.readFile(this.path, 'utf-8');
        return JSON.parse(readProducts);
    }

    async getProductsById(id) {
        let readProducts = await fs.readFile(this.path, 'utf-8');
        return (
            JSON.parse(readProducts)[id] ||
            console.log(`Producto id: ${id} no encontrado`)
        );
    }

    async updateProduct(id, product) {
        if(product.id) { 
            console.error("Ingrese parametros ID y objeto por separado") 
            return}

        //*Lee y elimina producto por id
        let readProducts = await fs.readFile(this.path, 'utf-8');
        JSON.parse(readProducts);
        let deleted = JSON.parse(readProducts).filter((prod) => prod.id !== id);
        //*Actualizar product
        const { title, description, price, thumbnail, code, stock } = product;
        deleted.push({
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: id,
        });
        await fs.writeFile(this.path, JSON.stringify(deleted));
    }

    async deleteProduct(id) {
        let readProducts = await fs.readFile(this.path, 'utf-8');
        let deleted = JSON.parse(readProducts).filter(
            (product) => product.id !== id
        );
        await fs.writeFile(this.path, JSON.stringify(deleted));
    }
}

export default ProductManager