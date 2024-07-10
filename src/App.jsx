import { useState } from "react";

function AppNote() {
  // ------------get data are array
  const startNote = {
    content: "",
    author: "",
  };
  const [note, setNote] = useState(startNote);
  function onNoteValueChange(event) {
    const { name, value } = event.target; //name,value from event ที่ดึงมาจากข้างล่าง > set ค่าใหม่แต่ไม่ได้เก็บค่าเก่าไว้ก่อนจะพิมพ์ตัวต่อไป
    console.log(name, value);
    setNote((prevNote) => {
      return {
        // return ค่าใหม่กลับไป
        ...prevNote,
        [name]: value,
      };
    });
  }

  //   ----------------Add Note
  const [allNotes, setAllNotes] = useState([]);
  function onNoteSubmit(event) {
    event.preventDefault();
    setAllNotes((prevAllNotes) => {
      const newNote = { ...note };
      newNote.id = Date.now().toString();
      return [newNote, ...prevAllNotes]; //array ใหม่ต่อเก่า
    });

    setNote(startNote);
  }
  const noteELements = allNotes.map((theNote) => {
    return (
      <div
        key={theNote.id}
        className=" rounded-sm w-full mb-2 p-2 pb-2 py-4 bg-white bg-opacity-60"
      >
        <p className="mb-3">{theNote.content}</p>
        <h5>{theNote.author}</h5>
        <div className="right-2 bottom-2 flex justify-end">
          <a
            href="#"
            className="border-2 border-blue-400 text-blue-400 px-2 rounded-sm hover:opacity-80 hover:text-white hover:bg-blue-700 hover:border-blue-700 transition duration-300 mr-1 text-xs"
            onClick={() => {
              setEditNote(theNote);
            }}
          >
            Edit
          </a>
          <a
            href="#"
            className="border-2 border-red-400 text-red-400 px-2 rounded-sm hover:opacity-80 hover:text-white hover:bg-red-700 hover:border-red-700 transition duration-300 text-xs"
            onClick={() => {
              onNoteDelete(theNote.id);
            }}
          >
            Delete
          </a>
        </div>
      </div>
    );
  });

  // --------------------Delete Note
  function onNoteDelete(noteId) {
    setAllNotes((prevAllNotes) => {
      //prevAllNotes = allNote
      return prevAllNotes.filter((theNote) => theNote.id !== noteId); //กรองอันที่ไม่ตรงแล้ว return เฉพาะอันที่ไม่ตรงออกไป
    });
  }

  // --------------------Edit Note
  const [editNote, setEditNote] = useState(null);
  let formEditNote = null;
  if (editNote) {
    formEditNote = (
      <div className="bg-black w-screen h-screen z-50 top-0 fixed bg-opacity-50 flex items-center">
        <form
          action=""
          className="flex flex-col items-center w-11/12 md:w-2/6 mx-auto"
          onSubmit={onEditNoteSubmit}
          noValidate
        >
          <textarea
            rows="3"
            placeholder="enter your story"
            name="content"
            onChange={onEditNoteValueChange}
            value={editNote.content}
            className="border-2 border-gray-500 container w-full mx-auto px-2 my-4 h-40 md:h-auto"
            required
          />
          <input
            type="text"
            placeholder="enter additional note"
            name="author"
            onChange={onEditNoteValueChange}
            value={editNote.author}
            className="border-2 border-gray-500 container w-full mx-auto px-2 h-10 md:h-auto"
            required
          />
          <div className="self-end">
            <button
              className="self-end pb-1 my-3 mb-5 h-8 bg-red-400 text-white rounded-md  hover:bg-red-800 transition duration-300 mr-2 px-3"
              onClick={closeFormEditNote}
            >
              Cancle
            </button>
            <button
              type="submit"
              className="self-end pb-1 my-3 mb-5 h-8 bg-blue-400 text-white rounded-md  hover:bg-blue-800 transition duration-300 px-3"
            >
              Edit
            </button>
          </div>
        </form>
      </div>
    );
  }
  // type form editNote
  function onEditNoteValueChange(event) {
    const { name, value } = event.target; //name,value from event ที่ดึงมาจากข้างล่าง > set ค่าใหม่แต่ไม่ได้เก็บค่าเก่าไว้ก่อนจะพิมพ์ตัวต่อไป
    setEditNote((prevNote) => {
      return {
        // return ค่าใหม่กลับไป
        ...prevNote,
        [name]: value,
      };
    });
  }
  // function edit note
  function onEditNoteSubmit(event) {
    event.preventDefault();

    //setAllNotes = add each note
    setAllNotes((prevAllNotes) => {
      return prevAllNotes.map((theNote) => {
        if (theNote.id !== editNote.id) return theNote;
        return editNote;
      });
    });

    //close popup form edit note
    setEditNote(null);
  }
  function closeFormEditNote(event) {
    event.preventDefault();
    setEditNote(null);
  }

  // ------------------------App
  return (
    <div className="flex flex-col items-center w-full pt-14 min-h-screen bg-gradient-to-r from-green-400 via-blue-300 to-pink-400">
      <h3 className="text-2xl md:text-3xl font-bold text-white underline">
        Note Your Story Here
      </h3>
      <form
        action=""
        onSubmit={onNoteSubmit}
        className="flex flex-col items-center w-11/12 md:w-3/6"
      >
        <textarea
          rows="6"
          placeholder="enter your story"
          name="content"
          value={note.content}
          onChange={onNoteValueChange}
          className="border-2 border-gray-500 container w-full mx-auto px-2 my-4 h-40 md:h-auto"
          required
        />
        <input
          type="text"
          placeholder="enter additional note"
          name="author"
          value={note.author}
          onChange={onNoteValueChange}
          className="border-2 border-gray-500 container w-full mx-auto px-2 h-10 md:h-auto"
        />
        <button
          type="submit"
          className="self-end pb-1 my-3 mb-5 h-8 bg-green-400 text-black rounded-md w-4/12 md:w-2/12 hover:bg-green-600 hover:text-white transition duration-300"
        >
          post
        </button>
      </form>

      <div className="flex flex-col items-center w-11/12 md:w-3/6">
        {noteELements}
      </div>
      {formEditNote}
    </div>
  );
}
export default AppNote;
