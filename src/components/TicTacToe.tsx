
import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

type Player = 'X' | 'O' | null;
type Board = Player[];
type WinningLine = number[] | null;

const TicTacToe = () => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<Player>(null);
  const [isDraw, setIsDraw] = useState(false);
  const [winningLine, setWinningLine] = useState<WinningLine>(null);

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  const checkWinner = (board: Board): { winner: Player; line: WinningLine } => {
    for (const [a, b, c] of winningCombinations) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], line: [a, b, c] };
      }
    }
    return { winner: null, line: null };
  };

  const handleCellClick = (index: number) => {
    if (board[index] || winner || isDraw) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const { winner: gameWinner, line } = checkWinner(newBoard);
    
    if (gameWinner) {
      setWinner(gameWinner);
      setWinningLine(line);
    } else if (newBoard.every(cell => cell !== null)) {
      setIsDraw(true);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setIsDraw(false);
    setWinningLine(null);
  };

  const getGameStatus = () => {
    if (winner) return `🎉 Player ${winner} Wins!`;
    if (isDraw) return "🤝 It's a Draw!";
    return `Player ${currentPlayer}'s Turn`;
  };

  const isCellInWinningLine = (index: number) => {
    return winningLine?.includes(index) || false;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Tic-Tac-Toe</h1>
          <div className="text-xl font-semibold text-gray-600 mb-4 min-h-[32px] flex items-center justify-center">
            {getGameStatus()}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-8 aspect-square">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleCellClick(index)}
              disabled={!!cell || !!winner || isDraw}
              className={`
                aspect-square bg-gray-50 border-2 border-gray-200 rounded-xl 
                flex items-center justify-center text-4xl font-bold
                transition-all duration-200 ease-in-out
                hover:bg-gray-100 hover:border-gray-300 hover:scale-105
                active:scale-95 disabled:cursor-not-allowed
                ${isCellInWinningLine(index) 
                  ? 'bg-green-100 border-green-400 shadow-lg' 
                  : ''
                }
                ${cell === 'X' ? 'text-blue-600' : 'text-red-500'}
              `}
            >
              {cell && (
                <span className="animate-scale-in">
                  {cell}
                </span>
              )}
            </button>
          ))}
        </div>

        <button
          onClick={resetGame}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 
                   text-white font-semibold py-3 px-6 rounded-xl
                   hover:from-blue-600 hover:to-indigo-700 
                   transform hover:scale-105 active:scale-95
                   transition-all duration-200 ease-in-out
                   shadow-lg hover:shadow-xl
                   flex items-center justify-center gap-2"
        >
          <RefreshCw size={20} />
          New Game
        </button>
      </div>

      <div className="mt-8 text-center text-gray-600">
        <p className="text-sm">Click any cell to place your mark</p>
        <p className="text-xs mt-1">First to get 3 in a row wins!</p>
      </div>
    </div>
  );
};

export default TicTacToe;
