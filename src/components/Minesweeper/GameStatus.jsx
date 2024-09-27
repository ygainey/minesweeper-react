import { Flag, Skull, ThumbsUp, Smile } from 'lucide-react'

const GameStatus = ({ flagCounter, moves, gameOver, gameWon, onReset }) => (
    <div className="flex justify-between items-center w-full mb-4 bg-gray-300 p-2 rounded">
        <div className="flex items-center">
            <Flag size={20} color="red" />
            <span className="ml-2 font-bold">{flagCounter}</span>
        </div>
        <div
            className={`reset cursor-pointer p-2 rounded-full ${gameOver ? 'bg-red-500' : gameWon ? 'bg-green-500' : 'bg-yellow-500'}`}
            onClick={onReset}
        >
            {gameOver ? <Skull size={24} /> : gameWon ? <ThumbsUp size={24} /> : <Smile size={24} />}
        </div>
        <div className="font-bold">{moves} moves</div>
    </div>
)

export default GameStatus