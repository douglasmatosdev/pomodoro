declare type PomodoroState = { workTime: number; breakingTime: number; sessions: number; start: boolean }

declare type PomodoroOptions = keyof PomodoroState

declare type Status = 'start' | 'progress' | 'paused'
