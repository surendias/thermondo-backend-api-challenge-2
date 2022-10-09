const httpStatus = require('http-status');
const { Note } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a note
 * @param {Object} noteBody
 * @returns {Promise<Note>}
 */
const createNote = async (noteBody) => {
  if (await Note.isEmailTaken(noteBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return Note.create(noteBody);
};

/**
 * Query for notes
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryNotes = async (filter, options) => {
  const notes = await Note.paginate(filter, options);
  return notes;
};

/**
 * Get note by id
 * @param {ObjectId} id
 * @returns {Promise<Note>}
 */
const getNoteById = async (id) => {
  return Note.findById(id);
};

/**
 * Get note by email
 * @param {string} email
 * @returns {Promise<Note>}
 */
const getNoteByTags = async (tags) => {
  return Note.findOne({ tags });
};

/**
 * Update note by id
 * @param {ObjectId} noteId
 * @param {Object} updateBody
 * @returns {Promise<Note>}
 */
const updateNoteById = async (noteId, updateBody) => {
  const note = await getNoteById(noteId);
  if (!note) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Note not found');
  }
  if (updateBody.email && (await Note.isEmailTaken(updateBody.email, noteId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(note, updateBody);
  await note.save();
  return note;
};

/**
 * Delete note by id
 * @param {ObjectId} noteId
 * @returns {Promise<Note>}
 */
const deleteNoteById = async (noteId) => {
  const note = await getNoteById(noteId);
  if (!note) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Note not found');
  }
  await note.remove();
  return note;
};

module.exports = {
  createNote,
  queryNotes,
  getNoteById,
  getNoteByTags,
  updateNoteById,
  deleteNoteById,
};
