"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
} from "lucide-react";

export default function Editor() {
  const [fontSize, setFontSize] = useState("16px");

  // Initialize Y.js document and WebSocket provider
  const ydoc = new Y.Doc();
  const provider = new WebsocketProvider(
    "wss://demos.yjs.dev",
    "google-docs-clone",
    ydoc
  );

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Collaboration.configure({ document: ydoc }),
      CollaborationCursor.configure({
        provider,
        user: { name: "User", color: "#ff5733" },
      }),
    ],
    content: "<p>Start collaborating!</p>", // Initial content
  });

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      provider.destroy();
      ydoc.destroy();
    };
  }, [provider, ydoc]);

  // Handle font size change
  const setEditorFontSize = (size: string) => {
    if (editor) {
      editor
        .chain()
        .focus()
        .updateAttributes("textStyle", { fontSize: size })
        .run();
      setFontSize(size);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 p-4 border border-blue-500 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-2">Collaborative Editor</h2>
      <div className="flex gap-2 mb-2">
        <Button
          disabled={!editor}
          onClick={() => editor?.chain().focus().toggleBold().run()}
        >
          <BoldIcon size={16} />
        </Button>
        <Button
          disabled={!editor}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        >
          <ItalicIcon size={16} />
        </Button>
        <Button
          disabled={!editor}
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon size={16} />
        </Button>
        <Button
          disabled={!editor}
          onClick={() => editor?.chain().focus().setTextAlign("left").run()}
        >
          <AlignLeftIcon size={16} />
        </Button>
        <Button
          disabled={!editor}
          onClick={() => editor?.chain().focus().setTextAlign("center").run()}
        >
          <AlignCenterIcon size={16} />
        </Button>
        <Button
          disabled={!editor}
          onClick={() => editor?.chain().focus().setTextAlign("right").run()}
        >
          <AlignRightIcon size={16} />
        </Button>
        <select
          value={fontSize}
          onChange={(e) => setEditorFontSize(e.target.value)}
          className="border p-1 rounded"
        >
          <option value="12px">12px</option>
          <option value="16px">16px</option>
          <option value="20px">20px</option>
          <option value="24px">24px</option>
          <option value="32px">32px</option>
        </select>
      </div>
      <EditorContent
        editor={editor}
        className="border p-2 min-h-[500px] bg-white"
      />
    </div>
  );
}
