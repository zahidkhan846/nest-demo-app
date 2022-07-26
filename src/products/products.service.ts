import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  private products: Product[] = [];

  async addProduct(
    name: string,
    description: string,
    price: number,
  ): Promise<string> {
    const newProduct = new this.productModel({ name, description, price });
    const res = await newProduct.save();

    return res.id;
  }

  async getAllProducts(): Promise<Product[]> {
    const products = await this.productModel.find().exec();
    return products;
  }

  async getProduct(id: string): Promise<Product> {
    return await this.findSelectedProduct(id);
  }

  async editProduct(
    id: string,
    name: string,
    description: string,
    price: number,
  ) {
    let product = await this.findSelectedProduct(id);
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    await product.save();
  }

  async deleteProduct(id: string) {
    await this.productModel.findByIdAndDelete(id);
  }

  private async findSelectedProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Product not found');
    }
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
}
