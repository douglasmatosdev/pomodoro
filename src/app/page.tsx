'use client'
import { Configs, configsAtom } from "@/components/Configs";
import { Pomodoro } from "@/components/Pomodoro";
import { useConfetti } from "@/hooks/useConfetti";
import { useAtomValue } from "jotai";
import ReactConfetti from "react-confetti";

export default function Home() {
  const config = useAtomValue(configsAtom)
  const lauchConfetti = useConfetti(config.complete)

  return (
    <div className="w-full h-full">
      {lauchConfetti && <ReactConfetti width={window?.innerWidth} height={window?.innerHeight} tweenDuration={3000} />}

      {config.start ? <Pomodoro /> : <Configs />}
    </div>
  );
}
