const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = { id, title, tags, body, createdAt, updatedAt };
  notes.push(newNote);
  const isSuccess = notes.filter((note) => note.id === id).length > 0;
  if (!isSuccess) {
    return h.response({
      status: 'fail',
      message: 'Failed to add a note'
    }).code(500);
  }

  return h.response({
    status: 'success',
    message: 'Successfully added a note',
    data: {
      noteId: id,
    }
  }).code(201);
};

const getAllNotesHandler = (request, h) => {
  return h.response({
    status: 'success',
    data: {
      notes,
    },
  }).code(200);
};

const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const note = notes.find((note) => note.id === id);
  if (note === undefined) {
    return h.response({
      status: 'fail',
      message: 'note is not found'
    }).code(404);
  }
  return h.response({
    status: 'success',
    data: {
      note,
    }
  }).code(200);
};

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();
  const index = notes.findIndex((note) => note.id === id);
  if (index < 0) {
    return h.response({
      status: 'fail',
      message: 'note is not found'
    }).code(404);
  }

  notes[index] = {
    ...notes[index],
    title,
    tags,
    body,
    updatedAt,
  };

  const response = h.response({
    status: 'success',
    message: 'Catatan berhasil diperbarui',
  });
  response.code(200);
  return response;

};

module.exports = { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler };