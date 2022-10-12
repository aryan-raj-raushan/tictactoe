import React, { useState } from 'react';
import Board from './components/Board';
import History from './components/History';
import { calculateWinner } from './helpers';
import './style/root.scss';

const App = () => {
  const [history, setHistory] = useState([
    { board: Array(9).fill(null), setIsXnext: true },
  ]);
  const [currntMove, setCurrentMove] = useState(0);

  const current = history[currntMove];
  // const [isXnext, setIsXnext] = useState(false);
  const winner = calculateWinner(current.board);

  const message = winner
    ? `Winner is ${winner}`
    : `Next player is ${current.isXnext ? 'X' : '0'}`;

  const handleSquareClick = position => {
    if (current.board[position] || winner) {
      return;
    }

    setHistory(prev => {
      const last = prev[prev.length - 1];
      const newBoard = last.board.map((square, pos) => {
        if (pos === position) {
          return last.isXnext ? 'X' : '0';
        }

        return square;
      });
      return prev.concat({ board: newBoard, isXnext: !last.isXnext });
    });
    setCurrentMove(prev => prev + 1);
  };
  const moveTo = move => {
    setCurrentMove(move);
  };

  return (
    <div className="app">
      <h1>TIC TAC TOE</h1>
      <h2>{message}</h2>
      <Board board={current.board} handleSquareClick={handleSquareClick} />
      <History history={history} moveTo={moveTo} currntMove={currntMove} />
    </div>
  );
};

export default App;
