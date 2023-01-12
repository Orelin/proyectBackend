class ProductManager {

    constructor (){
        this.products = [];
        this.id = 0;
    }

    addProduct (title, description, price, thumbnail, code, stock){
        if (!title || !description || !price || !thumbnail || !code || !stock) return

        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].code === code) return console.error(`Codigo ${code} repetido`)}
        
        this.products.push({
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        id: this.id++});
    }

    getProducts () {
        return this.products; 
    }

    getProductsById (id) {
        return this.products[id] || console.error("Not found");
    }
}