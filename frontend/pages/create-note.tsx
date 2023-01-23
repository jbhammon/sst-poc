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
      <h1>New note</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="note-content">Content</label>
        <input type="text" id="note-content" />
        <button type="submit">Create note</button>
      </form>
    </>
  );
}
