/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

function NoteForm({ newNote, handleInputChange, addNote }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-5">
        Tambah Catatan Baru
      </h2>
      <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Judul"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-600"
          value={newNote.title}
          onChange={handleInputChange}
          maxLength={50}
        />
        <textarea
          name="body"
          placeholder="Isi Catatan"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-600"
          value={newNote.body}
          onChange={handleInputChange}
        />
        <div className="flex justify-between items-center">
          <p className="text-gray-500">{newNote.title.length} / 50 karakter</p>
          <button
            onClick={addNote}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
          >
            Tambahkan Catatan
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteForm;
