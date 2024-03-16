'use client'
import { Configs, configsAtom } from "@/components/Configs";
import { Pomodoro } from "@/components/Pomodoro";
import { useAtomValue } from "jotai";

export default function Home() {
  const config = useAtomValue(configsAtom)

  return (
    <div className="w-full h-full">
      {config.start ?
        <Pomodoro />
        : <Configs />}
    </div>
  );
}
