import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import ProductGateway from "../../gateway/product.gateway";
import { InputAddProductDto, OutputAddProductDto } from "./add-product.dto";

export default class AddProductUseCase {
    constructor(private readonly productGateway: ProductGateway) {
    }


    async execute(input: InputAddProductDto): Promise<OutputAddProductDto> {
        const product = new Product({ id: new Id(input.id), description: input.description, name: input.name, purchasePrice: input.purchasePrice, stock: input.stock })
        const result = await this.productGateway.addProduct(product);

        return {
            id: product.id.id,
            description: product.description,
            name: product.name,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        };
    }
}