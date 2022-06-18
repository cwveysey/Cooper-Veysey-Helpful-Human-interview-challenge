import { useEffect, useState, useRef, useCallback } from "react";

function getWindowDimensions() { // See https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

export function useWindowDimensions() { // See https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}

// See https://swr.vercel.app/docs/middleware#keep-previous-result
export function laggy(useSWRNext) {
    return (key, fetcher, config) => {
        // Use a ref to store previous returned data.
        const laggyDataRef = useRef()

        // Actual SWR hook.
        const swr = useSWRNext(key, fetcher, config)

        useEffect(() => {
            // Update ref if data is not undefined.
            if (swr.data !== undefined) {
                laggyDataRef.current = swr.data
            }
        }, [swr.data])

        // Expose a method to clear the laggy data, if any.
        const resetLaggy = useCallback(() => {
            laggyDataRef.current = undefined
        }, [])

        // Fallback to previous data if the current data is undefined.
        const dataOrLaggyData = swr.data === undefined ? laggyDataRef.current : swr.data

        // Is it showing previous data?
        const isLagging = swr.data === undefined && laggyDataRef.current !== undefined

        // Also add a `isLagging` field to SWR.
        return Object.assign({}, swr, {
            data: dataOrLaggyData,
            isLagging,
            resetLaggy,
        })
    }
}