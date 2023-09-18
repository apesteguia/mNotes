"use client";

import React from "react";
import { IconSearch } from "@tabler/icons-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Kbd,
  Input,
  Link,
  Tooltip,
} from "@nextui-org/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { IconLink } from "@tabler/icons-react";

export default function Search() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [data, setData] = React.useState<any[]>([]);
  const [search, setSearch] = React.useState<string>("");
  const supabase = createClientComponentClient();

  const handleSearch = async (searchValue: any) => {
    setSearch(searchValue);
    if (searchValue === "") {
      setData([]);
      return;
    }
    const { data, error } = await supabase
      .from("notes")
      .select()
      .ilike("title", `%${searchValue}%`);
    if (error) console.log("Error fetching posts:", error.message);
    setData(data ?? []);
  };

  return (
    <div className="dark  text-zinc-400">
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
        className="text-sm dark flex sidebar"
      >
        <div className="flex -mt-10 transition cursor-pointer duration-300 hover:bg-neutral-700 rounded-md p-2 h-[40px] justify-start  items-start">
          <Button
            onPress={onOpen}
            variant="flat"
            className="font-medium -mt-2 flex w-full dark bg--800 text-zinc-400 -ml-4  gap-1 justify-start"
          >
            <IconSearch className="right-4" size={14} />
            <p>Search</p>
          </Button>
        </div>
      </Tooltip>

      <Modal
        closeButton="false"
        size="2xl"
        backdrop="blur"
        className="fixed top-10 "
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent className="flex flex-col sidebar ">
          {(onClose) => (
            <>
              <div className="search border-none outline-none  min-h-[200px] rounded-xl flex flex-col items-center">
                <Input
                  onChange={(e) => handleSearch(e.target.value)}
                  color="default"
                  variant="flat"
                  className="w-[97%] mt-2 text-xl focus:border-none focus:outline-none "
                  autoFocus
                  label="Search posts"
                />
              </div>
              <div className="data flex  flex-col items-left -mt-28 w-[100%]">
                {data.length > 0 ? (
                  <div className="posts w-full flex flex-col ">
                    <p className="mt-2 ml-5 mb-2 p-oscuro">Posts</p>
                    {data.map((post) => (
                      <Link
                        href={"/note/" + post.id}
                        key={post.id}
                        className="search-post flex items-center h-16"
                      >
                        <Button
                          as={Link}
                          className="ml-10 p-7 w-[90%] text-left flex flex-col items-center bg-neutral-700"
                        >
                          <div className="flex items-center  w-full">
                            <p className="w-[95%]">{post.title}</p>
                            <IconLink className="self-end" />
                          </div>
                        </Button>
                      </Link>
                    ))}
                  </div>
                ) : (
                  search !== "" && (
                    <div className="flex justify-center mt-10 text-xl">
                      No posts found
                    </div>
                  )
                )}
              </div>
              <ModalFooter className="text-xs">
                <p>
                  Press <Kbd className="text-xs">Esc</Kbd> to close.
                </p>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
