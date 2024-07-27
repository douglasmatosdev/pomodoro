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
    const [configs, setConfigs] = useAtom<PomodoroState>(configsAtom)
    const [timer, setTimer] = useState('00:00')
    const [seconds, setSeconds] = useState(configs.workTime * 60)
    const [status, setStatus] = useState<Status>('work.paused')
    const [sessions, setSessions] = useState<PomodoroState['sessions']>(configs.sessions)

    const intervelRef = useRef<NodeJS.Timeout | number>(0)
    const title = document.querySelector("title")

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
            setConfigs({ ...configs, start: false, complete: true })
        }

        const minutesFormatted = minutes < 10 ? '0' + minutes : minutes
        const secondsFormatted = secondsRemaining < 10 ? '0' + secondsRemaining : secondsRemaining
        const timerFormatted = `${minutesFormatted}:${secondsFormatted}`

        setTimer(timerFormatted)

        if (!title || !title?.innerText) return

        if (status === 'work.paused') {
            title.innerText = `${timerFormatted} - Foco!!!`
        }

        if (status === 'work.progress') {
            title.innerText = `${timerFormatted} - Foco!!!`
        }

        if (status === 'break.paused') {
            title.innerText = `${timerFormatted} - Descanse!!!`
        }

        if (status === 'break.progress') {
            title.innerText = `${timerFormatted} - Descanse!!!`
        }
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
        }, 10)
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
        title!.innerText = 'Pomodoro'
    }

    return { timer, play, stop, status, sessions }
}