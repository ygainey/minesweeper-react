import { useState, useEffect, useCallback } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from '../UI/AlertDIalog'
import GameStatus from './GameStatus'
import Board from './Board'

const MEDIUM_WIDTH_HEIGHT = 16
const NUM_OF_MINES_MEDIUM = 40

const Minesweeper = () => {
    const [board, setBoard] = useState([])
    const [visitedCells, setVisitedCells] = useState([])
    const [moves, setMoves] = useState(0)
    const [gameOver, setGameOver] = useState(false)
    const [flagCounter, setFlagCounter] = useState(NUM_OF_MINES_MEDIUM)
    const [gameWon, setGameWon] = useState(false)
    const [showDialog, setShowDialog] = useState(false)
    const [dialogContent, setDialogContent] = useState({ title: '', description: '' })
    const [explodedMineIndex, setExplodedMineIndex] = useState(null)

    const initBoard = useCallback(() => {
        const newBoard = Array(MEDIUM_WIDTH_HEIGHT ** 2).fill(' ')
        let minesPlaced = 0
        while (minesPlaced < NUM_OF_MINES_MEDIUM) {
            const randomIndex = Math.floor(Math.random() * newBoard.length)
            if (newBoard[randomIndex] !== 'X') {
                newBoard[randomIndex] = 'X'
                minesPlaced++
            }
        }
        return newBoard.map((cell, index) => ({
            value: cell,
            hidden: true,
            flagged: false,
            index,
        }))
    }, [])

    useEffect(() => {
        resetGame()
    }, [initBoard])

    const resetGame = () => {
        const newBoard = initBoard()
        setBoard(calculateAdjacentMines(newBoard))
        setVisitedCells([])
        setMoves(0)
        setGameOver(false)
        setFlagCounter(NUM_OF_MINES_MEDIUM)
        setGameWon(false)
        setShowDialog(false)
        setExplodedMineIndex(null)
    };

    const calculateAdjacentMines = (board) => {
        return board.map((cell, index) => {
            if (cell.value === 'X') return cell
            let mineCount = 0
            const adjacentCells = getAdjacentCells(index)
            adjacentCells.forEach(adjIndex => {
                if (board[adjIndex] && board[adjIndex].value === 'X') mineCount++
            });
            return { ...cell, value: mineCount || ' ' }
        })
    }

    const getAdjacentCells = (index) => {
        const adjacentOffsets = [-17, -16, -15, -1, 1, 15, 16, 17]
        return adjacentOffsets.map(offset => index + offset).filter(adjIndex => {
            const adjRow = Math.floor(adjIndex / MEDIUM_WIDTH_HEIGHT);
            const adjCol = adjIndex % MEDIUM_WIDTH_HEIGHT;
            const currentRow = Math.floor(index / MEDIUM_WIDTH_HEIGHT);
            const currentCol = index % MEDIUM_WIDTH_HEIGHT;
            return adjIndex >= 0 && adjIndex < MEDIUM_WIDTH_HEIGHT ** 2 &&
                Math.abs(adjRow - currentRow) <= 1 && Math.abs(adjCol - currentCol) <= 1;
        })
    }

    const handleGameOver = (index) => {
        setGameOver(true)
        setExplodedMineIndex(index)
        revealAllMines()
        setDialogContent({ title: 'Game Over', description: 'You hit a mine!' })
        setShowDialog(true)
    }

    const handleWin = () => {
        setGameWon(true)
        setDialogContent({ title: 'Congratulations!', description: 'You won the game!' });
        setShowDialog(true)
    }

    const handleCellClick = (index) => {
        if (gameOver || gameWon || board[index].flagged) return;

        const newBoard = [...board];
        if (newBoard[index].value === 'X') {
            handleGameOver(index)
        } else {
            flood(index, newBoard)
            setBoard(newBoard)
            setMoves(moves + 1)
            checkWinCondition()
        }
    }

    const handleCellRightClick = (e, index) => {
        e.preventDefault()
        if (gameOver || gameWon || !board[index].hidden) return

        const newBoard = [...board]
        if (!newBoard[index].flagged && flagCounter === 0) return
        newBoard[index].flagged = !newBoard[index].flagged
        setBoard(newBoard)
        setFlagCounter(prevCounter => newBoard[index].flagged ? prevCounter - 1 : prevCounter + 1)
        checkWinCondition()
    }

    const flood = (index, newBoard) => {
        if (visitedCells.includes(index) || !newBoard[index].hidden) return

        newBoard[index].hidden = false;
        setVisitedCells([...visitedCells, index])

        if (newBoard[index].value === ' ') {
            const adjacentCells = getAdjacentCells(index)
            adjacentCells.forEach(adjIndex => flood(adjIndex, newBoard))
        }
    }

    const revealAllMines = () => {
        setBoard(board.map(cell => cell.value === 'X' ? { ...cell, hidden: false } : cell))
    }

    const checkWinCondition = () => {
        const allNonMinesCellsRevealed = board.every(cell => cell.value === 'X' || !cell.hidden)
        const allMinesFlagged = board.filter(cell => cell.value === 'X').every(cell => cell.flagged)

        if (allNonMinesCellsRevealed || allMinesFlagged) {
            handleWin()
        }
    }

    return (
        <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md">
            <GameStatus
                flagCounter={flagCounter}
                moves={moves}
                gameOver={gameOver}
                gameWon={gameWon}
                onReset={resetGame}
            />
            <Board
                board={board}
                onCellClick={handleCellClick}
                onCellRightClick={handleCellRightClick}
                gameOver={gameOver}
                explodedMineIndex={explodedMineIndex}
            />
            <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{dialogContent.title}</AlertDialogTitle>
                        <AlertDialogDescription>{dialogContent.description}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => setShowDialog(false)}>Close</AlertDialogAction>
                        <AlertDialogAction onClick={resetGame}>New Game</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default Minesweeper