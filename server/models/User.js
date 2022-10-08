const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      default: () => Types.ObjectId(),
    },
    name: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/]
    },
    password: {
      type: String,
      required: true,
    },
    board: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Board',
      },
    ],
  },

  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
)

const User = model('User', userSchema);

module.exports = User;