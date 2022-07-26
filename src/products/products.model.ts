import * as mongoose from 'mongoose';

// export class Product {
//   //   id: string;
//   //   name: string;
//   //   description: string;
//   //   price: number;
//   //   constructor(id: string, name: string, description: string, price: number) {
//   //     this.id = id;
//   //     this.name = name;
//   //     this.description = description;
//   //     this.price = price;
//   //   }

//   // ALTERNATIVE
//   constructor(
//     public id: string,
//     public name: string,
//     public description: string,
//     public price: number,
//   ) {}
// }

export interface Product extends mongoose.Document {
  id: string;
  name: string;
  description: string;
  price: number;
}

// MONGOOSE
export const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});
