interface SessionsIndicatorProps {
    status: Status
    totalSessions: number
    currentSession: number
}

export const SessionsIndicator = (props: SessionsIndicatorProps) => {
    const { status, totalSessions, currentSession } = props
    const bgColor = status.match('break') ? 'bg-pomo-yellow' : 'bg-pomo-green'

    return (
        <ul className="flex justify-between items-center w-10">
            {Array.from({ length: totalSessions }).map((_, i) => {
                const index = i + 1
                const color = index >= currentSession ? bgColor : 'bg-pomo-soft-blue'
                return <li key={i} className={`w-2 h-2 rounded-full ${color}`}></li>
            }).reverse()}
        </ul>
    )
}