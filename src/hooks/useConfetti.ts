import { useEffect, useState } from "react";

export function useConfetti(complete: boolean) {
    const [confetti, setConfetti] = useState(false)

    useEffect(() => {
        if (complete) {
            setConfetti(true)

            setTimeout(() => {
                setConfetti(false)
            }, 10000);
        }

    }, [complete])

    return confetti
}
