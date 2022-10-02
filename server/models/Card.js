const { schema, model, Schema, Types } = require('mongoose');
const User = require();
const List = require('./List');

const cardSchema = new Schema (
    {
        cardId: {
            type: Schema.Types.ObjectId,
            default: () => Types.ObjectId(),
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        list: [
            {
                type: Schema.Types.ObjectId,
                ref: 'List',
            },
        ],
        users: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
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

module.exports = cardSchema;
