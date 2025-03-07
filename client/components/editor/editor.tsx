"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Color from "@tiptap/extension-color";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
} from "lucide-react";
import { BackendUrl } from "@/utils/constants";
import { getCurrentUserToken } from "@/utils/firebase";

// ✅ Connect to FastAPI WebSocket
const socket = new WebSocket("ws://localhost:8090");

export default function Editor() {
  const [title, setTitle] = useState(""); // Track the title
  const [textColor, setTextColor] = useState("#000000");
  const [isSaved, setIsSaved] = useState(false); // Track save state

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Color.configure({ types: ["textStyle"] }),
    ],
    content: "<p>Start typing...</p>",
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      socket.send(content);
      setIsSaved(false); // Mark content as unsaved on changes
    },
  });

  // ✅ Receive updates from WebSocket
  useEffect(() => {
    socket.onmessage = (event) => {
      if (editor) {
        editor.commands.setContent(event.data);
      }
    };
  }, [editor]);

  // Save content to backend
  const saveContent = async () => {
    if (!editor || !title.trim()) {
      alert("Please provide a title for the research paper.");
      return;
    }

    try {
      const content = editor.getHTML();
      const token = await getCurrentUserToken();
      await axios.post(
        `${BackendUrl}/api/researchPaper/save`,
        {
          title,
          content,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsSaved(true); // Mark content as saved
      alert("Content saved successfully!");
    } catch (err) {
      console.error("Failed to save content:", err);
      alert("Failed to save content. Please try again.");
    }
  };

  // Prompt user on exit if there are unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isSaved) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isSaved]);

  return (
    <div className="h-5/6 w-full flex flex-col p-6 bg-black dark:bg-black dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
        Collaborative Editor
      </h2>

      {/* Title Input */}
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Paper Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the title of your paper"
          className="w-full px-3 py-2 mt-1 text-sm border rounded-lg bg-white dark:bg-black dark:text-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Toolbar */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <Button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className="flex items-center gap-1 px-3 py-2 text-sm font-medium bg-gray-100 dark:text-white dark:bg-black border border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          <BoldIcon size={18} />
          Bold
        </Button>
        <Button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className="flex items-center gap-1 px-3 py-2 text-sm font-medium bg-gray-100 dark:text-white dark:bg-black border border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          <ItalicIcon size={18} />
          Italic
        </Button>
        <Button
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          className="flex items-center gap-1 px-3 py-2 text-sm font-medium bg-gray-100 dark:text-white dark:bg-black border border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          <UnderlineIcon size={18} />
          Underline
        </Button>
        <Button
          onClick={() => editor?.chain().focus().setTextAlign("left").run()}
          className="flex items-center gap-1 px-3 py-2 text-sm font-medium bg-gray-100 dark:text-white dark:bg-black border border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          <AlignLeftIcon size={18} />
          Left
        </Button>
        <Button
          onClick={() => editor?.chain().focus().setTextAlign("center").run()}
          className="flex items-center gap-1 px-3 py-2 text-sm font-medium bg-gray-100 dark:text-white dark:bg-black border border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          <AlignCenterIcon size={18} />
          Center
        </Button>
        <Button
          onClick={() => editor?.chain().focus().setTextAlign("right").run()}
          className="flex items-center gap-1 px-3 py-2 text-sm font-medium bg-gray-100 dark:text-white dark:bg-black border border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          <AlignRightIcon size={18} />
          Right
        </Button>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium  text-gray-600 dark:text-gray-200">
            Text Color:
          </label>
          <input
            type="color"
            value={textColor}
            onChange={(e) => {
              setTextColor(e.target.value);
              editor?.chain().focus().setColor(e.target.value).run();
            }}
            className="w-10 h-10 p-1 rounded-full border-none cursor-pointer bg-transparent"
          />
        </div>
      </div>

      {/* Editor Content */}
      <EditorContent
        editor={editor}
        className="flex-1 border p-4 rounded-lg bg-white dark:bg-black dark:text-gray-200 dark:border-gray-700"
      />

      {/* Save Button */}
      <div className="mt-4 flex justify-end">
        <Button
          onClick={saveContent}
          className="px-4 py-2 text-sm font-medium text-black bg-white "
        >
          Save
        </Button>
      </div>
    </div>
  );
}
