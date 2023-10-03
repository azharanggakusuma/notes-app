/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

function ArchiveList({ archivedNotes, toggleArchive, deleteNote }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-5">Arsip</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {archivedNotes.length === 0 ? (
          <p>Tidak ada catatan diarsipkan.</p>
        ) : (
          archivedNotes.map((note) => (
            <div
              key={note.id}
              className="bg-gray-200 p-4 rounded-lg shadow-md space-y-2"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {note.title}
              </h2>
              <p className="text-gray-700">{note.body}</p>
              <p className="text-sm text-gray-500">
                Dibuat pada: {note.createdAt}
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => toggleArchive(note.id)}
                  className={`px-3 py-2 ${
                    note.archived
                      ? "bg-gray-400 text-gray-800"
                      : "bg-blue-500 text-white"
                  } rounded-lg hover:bg-blue-600 hover:text-white focus:outline-none focus:bg-blue-600`}
                >
                  {note.archived ? "Buka Arsip" : "Arsipkan"}
                </button>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:bg-red-600"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ArchiveList;
