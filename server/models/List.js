const { Schema, model, Types } = require('mongoose');



const listSchema = new Schema(
    {
        listId: {
            type: Schema.Types.ObjectId,
            default: () => Types.ObjectId(),
        },
        lTitle: {
            type: String,
            required: true
        },
      
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

const List = model('List', listSchema);
module.exports = List;