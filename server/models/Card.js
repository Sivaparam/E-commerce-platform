const { model, Schema } = require('mongoose');


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

const Card = model('Card', cardSchema);

module.exports = Card;
