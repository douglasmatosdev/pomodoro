declare type PomodoroState = { workTime: number; breakTime: number; sessions: number; start: boolean }

declare type PomodoroOptions = keyof PomodoroState

declare type Status = 'work.progress' | 'work.paused' | 'break.progress' | 'break.paused'
