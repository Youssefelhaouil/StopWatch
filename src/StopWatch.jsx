import React, { useEffect, useState, useRef } from "react";

function StopWatch() {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {
        if (isRunning) {
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        } else {
            clearInterval(intervalIdRef.current);
        }

        return () => {
            clearInterval(intervalIdRef.current);
        };
    }, [isRunning]);

    function start() {
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }

    function stop() {
        setIsRunning(false);
    }

    function reset() {
        setElapsedTime(0);
        setIsRunning(false);
    }

    function formatTime() {
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
        let seconds = Math.floor((elapsedTime / 1000) % 60);
        let milliseconds = Math.floor((elapsedTime % 1000) / 10);

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        milliseconds = String(milliseconds).padStart(2, "0");

        return `${minutes}:${seconds}:${milliseconds}`;
    }

    return (
        <div className="p-4 rounded-lg flex flex-col justify-center items-center gap-2 bg-indigo-600">
            <span className="font-bold text-white text-[100px]">{formatTime()}</span>
            <div className="grid grid-cols-3 gap-8">
                <button onClick={start} className="font-bold text-[30px] font-sans text-white bg-green-500 rounded-md px-3 py-1">Start</button>
                <button onClick={stop} className="font-bold text-[30px] font-sans text-white bg-red-500 rounded-md px-3 py-1">Stop</button>
                <button onClick={reset} className="font-bold text-[30px] font-sans text-white bg-blue-500 rounded-md px-3 py-1">Reset</button>
            </div>
        </div>
    );
}

export default StopWatch;
