const InstructionsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-4">Minesweeper Instructions</h2>
        <div className="space-y-2">
          <p>You are presented with a grid of 16x16 cells.</p>
          <p>Some cells contain mines (bombs), others don't. Your job is to flag all the mines.</p>
          <p>Left click on a cell to reveal it. If you reveal a mine, you lose the game.</p>
          <p>Revealing a cell with a number tells you how many mines are adjacent to that cell.</p>
          <p>Right click on a cell to flag it as a potential mine.</p>
          <p>The game is won when all safe cells are revealed and all mines are flagged.</p>
          <p>The flag counter at the top shows how many flags you have left to place.</p>
          <p>The smiley face can be clicked to start a new game at any time.</p>
        </div>
        <button
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default InstructionsModal