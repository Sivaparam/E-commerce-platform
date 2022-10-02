const { Schema, Types } = require('mongoose');
const Board = require('');
const Card = require('./Card');

const listSchema = new Schema(
    {
        listId: {
            type: Schema.Types.ObjectId,
            default: () => Types.ObjectId(),
        },
        title: {
            type: String,
            required: true, 
        },
        board: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Board',
            },
        ],
        cards: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Card',
            },
        ],
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
      }
);

module.exports = listSchema;