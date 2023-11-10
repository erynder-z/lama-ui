import { useState } from 'react'
import ModelList from './components/ModelList/ModelList'
import Chat from './components/Chat/Chat'

type Model = {
  name: string
  modified_at: string
  size: number
}

export default function App() {
  const [selectedModel, setSelectedModel] = useState<Model>({} as Model)
  return (
    <div className="h-screen w-screen flex md:grid grid-cols-3 grid-rows-3 bg-slate-700 font-mainFont">
      <ModelList setSelectedModel={setSelectedModel} />
      <Chat selectedModel={selectedModel} />
    </div>
  )
}
