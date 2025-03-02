"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import Color from "@tiptap/extension-color";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
} from "lucide-react";
import { BackendUrl } from "@/utils/constants";
import { useParams } from "next/navigation";

// Global Yjs document for collaboration
const globalYdoc = new Y.Doc();

export default function Editor() {
  const { id: paperId } = useParams();
  const [textColor, setTextColor] = useState("#000000");
  const [loading, setLoading] = useState(true);

  // Initialize WebSocket Provider
  const provider = new WebsocketProvider(
    process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:1234",
    //@ts-ignore
    paperId || "default-doc",
    globalYdoc
  );

  provider.on("status", (event) => {
    console.log("WebSocket Status:", event.status);
  });

  // Initialize TipTap Editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Color.configure({ types: ["textStyle"] }),
      Collaboration.configure({ document: globalYdoc }),
      CollaborationCursor.configure({
        provider,
        user: { name: "User", color: "#ff5733" },
      }),
    ],
    content: "<p>Loading document...</p>",
  });

  // Fetch document content on mount
  useEffect(() => {
    if (!paperId || !editor) return;

    const fetchPaper = async () => {
      try {
        const { data } = await axios.get(
          `${BackendUrl}/api/researchpaper/${paperId}`
        );
        editor.commands.setContent(data.content || "<p>Start typing...</p>");
      } catch (error) {
        console.error("Error fetching document:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaper();
  }, [editor, paperId]);

  // Autosave content (debounced)
  const saveDocument = useCallback(
    async (content: string) => {
      try {
        await axios.post(`${BackendUrl}/api/researchpaper/save`, {
          paperId,
          title: "Sample Research Paper", // Replace dynamically
          content,
        });
        console.log("Document saved!");
      } catch (error) {
        console.error("Error saving document:", error);
      }
    },
    [paperId]
  );

  useEffect(() => {
    if (!editor) return;

    const debouncedSave = setTimeout(() => {
      const content = editor.getHTML();
      saveDocument(content);
    }, 3000); // Save 3 seconds after typing stops

    return () => clearTimeout(debouncedSave);
  }, [editor, saveDocument]);

  // Change text color
  const setEditorTextColor = (color: string) => {
    if (editor) {
      editor.chain().focus().setColor(color).run();
      setTextColor(color);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 p-4 border border-blue-500 rounded-lg shadow-lg dark:border-gray-600">
      <h2 className="text-xl font-bold mb-2 dark:text-gray-100">
        Collaborative Editor
      </h2>
      <div className="flex gap-2 mb-2">
        <Button onClick={() => editor?.chain().focus().toggleBold().run()}>
          <BoldIcon size={16} />
        </Button>
        <Button onClick={() => editor?.chain().focus().toggleItalic().run()}>
          <ItalicIcon size={16} />
        </Button>
        <Button onClick={() => editor?.chain().focus().toggleUnderline().run()}>
          <UnderlineIcon size={16} />
        </Button>
        <Button
          onClick={() => editor?.chain().focus().setTextAlign("left").run()}
        >
          <AlignLeftIcon size={16} />
        </Button>
        <Button
          onClick={() => editor?.chain().focus().setTextAlign("center").run()}
        >
          <AlignCenterIcon size={16} />
        </Button>
        <Button
          onClick={() => editor?.chain().focus().setTextAlign("right").run()}
        >
          <AlignRightIcon size={16} />
        </Button>
        <input
          type="color"
          value={textColor}
          onChange={(e) => setEditorTextColor(e.target.value)}
          className="border p-1 rounded dark:bg-gray-700 dark:border-gray-500"
        />
      </div>
      <EditorContent
        editor={editor}
        className="border p-2 min-h-[500px] bg-white dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
      />
    </div>
  );
}
