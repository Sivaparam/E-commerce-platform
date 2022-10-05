const { Schema, model } = require('mongoose');

const boardSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        member: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        list: [
            {
                type: Schema.Types.ObjectId,
                ref: 'List',
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

const Board = model('Board', boardSchema);

module.exports = Board;