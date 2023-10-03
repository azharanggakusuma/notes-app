/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Header from "./Header.jsx";
import NoteForm from "./NoteForm.jsx";
import NoteList from "./NoteList.jsx";
import ArchiveList from "./ArchiveList.jsx";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Babel",
      body: "Babel merupakan tools open-source yang digunakan untuk mengubah sintaks ECMAScript 2015+ menjadi sintaks yang didukung oleh JavaScript engine versi lama. Babel sering dipakai ketika kita menggunakan sintaks terbaru termasuk sintaks JSX.",
      createdAt: "2022-04-14T04:27:34.572Z",
      archived: false,
    },
    {
      id: 2,
      title: "Functional Component",
      body: "Functional component merupakan React component yang dibuat menggunakan fungsi JavaScript. Agar fungsi JavaScript dapat disebut component ia harus mengembalikan React element dan dipanggil layaknya React component.",
      createdAt: "2022-04-14T04:27:34.572Z",
      archived: false,
    },
    {
      id: 3,
      title: "Modularization",
      body: "Dalam konteks pemrograman JavaScript, modularization merupakan teknik dalam memecah atau menggunakan kode dalam berkas JavaScript secara terpisah berdasarkan tanggung jawabnya masing-masing.",
      createdAt: "2022-04-14T04:27:34.572Z",
      archived: false,
    },
    {
      id: 4,
      title: "Lifecycle",
      body: "Dalam konteks React component, lifecycle merupakan kumpulan method yang menjadi siklus hidup mulai dari component dibuat (constructor), dicetak (render), pasca-cetak (componentDidMount), dan sebagainya. ",
      createdAt: "2022-04-14T04:27:34.572Z",
      archived: false,
    },
    {
      id: 5,
      title: "ESM",
      body: "ESM (ECMAScript Module) merupakan format modularisasi standar JavaScript.",
      createdAt: "2022-04-14T04:27:34.572Z",
      archived: false,
    },
    {
      id: 6,
      title: "Module Bundler",
      body: "Dalam konteks pemrograman JavaScript, module bundler merupakan tools yang digunakan untuk menggabungkan seluruh modul JavaScript yang digunakan oleh aplikasi menjadi satu berkas.",
      createdAt: "2022-04-14T04:27:34.572Z",
      archived: false,
    },
  ]);

  const [newNote, setNewNote] = useState({
    id: "",
    title: "",
    body: "",
    archived: false,
    createdAt: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [alert, setAlert] = useState(null);
  const [alertType, setAlertType] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewNote({
      ...newNote,
      [name]: value,
    });
  };

  const addNote = () => {
    if (newNote.title && newNote.body) {
      const currentDate = new Date();
      const formattedDate = `${currentDate.getDate()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getFullYear()}`;
      setNotes([
        ...notes,
        { ...newNote, id: +new Date(), createdAt: formattedDate },
      ]);
      setNewNote({
        id: "",
        title: "",
        body: "",
        archived: false,
        createdAt: "",
      });
      showAlert("Catatan berhasil ditambahkan.", "success");
    }
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    showAlert("Catatan berhasil dihapus.", "danger");
  };

  const toggleArchive = (id) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          archived: !note.archived,
        };
      }
      return note;
    });
    setNotes(updatedNotes);

    if (!notes.find((note) => note.id === id).archived) {
      showAlert("Catatan berhasil diarsipkan.", "info");
    } else {
      showAlert("Catatan berhasil diunarsipkan.", "info");
    }
  };

  const unarchivedNotes = notes.filter(
    (note) =>
      !note.archived &&
      note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const archivedNotes = notes.filter((note) => note.archived);

  const showAlert = (message, type) => {
    setAlert(message);
    setAlertType(type);

    setTimeout(() => {
      setAlert(null);
      setAlertType(null);
    }, 3000);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <Header />
      <NoteForm
        newNote={newNote}
        handleInputChange={handleInputChange}
        addNote={addNote}
      />
      <input
        type="text"
        placeholder="Cari catatan..."
        className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-indigo-600"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <NoteList
        unarchivedNotes={unarchivedNotes}
        toggleArchive={toggleArchive}
        deleteNote={deleteNote}
      />
      <ArchiveList
        archivedNotes={archivedNotes}
        toggleArchive={toggleArchive}
        deleteNote={deleteNote}
      />
      <AnimatePresence>
        {alert && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className={`fixed top-0 right-0 m-4 p-4 rounded-md shadow-md ${
              alertType === "success"
                ? "bg-green-500 text-white"
                : alertType === "info"
                ? "bg-blue-500 text-white"
                : alertType === "danger"
                ? "bg-red-500 text-white"
                : ""
            }`}
          >
            {alert}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
