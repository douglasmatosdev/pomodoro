import { usePomodoro } from "@/hooks/usePomodoro";
import { act, renderHook } from "@testing-library/react";

jest.useFakeTimers()

describe('Test suite for timer function', () => {
    test('should return initial value 25:00', () => {

        const { result } = renderHook(() => usePomodoro())

        expect(result.current.timer).toEqual('25:00')
    });

    test('should be return a countdown', () => {
        const { result } = renderHook(() => usePomodoro())

        act(() => {
            result.current.play()
        })
        expect(result.current.timer).toEqual('25:00')

        act(() => {
            jest.advanceTimersByTime(1000)
        })
        expect(result.current.timer).toEqual('24:59')

        act(() => {
            jest.advanceTimersByTime(1000)
        })
        expect(result.current.timer).toEqual('24:58')
    });

    test('must stop the countdown', () => {
        const { result } = renderHook(() => usePomodoro())

        act(() => {
            result.current.play()
        })
        expect(result.current.timer).toEqual('25:00')

        act(() => {
            jest.advanceTimersByTime(1000)
        })
        expect(result.current.timer).toEqual('24:59')

        act(() => {
            result.current.stop()
        })

        act(() => {
            jest.advanceTimersByTime(1000)
        })
        expect(result.current.timer).toEqual('24:59')

        act(() => {
            jest.advanceTimersByTime(1000)
        })
        expect(result.current.timer).toEqual('24:59')

    });
    
    test('The countdown must continue', () => {
        const { result } = renderHook(() => usePomodoro())

        act(() => {
            result.current.play()
        })
        expect(result.current.timer).toEqual('25:00')

        act(() => {
            jest.advanceTimersByTime(1000)
        })
        expect(result.current.timer).toEqual('24:59')

        act(() => {
            result.current.stop()
        })

        act(() => {
            jest.advanceTimersByTime(1000)
        })
        expect(result.current.timer).toEqual('24:59')

        act(() => {
            jest.advanceTimersByTime(1000)
        })
        expect(result.current.timer).toEqual('24:59')

        act(() => {
            result.current.play()
        })

        act(() => {
            jest.advanceTimersByTime(1000)
        })
        expect(result.current.timer).toEqual('24:58')

        act(() => {
            jest.advanceTimersByTime(1000)
        })
        expect(result.current.timer).toEqual('24:57')
    });
});