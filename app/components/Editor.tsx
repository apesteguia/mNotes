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
import { Button } from "@nextui-org/react";

function Editor(props: any) {
  const [visible, setVisible] = useState<Boolean>(false);
  const [content, setContent] = useState<string>(`type something dfasdfasdf`);
  const [focus, setFocus] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchNoteContent = async () => {
      if (props.triggerEditor != "") {
        console.log(props.triggerEditor);
        const res = await supabase
          .from("notes")
          .select()
          .eq("id", props.triggerEditor);
        const data = res.data;
        if (data) {
          console.log(data[0]);
          setContent(`${data[0].content}`);
        }
      }
    };
    fetchNoteContent();
  }, [props]);

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
      {!visible ? (
        <p className="z-0 absolute mt-[40px] mr-[550px] text-zinc-500">
          Start tying something...
        </p>
      ) : null}

      {content.length < 20 ? (
        <MDXEditor
          onChange={(e: any) => {
            e.length == 0 ? setVisible(false) : setVisible(true);
            console.log(e);
          }}
          placeholder=""
          autoFocus={focus}
          className="z-10 w-[730px] h-full indent-2 flex"
          markdown=""
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
      ) : (
        <MDXEditor
          onChange={(e: any) => {
            e.length == 0 ? setVisible(false) : setVisible(true);
            setContent(e);
            e = content;
            console.log(e);
          }}
          placeholder=""
          autoFocus={focus}
          className="z-10 w-[730px] h-full indent-2 flex"
          markdown={`${content}`}
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
      )}
    </div>
  );
}

export default Editor;
