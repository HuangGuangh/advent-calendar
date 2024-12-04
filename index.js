import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "./app.css";

const AdventCalendar = () => {
    const originalSquares = Array.from({ length: 31 }, (_, index) => (index + 1).toString());
    const [squares, setSquares] = useState(originalSquares);
    const [clicked, setClicked] = useState(Array(31).fill(false));

    const platformRef = useRef(null);
    const [columns, setColumns] = useState(5);

    const adjustColumns = () => {
        if (platformRef.current) {
            const width = platformRef.current.offsetWidth;

            if (width <= 600) {
                setColumns(2);
            } else if (width <= 900) {
                setColumns(5);
            } else {
                setColumns(7);
            }
        }
    };

    useEffect(() => {
        adjustColumns();

        const handleResize = () => {
            adjustColumns();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleClick = (index) => {
        const newSquares = [...squares];
        const newClicked = [...clicked];

        newSquares[index] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        newClicked[index] = true;

        setSquares(newSquares);
        setClicked(newClicked);
    };

    const restoreSquares = () => {
        setSquares(originalSquares);
        setClicked(Array(31).fill(false));
    };

    return (
        <div>
            {/* Platform container */}
            <div
                className="platform"
                ref={platformRef}
                style={{
                    width: "80%",
                    height: "80vh",
                }}
            >
                <div
                    className="calendar"
                    style={{
                        gridTemplateColumns: `repeat(${columns}, 1fr)`,
                    }}
                >
                    {squares.map((value, index) => (
                        <div
                            className="square"
                            key={index}
                            style={{
                                backgroundColor: clicked[index] ? 'red' : '#f0f0f0',
                            }}
                            onClick={() => handleClick(index)}
                        >
                            {value}
                        </div>
                    ))}
                </div>
            </div>

            {/* Restore button */}
            <button className="restore-button" onClick={restoreSquares}>
                Restore All
            </button>
        </div>
    );
};

ReactDOM.render(<AdventCalendar />, document.getElementById("root"));
