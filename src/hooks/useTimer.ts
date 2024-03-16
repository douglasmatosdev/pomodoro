import { useEffect, useRef, useState } from "react";

type UseTimerReturn = {
    timer: string,
    play: () => void,
    stop: () => void,
    status: Status
}

export function useTimer(configMinutes = 25): UseTimerReturn {
    const [timer, setTimer] = useState('25:00')
    const [seconds, setSeconds] = useState(configMinutes * 60)
    const [status, setStatus] = useState<Status>('paused')

    const intervelRef = useRef<NodeJS.Timeout | number>(0)

    useEffect(() => {
        const minutes = Math.floor(seconds / 60)
        const secondsRemaining = seconds % 60

        setTimer(`${minutes}:${secondsRemaining < 10 ? '0' + secondsRemaining : secondsRemaining}`)
    }, [seconds])

    const play = (): void => {
        intervelRef.current = setInterval(() => {
            setSeconds(prev => prev - 1)
        }, 1000)
        setStatus('progress')
    }

    const stop = (): void => {
        clearInterval(intervelRef.current)
        setStatus('paused')
    }

    return { timer, play, stop, status }
}