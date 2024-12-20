import mongoose from 'mongoose';

const AwardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  votedFor: { type: String, required: true },
  votedBy: { type: String, required: true },
});

export default mongoose.models.Award || mongoose.model('Award', AwardSchema);
