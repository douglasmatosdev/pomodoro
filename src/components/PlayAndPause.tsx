import { MdOutlinePause, MdOutlinePlayArrow } from 'react-icons/md'

interface PlayAndPauseProps {
    audio: HTMLAudioElement | null
    status: Status
    handlePlay: () => void
    handlePause: () => void
}
export const PlayAndPause = (props: PlayAndPauseProps) => {
    const { audio, status, handlePause, handlePlay } = props

    return status.match('paused') ? (
        <button
            onClick={() => {
                audio!.play()
                handlePlay()
            }}
            className="select-none shadow-md text-center text-4xl text-pomo-text-blue font-bold rounded-lg bg-pomo-soft-blue px-4 py-2"
        >
            <MdOutlinePlayArrow />
        </button>
    ) : (
        <button
            onClick={() => {
                audio!.play()
                handlePause()
            }}
            className="select-none shadow-md text-center text-4xl text-pomo-text-blue font-bold rounded-lg bg-pomo-soft-blue px-4 py-2"
        >
            <MdOutlinePause />
        </button>
    )
}