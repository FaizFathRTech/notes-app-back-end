const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };

  notes.push(newNote);
  const isSucces = notes.filter((note) => note.id === id).length > 0;

  if (isSucces) {
    const response = h.response({
      status: 'success',
      message: 'Note successfully added',
      data: {
        nodeId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'note fail added',
  });
  response.code(500);
  return response;
};

const getAllNotes = () => ({
  message: 'success',
  data: {
    notes,
  },

});

const getNoteByIDHandler = (request, h) => {
  const { id } = request.params;
  const note = notes.filter((nodeId) => nodeId.id === id)[0];

  if (note !== undefined) {
    return {
      message: 'success',
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'note doesnt exist',
  });

  response.code(404);
  return response;
};

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
    const response = h.response({
      status: 'succes',
      message: 'Note Succesfully Updated',
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'failed updated note',
  });
  response.code(404);
  return response;
};

const deleteNote = (request, h) => {
  const { id } = request.params;
  const index = notes.findIndex((noteIndex) => noteIndex.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'succes',
      message: 'Success delete note',
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'failed delete note',
  });
  response.code(404);
  return response;
};
module.exports = {
  addNoteHandler,
  getAllNotes,
  getNoteByIDHandler,
  editNoteByIdHandler,
  deleteNote,
};
