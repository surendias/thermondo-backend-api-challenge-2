const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const noteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    body: {
      type: String,
      required: true,
      trim: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
noteSchema.plugin(toJSON);
noteSchema.plugin(paginate);

/**
 * @typedef Note
 */
const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
