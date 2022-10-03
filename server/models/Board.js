const { Schema, model } = require('mongoose');
const List = require('./List');
const User = require('./User');
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
)
module.exports = boardSchema;