const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reactionSchema = Schema(
  {
    type: {
      type: String,
      enum: ["Blog", "Media", "Comment"],
    },
    reaction: {
      type: String,
      enum: ["Like", "Heart", "Care", "Laugh", "Angry", "Sad"],
    },
    owner: {
      ref: "User",
      required: true,
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

const Reaction = mongoose.model("Reaction", reactionSchema);
module.exports = Reaction;
