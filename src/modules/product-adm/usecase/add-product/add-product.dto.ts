export interface InputAddProductDto {
    id?: string
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
}


export interface OutputAddProductDto {
    id: string;
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
}

