import { Flag, Bomb, X, Skull } from 'lucide-react'

const Cell = ({ value, hidden, flagged, onClick, onContextMenu, gameOver, isExploded }) => {
    const getCellContent = () => {
        if (flagged) {
            return <Flag size={16} color="red" />
        }
        if (!hidden && value === 'X') {
            return <Bomb size={16} />
        }
        if (!hidden && value !== ' ') {
            return value
        }
        return null
    }

    const getCellClass = () => {
        let className = 'w-6 h-6 border border-gray-400 flex items-center justify-center text-sm font-bold cursor-pointer ';
        if (hidden && !gameOver) {
            className += 'bg-gray-200 '
        } else if (gameOver) {
            if (value === 'X' && !flagged) {
                className += 'bg-red-500 '
            } else if (value === 'X' && flagged) {
                className += 'bg-green-500 '
            } else if (flagged) {
                className += 'bg-yellow-200 '
            } else {
                className += 'bg-white '
            }
        } else {
            className += 'bg-white '
        }
        return className;
    };

    return (
        <div
            className={getCellClass()}
            onClick={onClick}
            onContextMenu={onContextMenu}
        >
            {getCellContent()}
            {gameOver && flagged && value !== 'X' && <X size={16} className="absolute text-red-500" />}
            {isExploded && <Skull size={16} className="absolute" />}
        </div>
    )
}

export default Cell