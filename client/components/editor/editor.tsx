// "use client";

// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import TextStyle from "@tiptap/extension-text-style";
// import Underline from "@tiptap/extension-underline";
// import TextAlign from "@tiptap/extension-text-align";
// import Collaboration from "@tiptap/extension-collaboration";
// import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
// import Color from "@tiptap/extension-color";
// import * as Y from "yjs";
// import { WebsocketProvider } from "y-websocket";
// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   BoldIcon,
//   ItalicIcon,
//   UnderlineIcon,
//   AlignLeftIcon,
//   AlignCenterIcon,
//   AlignRightIcon,
// } from "lucide-react";

// // ✅ Use a global Yjs document to prevent separate instances
// const globalYdoc = new Y.Doc();

// export default function Editor() {
//     const [fontSize, setFontSize] = useState("16px");
//     const [textColor, setTextColor] = useState("#000000");

//     const provider = new WebsocketProvider("ws://localhost:1234", "google-docs-clone", globalYdoc);
    
//     provider.on("status", (event) => {
//         console.log("WebSocket Status:", event.status);
//     });

//     const editor = useEditor({
//         extensions: [
//             StarterKit,
//             TextStyle,
//             Underline,
//             TextAlign.configure({ types: ["heading", "paragraph"] }),
//             Color.configure({ types: ["textStyle"] }),
//             Collaboration.configure({ document: globalYdoc }),
//             CollaborationCursor.configure({ provider, user: { name: "User", color: "#ff5733" } })
//         ],
//         content: "<p style='color: black;'>Start typing...</p>",
//     });

//     useEffect(() => {
//         return () => {
//             provider.destroy();
//             globalYdoc.destroy();
//         };
//     }, []);

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       provider.destroy();
//       globalYdoc.destroy();
//     };
//   }, [provider, globalYdoc]);

//     const setEditorTextColor = (color: string) => {
//         if (editor) {
//             editor.chain().focus().setColor(color).run();
//             setTextColor(color);
//         }
//     };

//     function setEditorFontSize(value: string): void {
//         throw new Error("Function not implemented.");
//     }

//     return (
//         <div className="w-full max-w-4xl mx-auto mt-10 p-4 border border-blue-500 rounded-lg shadow-lg">
//             <h2 className="text-xl font-bold mb-2">Collaborative Editor</h2>
//             <div className="flex gap-2 mb-2">
//                 <Button onClick={() => editor?.chain().focus().toggleBold().run()}>
//                     <BoldIcon size={16} />
//                 </Button>
//                 <Button onClick={() => editor?.chain().focus().toggleItalic().run()}>
//                     <ItalicIcon size={16} />
//                 </Button>
//                 <Button onClick={() => editor?.chain().focus().toggleUnderline().run()}>
//                     <UnderlineIcon size={16} />
//                 </Button>
//                 <Button onClick={() => editor?.chain().focus().setTextAlign("left").run()}>
//                     <AlignLeftIcon size={16} />
//                 </Button>
//                 <Button onClick={() => editor?.chain().focus().setTextAlign("center").run()}>
//                     <AlignCenterIcon size={16} />
//                 </Button>
//                 <Button onClick={() => editor?.chain().focus().setTextAlign("right").run()}>
//                     <AlignRightIcon size={16} />
//                 </Button>
//                 <select
//                     value={fontSize}
//                     onChange={(e) => setEditorFontSize(e.target.value)}
//                     className="border p-1 rounded"
//                 >
//                     <option value="12px">12px</option>
//                     <option value="16px">16px</option>
//                     <option value="20px">20px</option>
//                     <option value="24px">24px</option>
//                     <option value="32px">32px</option>
//                 </select>
//                 <input
//                     type="color"
//                     value={textColor}
//                     onChange={(e) => setEditorTextColor(e.target.value)}
//                     className="border p-1 rounded"
//                 />
//             </div>
//             <EditorContent editor={editor} className="border p-2 min-h-[500px] bg-white" />
//         </div>
//     );
// }

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
import { useEffect, useState } from "react";
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

// ✅ Global Yjs document for collaboration
const globalYdoc = new Y.Doc();

const paperId = "12345"; // Replace this with a dynamic ID

export default function Editor() {
    const [fontSize, setFontSize] = useState("16px");
    const [textColor, setTextColor] = useState("#000000");
    const [loading, setLoading] = useState(true);

    // ✅ WebSocket for real-time collaboration
    const provider = new WebsocketProvider("ws://localhost:1234", "google-docs-clone", globalYdoc);
    
    provider.on("status", (event) => {
        console.log("WebSocket Status:", event.status);
    });

    // ✅ Editor instance with collaboration + API support
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextStyle,
            Underline,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            Color.configure({ types: ["textStyle"] }),
            Collaboration.configure({ document: globalYdoc }),
            CollaborationCursor.configure({ provider, user: { name: "User", color: "#ff5733" } }),
        ],
        content: "<p style='color: black;'>Loading document...</p>",
    });

    // ✅ Fetch document from API on mount
    useEffect(() => {
        const fetchPaper = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8080/api/researchpaper/${paperId}`);
                editor?.commands.setContent(data.content || "<p>Start typing...</p>");
            } catch (error) {
                console.error("Error fetching document:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPaper();
    }, [editor]);

    // ✅ Autosave feature (debounce saves after typing)
    useEffect(() => {
        if (!editor) return;

        const saveDocument = async () => {
            try {
                const content = editor.getHTML();
                await axios.post("http://localhost:8080/api/researchpaper/save", {
                    paperId,
                    title: "Sample Research Paper", // Replace dynamically
                    content,
                });
                console.log("Document autosaved!");
            } catch (error) {
                console.error("Error saving document:", error);
            }
        };

        const interval = setInterval(saveDocument, 5000); // Autosave every 5s
        return () => clearInterval(interval);
    }, [editor]);

    const setEditorTextColor = (color: string) => {
        if (editor) {
            editor.chain().focus().setColor(color).run();
            setTextColor(color);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto mt-10 p-4 border border-blue-500 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-2">Collaborative Editor</h2>
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
                <Button onClick={() => editor?.chain().focus().setTextAlign("left").run()}>
                    <AlignLeftIcon size={16} />
                </Button>
                <Button onClick={() => editor?.chain().focus().setTextAlign("center").run()}>
                    <AlignCenterIcon size={16} />
                </Button>
                <Button onClick={() => editor?.chain().focus().setTextAlign("right").run()}>
                    <AlignRightIcon size={16} />
                </Button>
                <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setEditorTextColor(e.target.value)}
                    className="border p-1 rounded"
                />
            </div>
            <EditorContent editor={editor} className="border p-2 min-h-[500px] bg-white" />
        </div>
    );
}
