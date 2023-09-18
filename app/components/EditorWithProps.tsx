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

function EditorWithProps(props: any) {
  const [focus, setFocus] = useState(true);
  const [content, setContent] = useState("");
  const supabase = createClientComponentClient();

  useEffect(() => {
    const handleKeyDown = async (e: any) => {
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        const date = new Date();
        const res = await supabase
          .from("notes")
          .update([{ content: content, last_edited: date.toDateString() }])
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
      className="fixed right-0 h-full flex overflow-y-auto w-full justify-center"
      style={{ width: "calc(100% - 170px)" }}
    >
      <div className="absolute left-[100px] mt-5">
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
        placeholder=""
        onChange={(e) => {
          setContent(e);
          console.log(content);
        }}
        autoFocus={focus}
        className="z-10 w-[730px] h-full indent-2 flex"
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
    </div>
  );
}

export default EditorWithProps;
