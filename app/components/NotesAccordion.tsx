"use client";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import Link from "next/link";
import { IconNotes } from "@tabler/icons-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

export default function NotesAccordion(props: any) {
  const [notes, setNotes] = useState<any[]>([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchNotes = async () => {
      const res = await supabase.from("notes").select("title, id");
      const data = res.data;
      if (data) setNotes(data);
    };
    fetchNotes();
  }, [supabase, setNotes]);

  const handleButton = (id: string) => {
    props.onNoteSelected(id);
  };

  const itemClasses = {
    base: "py-0 w-full",
    title: "font-small text-small text-zinc-400 outline-none border-none z-10",
    trigger:
      "px-2 py-0 z-10 data-[hover=true]:bg-neutral-700 transition duration-300 ml-1 rounded-lg h-14 flex items-center",
    indicator: "text-medium",
    content: "text-small px-2",
  };
  return (
    <div className="text-sm h-[270px]">
      <Accordion
        showDivider={false}
        itemClasses={itemClasses}
        isCompact
        className="text-sm"
      >
        <AccordionItem
          subtitle=""
          className="text-sm overflow-y-auto overflow-x-hidden"
          title="Your Notes"
        >
          <div className="flex items-baseline  h-[200px]  flex-col">
            <div className="flex flex-col gap-2 h-[200px]">
              {notes.length > 0 ? (
                notes.map((notes, i) => (
                  <Button
                    as={Link}
                    href={"/note/" + notes.id}
                    onClick={() => handleButton(notes.id)}
                    color="default"
                    key={notes.id}
                    className="truncate max-h-[90%] ml-4 flex gap-2 justify-start text-sm h-[24px] text-neutral-300 bg-neutral-700"
                  >
                    <IconNotes size={14} />
                    <p className="truncate overflow-hidden h-full">
                      {notes.title}
                    </p>
                  </Button>
                ))
              ) : (
                <p>No notes for this user</p>
              )}
            </div>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
