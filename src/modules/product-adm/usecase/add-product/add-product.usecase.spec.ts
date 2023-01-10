import ProductGateway from "../../gateway/product.gateway";
import AddProductUseCase from "./add-product.usecase";

const MockRepository = (): ProductGateway => {
    return {
        addProduct: jest.fn(),
        find: jest.fn()
    }
}

describe('Add product use case unit test', () => {
    it("should add a product", async () => {
        //repository
        const productRepository = MockRepository();
        //use case
        const addProductUseCase = new AddProductUseCase(productRepository);
        //input
        const input = {
            name: 'Product 1',
            description: 'Description',
            purchasePrice: 100,
            stock: 10
        }
        //execute
        const output = await addProductUseCase.execute(input)

        expect(productRepository.addProduct).toHaveBeenCalled()

        expect(output.id).toBeDefined()
        expect(output.name).toBe(input.name)
        expect(output.description).toBe(input.description)
        expect(output.purchasePrice).toBe(input.purchasePrice)
        expect(output.stock).toBe(input.stock)

    })

});