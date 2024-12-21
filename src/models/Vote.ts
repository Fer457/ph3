import mongoose, { Schema, model, Document } from "mongoose";

export interface VoteDocument extends Document {
  userId: Schema.Types.ObjectId;
  votes: { [key: string]: string }; // Premio -> Candidato
}

const VoteSchema = new Schema<VoteDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // Un voto por usuario
    },
    votes: {
      type: Map,
      of: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Vote = mongoose.models?.Vote || model<VoteDocument>("Vote", VoteSchema);
export default Vote;
