'use client'
import { Configs, configsAtom } from "@/components/Configs";
import { Pomodoro } from "@/components/Pomodoro";
import { useAtomValue } from "jotai";

export default function Home() {
  const config = useAtomValue(configsAtom)

  return (
    <div>
      {config.start ?
        <Pomodoro />
        : <Configs />}
    </div>
  );
}
