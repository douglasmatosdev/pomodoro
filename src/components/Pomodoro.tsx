'use client'
import { usePomodoro } from '@/hooks/usePomodoro'
import { PlayAndPause } from './PlayAndPause'
import { SessionsIndicator } from './SessionsIndicator'
import { useAtom } from 'jotai'
import { configsAtom } from './Configs'

export const Pomodoro = (): JSX.Element => {
    const [configs, setConfigs] = useAtom(configsAtom)
    const { play, stop, timer, status, sessions } = usePomodoro()

    const isBreak = status.match('break')

    return (
        <main className="select-none bg-pomo-deep-blue w-full h-screen flex flex-col justify-start items-center">
            <header className="flex justify-between items-center w-full p-10">
                <h1 className="text-pomo-text-blue text-3xl font-bold">Pomodoro</h1>
                <div className="flex justify-center items-center">
                    <button onClick={() => setConfigs({ ...configs, start: false })} className="select-none shadow-md text-center text-pomo-text-blue font-bold rounded-lg bg-pomo-soft-blue px-4 py-2">
                        Início
                    </button>
                </div>
            </header>
            <section className="flex">
                <div className="mr-8 bg-pomo-soft-blue rounded-full w-52 h-52 flex justify-center items-center">
                    <div
                        className={`${isBreak ? 'border-pomo-yellow' : 'border-pomo-green'} border-4 bg-pomo-soft-blue rounded-full w-44 h-44 flex justify-center items-center`}
                    >
                        <div className="flex justify-center items-center text-5xl text-pomo-text-blue font-extrabold select-none">
                            {timer}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <h2 className={`${isBreak ? 'text-pomo-green-1' : 'text-pomo-green'} text-3xl font-bold`}>{isBreak ? 'Pausa' : 'Trabalho'}</h2>
                    <SessionsIndicator sessions={configs.sessions} status={status} />
                    <div className="flex justify-center items-center mt-8">
                        <PlayAndPause status={status} handlePause={stop} handlePlay={play} />
                    </div>
                </div>
            </section>
        </main>
    )
}
