export type ProductType = {
    id: number;
    name: string;
    price: number;
    description: string;
    category: string;
};

export class Product{
    id: number;
    name: string;
    price: number;
    description: string;
    category: string;

    constructor(product: ProductType){
        this.id = product.id;
        this.name = product.name;
        this.price = product.price;
        this.description = product.description;
        this.category = product.category;
    }

    public getId(): number{
        return this.id;
    }

    public setId(id: number): void{
        this.id = id;
    }

    public getName(): string{
        return this.name;
    }

    public setName(name: string): void{
        this.name = name;
    }

    public getPrice(): number{
        return this.price;
    }

    public setPrice(price: number): void{
        this.price = price;
    }

    public getDescription(): string{
        return this.description;
    }

    public setDescription(description: string): void{
        this.description = description;
    }

    public getCategory(): string{
        return this.category;
    }

    public setCategory(category: string): void{
        this.category = category;
    }
}