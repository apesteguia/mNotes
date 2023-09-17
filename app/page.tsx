"use client";

import { Button } from "@nextui-org/react";
import Image from "next/image";
import Editor from "./components/Editor";
import Sidebar from "./components/Sidebar";

export default function Home() {
  return (
    <div>
      <Editor />
      <Sidebar />
    </div>
  );
}
