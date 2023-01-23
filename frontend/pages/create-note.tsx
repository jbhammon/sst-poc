import { API } from "aws-amplify";
import React from "react";

interface Note {
  content: string;
}

export default function CreateNote() {
  function createNote(note: Note) {
    return API.post("notes", "/notes", {
      body: note,
    });
  }
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const note: Note = {
      content: "A new note",
    };

    try {
      await createNote(note);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <>
      <div className="container-mx-auto mt-8 px-8 flex flex-col space-y-4">
        <h1 className="text-2xl">New note 🗒️</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block space-y-1">
            <span className="text-gray-500">Note Content</span>
            <input type="text" id="note-content" className="mt-1 block " />
          </label>
          <button type="submit">Create note</button>
        </form>
      </div>
    </>
  );
}
