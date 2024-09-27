import Cell from './Cell'

const Board = ({ board, onCellClick, onCellRightClick, gameOver, explodedMineIndex }) => (
    <div className="grid grid-cols-16 gap-0 bg-gray-400 p-2 rounded w-max">
        {board.map((cell) => (
            <Cell
                key={cell.index}
                {...cell}
                onClick={() => onCellClick(cell.index)}
                onContextMenu={(e) => onCellRightClick(e, cell.index)}
                gameOver={gameOver}
                isExploded={cell.index === explodedMineIndex}
            />
        ))}
    </div>
)

export default Board