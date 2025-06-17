import React, { useState } from "react";

/**
 * Color theme constants as specified by requirements.
 */
const COLORS = {
  primary: "#4CAF50",
  secondary: "#FFC107",
  accent: "#2196F3",
  text: "#222",
  boardBg: "#fff"
};

/**
 * Returns the winner symbol ("X" or "O") or null if no winner.
 */
function calculateWinner(squares) {
  const lines = [
    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonals
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; ++i) {
    const [a, b, c] = lines[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}

/**
 * Square - renders a single square/button.
 */
function Square({ value, onClick, disabled }) {
  return (
    <button
      style={{
        background: COLORS.boardBg,
        border: `2px solid ${COLORS.accent}`,
        fontSize: "2.5rem",
        color: value === "X" ? COLORS.primary : COLORS.secondary,
        width: 72,
        height: 72,
        cursor: disabled ? "not-allowed" : "pointer",
        outline: "none",
        transition: "background 0.1s"
      }}
      aria-label={value ? `Board cell: ${value}` : "Empty board cell"}
      onClick={onClick}
      disabled={disabled}
    >
      {value}
    </button>
  );
}

// PUBLIC_INTERFACE
function WebTicTacToe() {
  /**
   * The board state is an array of 9 squares (null, "X", or "O").
   * X always goes first.
   */
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  const isBoardFull = squares.every((cell) => cell !== null);
  const gameOver = !!winner || isBoardFull;

  let statusText;
  if (winner) {
    statusText = (
      <span>
        Winner:{" "}
        <span
          style={{
            color: winner === "X" ? COLORS.primary : COLORS.secondary,
            fontWeight: 700
          }}
        >
          {winner}
        </span>
      </span>
    );
  } else if (isBoardFull) {
    statusText = <span>It's a draw!</span>;
  } else {
    statusText = (
      <span>
        Turn:{" "}
        <span
          style={{
            color: xIsNext ? COLORS.primary : COLORS.secondary,
            fontWeight: 700
          }}
        >
          {xIsNext ? "X" : "O"}
        </span>
      </span>
    );
  }

  // Handle click on a single square.
  function handleClick(index) {
    if (gameOver || squares[index]) return; // Ignore if game over or cell filled
    const nextSquares = squares.slice();
    nextSquares[index] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext((prev) => !prev);
  }

  // Reset board to initial state
  function handleReset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  /** Render Tic Tac Toe grid */
  function renderBoard() {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 72px)",
          gap: "8px",
          justifyContent: "center",
          background: COLORS.accent + "18",
          padding: "20px",
          borderRadius: "16px",
          boxShadow: "0 2px 10px rgba(33,150,243,0.08)"
        }}
      >
        {squares.map((cell, idx) => (
          <Square
            key={idx}
            value={cell}
            onClick={() => handleClick(idx)}
            disabled={!!squares[idx] || gameOver}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "32px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "calc(80vh - 56px)"
      }}
    >
      <h2
        style={{
          margin: "0 0 12px",
          color: COLORS.primary,
          letterSpacing: "0.03em",
          fontWeight: 700,
          fontSize: "2rem"
        }}
      >
        Web Tic Tac Toe
      </h2>

      <div
        style={{
          marginBottom: 16,
          fontSize: "1.15rem",
          color: COLORS.accent
        }}
      >
        {statusText}
      </div>

      {renderBoard()}

      <button
        style={{
          marginTop: 28,
          backgroundColor: COLORS.primary,
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          padding: "10px 28px",
          fontSize: "1rem",
          fontWeight: 500,
          cursor: "pointer",
          transition: "background 0.2s",
          boxShadow: "0 2px 8px rgba(76,175,80,0.04)"
        }}
        onClick={handleReset}
      >
        Reset
      </button>
    </div>
  );
}

export default WebTicTacToe;
