"use client";
import {
  MDXEditor,
  codeBlockPlugin,
  codeMirrorPlugin,
  markdownShortcutPlugin,
  headingsPlugin,
  linkPlugin,
  listsPlugin,
  frontmatterPlugin,
  quotePlugin,
  tablePlugin,
  sandpackPlugin,
  SandpackConfig,
} from "@mdxeditor/editor";
import "../styles/editor.css";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button, divider } from "@nextui-org/react";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import Search from "./Search";

function EditorWithProps(props: any) {
  const [focus, setFocus] = useState(true);
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const supabase = createClientComponentClient();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setContent(props.content[0].content);
    console.log("content updated" + content);
  }, [setContent]);

  useEffect(() => {
    const handleKeyDown = async (e: any) => {
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        const date = new Date(); // Obtén la fecha y hora actual

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        const milliseconds = String(date.getMilliseconds()).padStart(3, "0");
        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}+00`;

        const res = await supabase
          .from("notes")
          .update([{ content: content, last_edited: formattedDate }])
          .eq("id", props.content[0].id);
        enqueueSnackbar("That was easy!", { variant: "success" });
        console.log("bien", content);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [content]);

  const simpleSandpackConfig: SandpackConfig = {
    defaultPreset: "dark",
    presets: [
      {
        label: "React",
        name: "react",
        meta: "live react",
        sandpackTemplate: "react",
        sandpackTheme: "dark",
        snippetFileName: "/App.js",
        snippetLanguage: "jsx",
      },
    ],
  };

  return (
    <div
      className="fixed right-0 h-full flex overflow-y-auto w-full justify-center mt-[60px]"
      style={{ width: "calc(100% - 220px)" }}
    >
      <div className="fixed left-[280px] top-[30px]">
        <p className="font-bold">{props.content[0].title}</p>
        <p className="text-sm text-default-400">
          Last edited:{" "}
          {new Date(props.content[0].last_edited).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          })}
        </p>
      </div>

      <MDXEditor
        placeholder="hola"
        onChange={(e) => {
          setContent(e);
          if (e.length === 0) setVisible(true);
          else setVisible(false);
          console.log(content);
        }}
        autoFocus={focus}
        className="z-10 w-[730px] ml-[50px] h-full indent-2 flex"
        markdown={props.content[0].content}
        contentEditableClassName="editor dark-theme darkTheme"
        plugins={[
          tablePlugin(),
          frontmatterPlugin(),
          headingsPlugin(),
          listsPlugin(),
          linkPlugin(),
          quotePlugin(),
          codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
          sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
          codeMirrorPlugin({
            codeBlockLanguages: { js: "JavaScript", css: "CSS" },
          }),
          markdownShortcutPlugin(),
        ]}
      />
      <SnackbarProvider />
      <Search open={open} />
    </div>
  );
}

export default EditorWithProps;
