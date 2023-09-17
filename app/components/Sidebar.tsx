import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  Chip,
  Kbd,
  Tooltip,
} from "@nextui-org/react";
import { IconSearch } from "@tabler/icons-react";
import { IconSettings } from "@tabler/icons-react";
import { IconSquareRoundedPlusFilled } from "@tabler/icons-react";
import { IconNotes } from "@tabler/icons-react";
import "../styles/sidebar.css";

export default function Sidebar() {
  const [username, setUsername] = useState<string | undefined>(undefined);

  useEffect(() => {
    const get_username = async () => {
      const fetchedUsername = "mikel";
      setUsername(fetchedUsername);
    };

    get_username();
  }, []);

  const itemClasses = {
    base: "py-0 w-full",
    title: "font-small text-small text-zinc-400 outline-none border-none",
    trigger:
      "px-2 py-0 data-[hover=true]:bg-default-100 ml-1 rounded-lg h-14 flex items-center",
    indicator: "text-medium",
    content: "text-small px-2",
  };

  return (
    <div className="fixed h-full resize-x min-w-[240px] sidebar border border-zinc-700 flex flex-col ">
      <div className="flex items-center mt-2 ml-4 gap-2">
        <Chip>{username ? username[0].toUpperCase() : "M"}</Chip>
        <h1 className="text-sm flex gap-1">
          Notes of <p className=" capitalize">{username || "Loading..."}</p>{" "}
        </h1>
      </div>
      <div className="ml-3 mt-4  w-[90%] flex flex-col text-sm text-zinc-400">
        <Tooltip
          placement="right"
          content="Search and quickly jump to a note "
          color="default"
          className="text-sm sidebar dark"
        >
          <div className="flex gap-1 cursor-pointer transition duration-300 hover:bg-neutral-700    rounded-md p-2 items-center">
            <IconSearch size={14} />
            <p>Search</p>
          </div>
        </Tooltip>

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

      <div className="text-sm">
        <Accordion
          showDivider={false}
          itemClasses={itemClasses}
          isCompact
          className="text-sm"
        >
          <AccordionItem subtitle="" className="text-sm" title="Your Notes">
            <div className="flex items-baseline  flex-col">
              <div className="flex gap-2 h-[20px]">
                <IconNotes size={14} />
                <button>adios</button>
              </div>
            </div>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
