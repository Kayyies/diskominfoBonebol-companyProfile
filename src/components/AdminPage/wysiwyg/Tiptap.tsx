import React, { useState } from "react";
import { useEditor, EditorContent, isActive } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Blockquote from "@tiptap/extension-blockquote";
import Image from "@tiptap/extension-image";

//icons
import {
  RiArrowDownSLine,
  RiTextSnippet,
  RiText,
  RiBold,
  RiItalic,
  RiUnderline,
  RiAlignLeft,
  RiAlignCenter,
  RiAlignRight,
  RiAlignJustify,
  RiListRadio,
  RiListOrdered2,
  RiImageFill,
} from "react-icons/ri";
import { MdTextFields } from "react-icons/md";
import { TbBlockquote } from "react-icons/tb";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold.configure({
        HTMLAttributes: {
          class: "bold-tiptap",
        },
      }),
      Italic,
      Underline,
      BulletList,
      OrderedList,
      ListItem,
      Image.configure({
        allowBase64: true,
        inline: true,
      }),
      Blockquote,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Heading.configure({
        HTMLAttributes: {
          class: "my-custom-class",
        },
        levels: [1, 2, 3],
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose max-w-none focus:border-transparent focus:outline-none [&_ol]:list-decimal [&_ul]:list-disc bg-white p-4 leading-tight custom-paragraph-spacing",
      },
    },
    content: "<p>Hello World! 🌎️</p>",
  });

  const [selectedOption, setSelectedOption] = useState("Normal Text");
  const [isOpen, setIsOpen] = useState(false);

  if (!editor) {
    return null;
  }

  const applyHeading = (level: number, text: string) => {
    editor.chain().focus().toggleHeading({ level }).run();
    setSelectedOption(text); // Update with the correct text
    setIsOpen(false);
  };

  //Default tiptap add image (baseURL)
  const addImage = () => {
    const url = prompt("Masukan URL dari gambar");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  //handleImageUpload Function: This function reads the selected image file-
  //and converts it to a base64 data URL.
  //Once converted, it uses Tiptap's setImage method-
  //to insert the image into the editor.
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64URL = reader.result;
        editor.chain().focus().setImage({ src: base64URL }).run();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = (event) => {
    event.preventDefault();
  };

  return (
    <div className="mb-4 rounded-xl border bg-white p-2 shadow-md">
      <div className="editor-toolbar flex items-center gap-1 rounded-xl bg-black p-3 align-middle text-white">
        {/*=== Heading ===*/}
        <div className="relative flex items-center">
          <div className="relative">
            <button
              className="custom-select-trigger transit flex cursor-pointer items-center gap-2 rounded border bg-transparent p-2 duration-75 hover:bg-blue-gray-800"
              onClick={(e) => {
                handleButtonClick(e);
                setIsOpen(!isOpen);
              }}
            >
              {selectedOption}
              <RiArrowDownSLine />
            </button>

            {isOpen && (
              <div className="custom-options absolute bottom-full mb-2 w-full rounded border bg-white">
                <div
                  className="custom-option duration-755 flex cursor-pointer items-center gap-2 p-2 transition-all hover:bg-gray-200"
                  onClick={() => applyHeading(1, "Large Heading")}
                >
                  <RiTextSnippet />
                  Large Heading
                </div>
                <div
                  className="custom-option flex cursor-pointer items-center gap-2 p-2 transition-all duration-75 hover:bg-gray-200"
                  onClick={() => applyHeading(2, "Medium Heading")}
                >
                  <MdTextFields />
                  Medium Heading
                </div>
                <div
                  className="custom-option flex cursor-pointer items-center gap-2 p-2 transition-all duration-75 hover:bg-gray-200"
                  onClick={() => applyHeading(3, "Normal")}
                >
                  <RiText />
                  Normal
                </div>
              </div>
            )}
          </div>
        </div>
        {/* === Line === */}
        <div>
          <div className="mx-1 h-6 w-px bg-gray-400"></div>
        </div>
        {/* === All button after line goes here === */}
        <div className="flex flex-row items-center gap-1">
          {/* Bold */}
          <button
            onClick={(e) => {
              handleButtonClick(e);
              editor.chain().focus().toggleBold().run();
            }}
            className={`${
              editor?.isActive("bold") ? "bg-[#8B8C8D]" : ""
            } rounded-lg p-2 transition-all hover:bg-blue-gray-800`}
            disabled={!editor}
          >
            <RiBold />
          </button>
          {/* Italic */}
          <button
            onClick={(e) => {
              handleButtonClick(e);
              editor.chain().focus().toggleItalic().run();
            }}
            className={`${
              editor?.isActive("italic") ? "bg-[#8B8C8D]" : ""
            } rounded-lg p-2 transition-all hover:bg-blue-gray-800`}
            disabled={!editor}
          >
            <RiItalic />
          </button>
          {/* Underline */}
          <button
            onClick={(e) => {
              handleButtonClick(e);
              editor.chain().focus().toggleUnderline().run();
            }}
            className={`${
              editor?.isActive("underline") ? "bg-[#8B8C8D]" : ""
            } rounded-lg p-2 transition-all hover:bg-blue-gray-800`}
            disabled={!editor}
          >
            <RiUnderline />
          </button>
          {/* Align Left */}
          <button
            onClick={(e) => {
              handleButtonClick(e);
              editor.chain().focus().setTextAlign("left").run();
            }}
            className={`${
              editor?.isActive({ textAlign: "left" }) ? "bg-[#8B8C8D]" : ""
            } rounded-lg p-2 transition-all hover:bg-blue-gray-800`}
            disabled={!editor}
          >
            <RiAlignLeft />
          </button>
          {/* Align Center */}
          <button
            onClick={(e) => {
              handleButtonClick(e);
              editor.chain().focus().setTextAlign("center").run();
            }}
            className={`${
              editor?.isActive({ textAlign: "center" }) ? "bg-[#8B8C8D]" : ""
            } rounded-lg p-2 transition-all hover:bg-blue-gray-800`}
            disabled={!editor}
          >
            <RiAlignCenter />
          </button>
          {/* Align Right */}
          <button
            onClick={(e) => {
              handleButtonClick(e);
              editor.chain().focus().setTextAlign("right").run();
            }}
            className={`${
              editor?.isActive({ textAlign: "right" }) ? "bg-[#8B8C8D]" : ""
            }rounded-lg p-2 transition-all hover:bg-blue-gray-800`}
            disabled={!editor}
          >
            <RiAlignRight />
          </button>
          {/* Justify */}
          <button
            onClick={(e) => {
              handleButtonClick(e);
              editor.chain().focus().setTextAlign("justify").run();
            }}
            className={`${
              editor?.isActive({ textAlign: "justify" }) ? "bg-[#8B8C8D]" : ""
            }rounded-lg p-2 transition-all hover:bg-blue-gray-800`}
            disabled={!editor}
          >
            <RiAlignJustify />
          </button>
          {/* bullet list */}
          <button
            onClick={(e) => {
              handleButtonClick(e);
              editor.chain().focus().toggleBulletList().run();
            }}
            className={`${
              editor.isActive("bulletList") ? "bg-[#8B8C8D]" : ""
            } rounded-lg p-2 transition-all hover:bg-blue-gray-800`}
            disabled={!editor}
          >
            <RiListRadio />
          </button>
          {/* ordered list */}
          <button
            onClick={(e) => {
              handleButtonClick(e);
              editor.chain().focus().toggleOrderedList().run();
            }}
            className={`${
              editor.isActive("orderedList") ? "bg-[#8B8C8D]" : ""
            } rounded-lg p-2 transition-all hover:bg-blue-gray-800`}
            disabled={!editor}
          >
            <RiListOrdered2 />
          </button>
          {/* Blockquote */}
          <button
            onClick={(e) => {
              handleButtonClick(e);
              editor.chain().focus().toggleBlockquote().run();
            }}
            className={`${editor?.isActive("blockquote") ? "bg-[#8B8C8D]" : ""} rounded-lg p-2 transition-all hover:bg-blue-gray-800`}
            disabled={!editor}
          >
            <TbBlockquote />
          </button>
          {/* Image */}
          <div>
            <button
              // onClick={addImage}
              onClick={(e) => {
                handleButtonClick(e);
                document.getElementById("image-upload").click();
              }}
              className="rounded-lg p-2 transition-all hover:bg-blue-gray-800"
              disabled={!editor}
            >
              <RiImageFill />
            </button>
            <input
              type="file"
              id="image-upload"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
        </div>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
