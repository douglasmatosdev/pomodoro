'use client'
import { configsAtom } from "@/components/Configs";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";

type UseTimerReturn = {
    timer: string,
    play: () => void,
    stop: () => void,
    status: Status
    sessions: number
}

export function usePomodoro(): UseTimerReturn {
    const [configs, setConfigs] = useAtom(configsAtom)
    const [timer, setTimer] = useState('00:00')
    const [seconds, setSeconds] = useState(configs.workTime * 60)
    const [status, setStatus] = useState<Status>('work.paused')
    const [sessions, setSessions] = useState(configs.sessions)

    const intervelRef = useRef<NodeJS.Timeout | number>(0)

    useEffect(() => {
        const minutes = Math.floor(seconds / 60)
        const secondsRemaining = seconds % 60

        if (status === 'work.progress' && seconds <= 0) {
            handleBreak()
        }

        if (status === 'break.progress' && seconds <= 0 && sessions > 0) {
            reset()
        }
        if (sessions <= 0) {
            setConfigs({ ...configs, start: false })
        }

        const minutesFormatted = minutes < 10 ? '0' + minutes : minutes
        const secondsFormatted = secondsRemaining < 10 ? '0' + secondsRemaining : secondsRemaining

        setTimer(`${minutesFormatted}:${secondsFormatted}`)
    }, [seconds]) // eslint-disable-line react-hooks/exhaustive-deps

    const play = (): void => {
        switch (status) {
            case 'work.paused':
                setStatus('work.progress')
                break;
            case "work.progress":
                setStatus('work.paused')
                break;
            case "break.paused":
                setStatus('break.progress')
                break;
            case "break.progress":
                setStatus('break.paused')
                break;

            default:
                break;
        }
        intervelRef.current = setInterval(() => {
            setSeconds(prev => prev - 1)
        }, 1000)
    }

    const stop = (): void => {
        clearInterval(intervelRef.current)
        setStatus('work.paused')
    }

    const handleBreak = (): void => {
        clearInterval(intervelRef.current)
        setSeconds(configs.breakTime * 60)
        setStatus('break.paused')
    }

    const reset = (): void => {
        clearInterval(intervelRef.current)
        setSeconds(configs.workTime * 60)
        setStatus('work.paused')
        setSessions(prev => prev - 1)
    }

    return { timer, play, stop, status, sessions }
}