import './App.css'
import { useState } from 'react'
import Minesweeper from './components/Minesweeper'
import InstructionsModal from './components/InstructionsModal'

const App = () => {
  const [showInstructions, setShowInstructions] = useState(false)

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      <div className="h-[90%] bg-windows-main bg-cover bg-center relative overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-white mb-4">Minesweeper</h1>
          <Minesweeper />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-windows-taskbar bg-cover bg-center" />
      </div>
      <div className="h-[10%] flex items-center justify-center">
        <button
          onClick={() => setShowInstructions(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Instructions
        </button>
      </div>
      <InstructionsModal isOpen={showInstructions} onClose={() => setShowInstructions(false)} />
    </div>
  )
}

export default App