import { API } from "aws-amplify";
import React, { useState } from "react";

import Button from "@/components/button";
import { Note } from "@/types";

export default function CreateNote() {
  const [content, setContent] = useState<string>();

  function createNote(note: Note) {
    return API.post("notes", "/notes", {
      body: note,
    });
  }
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await createNote({ content });
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
            <input
              type="text"
              id="note-content"
              className="mt-1 block"
              onChange={(e) => setContent(e.target.value)}
            />
          </label>
          <Button type="submit">Create note</Button>
        </form>
      </div>
    </>
  );
}
