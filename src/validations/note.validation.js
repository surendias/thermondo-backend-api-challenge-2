const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createNote = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array(),
  }),
};

const getNotes = {
  query: Joi.object().keys({
    query_string: Joi.string().required(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getNote = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateNote = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string().required(),
      body: Joi.string().required(),
      tags: Joi.array(),
    })
    .min(1),
};

const deleteNote = {
  params: Joi.object().keys({
    noteId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
};
