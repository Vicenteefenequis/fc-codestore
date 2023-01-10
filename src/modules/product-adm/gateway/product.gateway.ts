import Product from "../domain/product.entity";

export default interface ProductGateway {
    addProduct(product: Product): Promise<void>
    find(id: string): Promise<Product>
}