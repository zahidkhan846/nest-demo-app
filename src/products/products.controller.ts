import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Product } from './products.model';
import { ProductsService } from './products.service';

interface PostBody {
  name: string;
  description: string;
  price: number;
}

@Controller('product')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Post('create-product')
  async craeteProduct(
    @Body('product') product: PostBody,
  ): Promise<{ id: string }> {
    const pId = await this.productsService.addProduct(
      product.name,
      product.description,
      product.price,
    );
    return { id: pId };
  }

  @Get()
  async getProducts(): Promise<Product[]> {
    return await this.productsService.getAllProducts();
  }

  @Get(':id')
  async getProduct(@Param('id') pId: string): Promise<Product> {
    return await this.productsService.getProduct(pId);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('name') name: string,
    @Body('description')
    description: string,
    @Body('price')
    price: number,
  ): any {
    this.productsService.editProduct(prodId, name, description, price);
    return null;
  }

  @Delete(':id')
  deleteProduct(@Param('id') prodId: string): any {
    this.productsService.deleteProduct(prodId);
    return null;
  }
}
