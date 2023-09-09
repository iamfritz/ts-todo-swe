import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
}

const categorySchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: [true, "Category already Exist"],
  }
});

export default mongoose.model<ICategory>('Category', categorySchema);
