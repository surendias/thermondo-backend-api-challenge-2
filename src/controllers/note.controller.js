const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { noteService } = require('../services');

const createNote = catchAsync(async (req, res) => {
  const user = await noteService.createNote(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getNotes = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['tags']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await noteService.queryNotes(filter, options);
  res.send(result);
});

const getNote = catchAsync(async (req, res) => {
  const note = await noteService.getNoteById(req.params.noteId);
  if (!note) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Note not found');
  }
  res.send(note);
});

const updateNote = catchAsync(async (req, res) => {
  const user = await noteService.updateNoteById(req.params.userId, req.body);
  res.send(user);
});

const deleteNote = catchAsync(async (req, res) => {
  await noteService.deleteNoteById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
};
