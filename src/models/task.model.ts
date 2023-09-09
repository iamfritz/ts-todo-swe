import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
  category: Array<String>;
  level: string; // low, medium, high
  status: string; // pending, progress, completed, closed
  createdAt: Date;
  updatedAt: Date;    
}

const taskSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide an Title!"],
      unique: [true, "Title already Exist"],
    },
    description: {
      required: true,
      type: String,
    },
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    level: { type: String },
    status: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date }
  }
);

taskSchema.pre("save", function (next) {
  const now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

export default mongoose.model<ITask>('Task', taskSchema);

