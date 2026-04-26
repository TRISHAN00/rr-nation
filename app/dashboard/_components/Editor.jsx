"use client";

import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useEffect } from "react";

export default function Editor({ initialContent, onChange, editable = true }) {
  const editor = useCreateBlockNote();

  useEffect(() => {
    async function loadInitial() {
      if (initialContent && editor) {
        try {
          const blocks = await editor.tryParseHTMLToBlocks(initialContent);
          editor.replaceBlocks(editor.document, blocks);
        } catch (error) {
          console.error("Failed to parse initial HTML:", error);
        }
      }
    }
    loadInitial();
  }, [editor]);

  const handleChange = async () => {
    if (onChange && editor) {
      const html = await editor.blocksToHTMLLossy(editor.document);
      onChange(html === "<p></p>" ? "" : html);
    }
  };

  return (
    <div className="border rounded-md bg-background overflow-hidden shadow-sm">
      <BlockNoteView
        editor={editor}
        onChange={handleChange}
        editable={editable}
        theme="dark"
      />
    </div>
  );
}