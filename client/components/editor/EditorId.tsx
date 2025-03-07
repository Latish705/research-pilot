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
  Share2Icon,
} from "lucide-react";
import { BackendUrl } from "@/utils/constants";
import { getCurrentUserToken } from "@/utils/firebase";

export default function EditorId({
  paperId,
  title,
  content,
}: {
  paperId: string;
  title: string;
  content: string;
}) {
  const [chtitle, setTitle] = useState(title); // Track the title
  const [isSaved, setIsSaved] = useState(true); // Track save state
  const [textColor, setTextColor] = useState("#000000");
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [collaboratorEmail, setCollaboratorEmail] = useState("");
  const [collaboratorRole, setCollaboratorRole] = useState("viewer"); // Default role

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Color.configure({ types: ["textStyle"] }),
    ],
    content: content || "<p>Start typing...</p>", // Initialize with content
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      setIsSaved(false); // Mark as unsaved on changes
    },
  });

  const saveContent = async () => {
    if (!editor || !chtitle.trim()) {
      alert("Please provide a title for the research paper.");
      return;
    }

    try {
      const content = editor.getHTML();
      const token = await getCurrentUserToken();
      await axios.put(
        `${BackendUrl}/api/researchPaper/update/${paperId}`,
        {
          id: paperId,
          title: chtitle,
          content,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsSaved(true);
      alert("Content saved successfully!");
    } catch (err) {
      console.error("Failed to save content:", err);
      alert("Failed to save content. Please try again.");
    }
  };

  const handleAddCollaborator = async () => {
    if (!collaboratorEmail.trim()) {
      alert("Please enter a valid email.");
      return;
    }

    try {
      const token = await getCurrentUserToken();
      await axios.post(
        `${BackendUrl}/api/researchPaper/addCollaborator`,
        {
          paperId,
          email: collaboratorEmail,
          role: collaboratorRole, // Send the selected role
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Collaborator added successfully!");
      setCollaboratorEmail("");
      setCollaboratorRole("viewer"); // Reset to default
      setIsShareDialogOpen(false);
    } catch (err) {
      console.error("Failed to add collaborator:", err);
      alert("Failed to add collaborator. Please try again.");
    }
  };

  return (
    <div className="h-5/6 w-full flex flex-col p-6 bg-gray-50 dark:bg-black">
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
          value={chtitle}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the title of your paper"
          className="w-full px-3 py-2 mt-1 text-sm border rounded-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Toolbar */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <Button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={`flex items-center gap-1 px-3 py-2 text-sm font-medium ${
            editor?.isActive("bold")
              ? "bg-blue-500 text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          }`}
        >
          <BoldIcon size={18} />
          Bold
        </Button>
        {/* Other Toolbar Buttons */}
        {/* Toolbar continues */}
      </div>

      {/* Editor Content */}
      <EditorContent
        editor={editor}
        className="flex-1 border p-4 rounded-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
      />

      {/* Actions */}
      <div className="mt-4 flex justify-between">
        {/* Share Button */}
        <Button
          onClick={() => setIsShareDialogOpen(true)}
          className="px-4 py-2 text-sm font-medium text-gray-800 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          <Share2Icon size={18} />
          Share
        </Button>

        {/* Save Button */}
        <Button
          onClick={saveContent}
          className={`px-4 py-2 text-sm font-medium ${
            isSaved
              ? "bg-green-500 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {isSaved ? "Saved" : "Save"}
        </Button>
      </div>

      {/* Share Dialog */}
      {isShareDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-900">
            <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200">
              Add Collaborator
            </h3>
            <input
              type="email"
              placeholder="Enter collaborator's email"
              value={collaboratorEmail}
              onChange={(e) => setCollaboratorEmail(e.target.value)}
              className="w-full px-3 py-2 mb-4 text-sm border rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Role
            </label>
            <select
              id="role"
              value={collaboratorRole}
              onChange={(e) => setCollaboratorRole(e.target.value)}
              className="w-full px-3 py-2 mb-4 text-sm border rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="viewer">Viewer</option>
              <option value="editor">Editor</option>
            </select>
            <div className="flex justify-end gap-2">
              <Button
                onClick={() => setIsShareDialogOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-800 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddCollaborator}
                className="px-4 py-2 text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white"
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
