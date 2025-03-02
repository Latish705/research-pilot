"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Color from "@tiptap/extension-color";
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

// ✅ Connect to FastAPI WebSocket
const socket = new WebSocket("ws://localhost:8090");

export default function Editor() {
    const [textColor, setTextColor] = useState("#000000");

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

    return (
        <div className="w-full max-w-4xl mx-auto mt-10 p-4 border border-blue-500 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-2">Custom WebSocket Collaboration</h2>
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
                <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="border p-1 rounded"
                />
            </div>
            <EditorContent editor={editor} className="border p-2 min-h-[500px] bg-white" />
        </div>
    );
}
