"use server";

import Sidebar from "../../components/Sidebar";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import EditorWithProps from "../../components/EditorWithProps";
import SidebarWithProps from "@/app/components/SidebarWithProps";

export default async function Home({ params }: any) {
  const { id } = params;
  const supabase = createServerActionClient({ cookies });
  const res = await supabase.from("notes").select("").eq("id", id);
  console.log(res.data);
  console.log(id);
  return (
    <div>
      <SidebarWithProps id={id} />
      <EditorWithProps content={res.data} />
    </div>
  );
}
