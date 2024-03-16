'use client'
import { useTimer } from "@/hooks/useTimer"

export const Pomodoro = () => {
    const { timer, play, stop } = useTimer(25)

    return (
        <div>
            <h1>{timer}</h1>
            <button onClick={play}>play</button>
        </div>
    )
}