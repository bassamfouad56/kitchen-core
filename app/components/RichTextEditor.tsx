"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Placeholder from "@tiptap/extension-placeholder";
import { useCallback } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
  label?: string;
  helperText?: string;
  disabled?: boolean;
  minHeight?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Start typing...",
  className = "",
  label,
  helperText,
  disabled = false,
  minHeight = "200px",
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
      TextStyle,
      Color,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value,
    editable: !disabled,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: `prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none max-w-none`,
        style: `min-height: ${minHeight}`,
      },
    },
  });

  const setLink = useCallback(() => {
    if (!editor) return;

    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) return;

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    if (!editor) return;

    const url = window.prompt("Image URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) return null;

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {helperText && <p className="text-sm text-gray-500">{helperText}</p>}

      {/* Toolbar */}
      <div className="border border-gray-300 rounded-t-lg bg-gray-50 p-2 flex flex-wrap gap-1">
        {/* Text Formatting */}
        <div className="flex gap-1 border-r border-gray-300 pr-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={disabled}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive("bold") ? "bg-gray-300" : ""
            } disabled:opacity-50`}
            title="Bold (Ctrl+B)"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M6 12h8a4 4 0 010 8H6V4h7a4 4 0 010 8"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={disabled}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive("italic") ? "bg-gray-300" : ""
            } disabled:opacity-50`}
            title="Italic (Ctrl+I)"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <line x1="19" y1="4" x2="10" y2="4" />
              <line x1="14" y1="20" x2="5" y2="20" />
              <line x1="15" y1="4" x2="9" y2="20" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={disabled}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive("underline") ? "bg-gray-300" : ""
            } disabled:opacity-50`}
            title="Underline (Ctrl+U)"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 5v8a5 5 0 0010 0V5M5 19h14"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={disabled}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive("strike") ? "bg-gray-300" : ""
            } disabled:opacity-50`}
            title="Strikethrough"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <line x1="4" y1="12" x2="20" y2="12" strokeWidth={2} />
              <path d="M7 5h10M9 16h6" strokeWidth={2} />
            </svg>
          </button>
        </div>

        {/* Headings */}
        <div className="flex gap-1 border-r border-gray-300 pr-2">
          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            disabled={disabled}
            className={`px-2 py-1 rounded hover:bg-gray-200 transition-colors text-sm font-bold ${
              editor.isActive("heading", { level: 1 }) ? "bg-gray-300" : ""
            } disabled:opacity-50`}
            title="Heading 1"
          >
            H1
          </button>

          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            disabled={disabled}
            className={`px-2 py-1 rounded hover:bg-gray-200 transition-colors text-sm font-bold ${
              editor.isActive("heading", { level: 2 }) ? "bg-gray-300" : ""
            } disabled:opacity-50`}
            title="Heading 2"
          >
            H2
          </button>

          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            disabled={disabled}
            className={`px-2 py-1 rounded hover:bg-gray-200 transition-colors text-sm font-bold ${
              editor.isActive("heading", { level: 3 }) ? "bg-gray-300" : ""
            } disabled:opacity-50`}
            title="Heading 3"
          >
            H3
          </button>
        </div>

        {/* Lists */}
        <div className="flex gap-1 border-r border-gray-300 pr-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            disabled={disabled}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive("bulletList") ? "bg-gray-300" : ""
            } disabled:opacity-50`}
            title="Bullet List"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <line x1="9" y1="6" x2="20" y2="6" strokeWidth={2} />
              <line x1="9" y1="12" x2="20" y2="12" strokeWidth={2} />
              <line x1="9" y1="18" x2="20" y2="18" strokeWidth={2} />
              <circle cx="5" cy="6" r="1" fill="currentColor" />
              <circle cx="5" cy="12" r="1" fill="currentColor" />
              <circle cx="5" cy="18" r="1" fill="currentColor" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            disabled={disabled}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive("orderedList") ? "bg-gray-300" : ""
            } disabled:opacity-50`}
            title="Numbered List"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <line x1="10" y1="6" x2="21" y2="6" strokeWidth={2} />
              <line x1="10" y1="12" x2="21" y2="12" strokeWidth={2} />
              <line x1="10" y1="18" x2="21" y2="18" strokeWidth={2} />
              <text x="3" y="9" fontSize="10" fill="currentColor">
                1
              </text>
              <text x="3" y="15" fontSize="10" fill="currentColor">
                2
              </text>
              <text x="3" y="21" fontSize="10" fill="currentColor">
                3
              </text>
            </svg>
          </button>
        </div>

        {/* Alignment */}
        <div className="flex gap-1 border-r border-gray-300 pr-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            disabled={disabled}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive({ textAlign: "left" }) ? "bg-gray-300" : ""
            } disabled:opacity-50`}
            title="Align Left"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <line x1="3" y1="6" x2="21" y2="6" strokeWidth={2} />
              <line x1="3" y1="12" x2="15" y2="12" strokeWidth={2} />
              <line x1="3" y1="18" x2="18" y2="18" strokeWidth={2} />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            disabled={disabled}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive({ textAlign: "center" }) ? "bg-gray-300" : ""
            } disabled:opacity-50`}
            title="Align Center"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <line x1="3" y1="6" x2="21" y2="6" strokeWidth={2} />
              <line x1="6" y1="12" x2="18" y2="12" strokeWidth={2} />
              <line x1="5" y1="18" x2="19" y2="18" strokeWidth={2} />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            disabled={disabled}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive({ textAlign: "right" }) ? "bg-gray-300" : ""
            } disabled:opacity-50`}
            title="Align Right"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <line x1="3" y1="6" x2="21" y2="6" strokeWidth={2} />
              <line x1="9" y1="12" x2="21" y2="12" strokeWidth={2} />
              <line x1="6" y1="18" x2="21" y2="18" strokeWidth={2} />
            </svg>
          </button>
        </div>

        {/* Link & Image */}
        <div className="flex gap-1 border-r border-gray-300 pr-2">
          <button
            type="button"
            onClick={setLink}
            disabled={disabled}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive("link") ? "bg-gray-300" : ""
            } disabled:opacity-50`}
            title="Insert Link"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={addImage}
            disabled={disabled}
            className="p-2 rounded hover:bg-gray-200 transition-colors disabled:opacity-50"
            title="Insert Image"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </button>
        </div>

        {/* Undo/Redo */}
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={disabled || !editor.can().undo()}
            className="p-2 rounded hover:bg-gray-200 transition-colors disabled:opacity-50"
            title="Undo (Ctrl+Z)"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={disabled || !editor.can().redo()}
            className="p-2 rounded hover:bg-gray-200 transition-colors disabled:opacity-50"
            title="Redo (Ctrl+Y)"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 10H11a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="border border-t-0 border-gray-300 rounded-b-lg p-4 bg-white prose max-w-none">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
