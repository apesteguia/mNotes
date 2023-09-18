"use client";
import { useEffect, useState } from "react";
import { Chip, Kbd, Tooltip } from "@nextui-org/react";
import { IconSearch } from "@tabler/icons-react";
import { IconSettings } from "@tabler/icons-react";
import { IconSquareRoundedPlusFilled } from "@tabler/icons-react";
import "../styles/sidebar.css";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import NotesAccordion from "./NotesAccordion";
import Search from "./Search";

export default function SidebarWithProps(props: any) {
  const { id } = props.id;
  const [username, setUsername] = useState<any[]>([]);
  const [triggerEditor, setTriggerEditor] = useState("");
  const supabase = createClientComponentClient();

  useEffect(() => {
    const get_username = async () => {
      const fetchedUsername = await supabase.from("notes").select("user");
      const data = fetchedUsername.data;
      console.log(data);
      if (data) setUsername(data[0].user.split("-")[0]);
    };

    get_username();
  }, []);

  const handleId = (id: string) => {
    if (id != null) {
      setTriggerEditor(id);
    }
  };

  return (
    <div className="fixed h-full resize-x min-w-[240px] sidebar border border-zinc-700 flex flex-col ">
      <div className="flex items-center mt-2 ml-4 gap-2">
        <Chip>N</Chip>
        <h1 className="text-sm flex gap-1">
          Notes of <p className=" capitalize">{username || "Loading..."}</p>{" "}
        </h1>
      </div>
      <div className="ml-3 mt-12  w-[90%] flex flex-col text-sm text-zinc-400">
        <Search />

        <Tooltip
          placement="right"
          content={
            <div className="flex gap-2 items-center">
              <p>Search and quickly jump to a note</p>{" "}
              <Kbd className="text-sm" keys={["command"]}>
                P
              </Kbd>
            </div>
          }
          color="default"
          className="text-sm dark sidebar"
        >
          <div className="flex gap-1 transition cursor-pointer duration-300 hover:bg-neutral-700 rounded-md p-2 items-center">
            <IconSettings size={14} />
            <p>Settings</p>
          </div>
        </Tooltip>

        <Tooltip
          placement="right"
          content={
            <div className="flex gap-2 items-center">
              <p>Create new note</p>
            </div>
          }
          color="default"
          className="text-sm dark sidebar"
        >
          <div className="flex gap-1 transition cursor-pointer duration-300 hover:bg-neutral-700 rounded-md p-2 items-center">
            <IconSquareRoundedPlusFilled size={14} />
            <p>New Page</p>
          </div>
        </Tooltip>
      </div>
      <NotesAccordion onNoteSelected={handleId} />
    </div>
  );
}
