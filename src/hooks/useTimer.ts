import { useEffect, useRef, useState } from "react";

type UseTimerReturn = {
    timer: string,
    play: () => void,
    stop: () => void
}

export function useTimer(configMinutes = 25): UseTimerReturn {
    const [timer, setTimer] = useState('25:00')
    const [seconds, setSeconds] = useState(configMinutes * 60)

    const intervelRef = useRef<NodeJS.Timeout | number>(0)

    useEffect(() => {
        const minutes = Math.floor(seconds / 60)
        const secondsRemaining = seconds % 60 

        setTimer(`${minutes}:${secondsRemaining<10?'0'+secondsRemaining : secondsRemaining}`)
    }, [seconds])

    const play = (): void => {
        intervelRef.current = setInterval(() => {
            setSeconds(prev => prev - 1)
        }, 1000)
    }

    const stop = (): void => {
        clearInterval(intervelRef.current)
    }

    return { timer, play, stop}
}