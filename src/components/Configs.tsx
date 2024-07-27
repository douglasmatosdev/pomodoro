'use client'
import { atom, useAtom } from 'jotai'
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from 'react-icons/fa'

const initialState: PomodoroState = {
    workTime: 25,
    breakTime: 5,
    sessions: 3,
    start: false,
    complete: false
}

export const configsAtom = atom<PomodoroState>(initialState)

export const Configs = (): JSX.Element => {
    const [state, setState] = useAtom<PomodoroState>(configsAtom)
    const INCREMENT = 1

    const increment = (key: PomodoroOptions): void => {
        setState((prev:  PomodoroState) => ({ ...prev, [key]: +prev[key] + INCREMENT }))
    }

    const decrement = (key: PomodoroOptions): void => {
        setState((prev:  PomodoroState) => ({ ...prev, [key]: +prev[key] - INCREMENT <= 1 ? 1 : +prev[key] - INCREMENT }))
    }

    const start = (): void => {
        setState({ ...state, start: true })
    }

    return (
        <main className="select-none bg-pomo-deep-blue h-screen flex flex-col justify-start items-center md:pt-16">
            <h1 className="text-pomo-text-blue text-4xl md:text-5xl font-bold mb-8 mt-6">Pomodoro</h1>
            <div className="flex flex-col justify-center items-center">
                <div className="flex justify-center items-center flex-wrap">
                    <div className="flex flex-col justify-center items-center md:mr-8 mb-8 md:mb-0">
                        <div className="flex justify-center items-center">
                            <div className="flex flex-col justify-center items-center mr-2">
                                <FaArrowAltCircleUp
                                    onClick={() => increment('workTime')}
                                    className="text-lg text-pomo-arrow-blue shadow-md rounded-full mb-6 cursor-pointer w-10 h-10"
                                />
                                <FaArrowAltCircleDown
                                    onClick={() => decrement('workTime')}
                                    className="text-lg text-pomo-arrow-blue shadow-md rounded-full cursor-pointer w-10 h-10"
                                />
                            </div>
                            <div className="shadow-md flex justify-center items-center text-6xl text-pomo-text-blue font-extrabold bg-pomo-soft-blue rounded-md px-4 py-2 w-40 h-32 select-none">
                                {state.workTime}
                            </div>
                        </div>
                        <span className="text-sm font-semibold text-pomo-text-blue ml-6 mt-2 select-none">
                            Trabalho
                        </span>
                    </div>
                    <div className="flex flex-col justify-center items-center md:mr-8 mb-8 md:mb-0">
                        <div className="flex justify-center items-center">
                            <div className="flex flex-col justify-center items-center mr-2">
                                <FaArrowAltCircleUp
                                    onClick={() => increment('breakTime')}
                                    className="text-lg text-pomo-arrow-blue shadow-md rounded-full mb-6 cursor-pointer w-10 h-10"
                                />
                                <FaArrowAltCircleDown
                                    onClick={() => decrement('breakTime')}
                                    className="text-lg text-pomo-arrow-blue shadow-md rounded-full cursor-pointer w-10 h-10"
                                />
                            </div>
                            <div className="shadow-md flex justify-center items-center text-6xl text-pomo-text-blue font-extrabold bg-pomo-soft-blue rounded-md px-4 py-2 w-40 h-32 select-none">
                                {state.breakTime}
                            </div>
                        </div>
                        <span className="text-sm font-semibold text-pomo-text-blue ml-6 mt-2 select-none">Pausa</span>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <div className="flex justify-center items-center">
                            <div className="flex flex-col justify-center items-center mr-2">
                                <FaArrowAltCircleUp
                                    onClick={() => increment('sessions')}
                                    className="text-lg text-pomo-arrow-blue shadow-md rounded-full mb-6 cursor-pointer w-10 h-10"
                                />
                                <FaArrowAltCircleDown
                                    onClick={() => decrement('sessions')}
                                    className="text-lg text-pomo-arrow-blue shadow-md rounded-full cursor-pointer w-10 h-10"
                                />
                            </div>
                            <div className="shadow-md flex justify-center items-center text-6xl text-pomo-text-blue font-extrabold bg-pomo-soft-blue rounded-md px-4 py-2 w-40 h-32 select-none">
                                {state.sessions}
                            </div>
                        </div>
                        <span className="text-sm font-semibold text-pomo-text-blue ml-6 mt-2 select-none">Sessões</span>
                    </div>
                </div>
                <div className="flex justify-center items-center mt-8">
                    <button
                        onClick={start}
                        className="select-none shadow-md text-center text-pomo-text-blue font-bold rounded-lg bg-pomo-soft-blue px-4 py-2"
                    >
                        Continuar
                    </button>
                </div>
            </div>
        </main>
    )
}
