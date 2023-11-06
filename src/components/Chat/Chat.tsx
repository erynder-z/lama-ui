import { useState } from 'react'
import InputField from './InputField/InputField'
import OutputField from './OutputField/OutputField'

type ChatProps = {
  selectedModel: Model
}

type Model = {
  name: string
  modified_at: string
  size: number
}

export default function Chat({ selectedModel }: ChatProps) {
  const [inputText, setInputText] = useState<string>('')
  const [outputText, setOutputText] = useState<string>('')

  const { name } = selectedModel

  return (
    <div className="w-full col-start-2 row-start-1 row-span-3 grid grid-cols-1 grid-rows-3 md:my-40 p-4 leading-7 text-lg bg-stone-300">
      <div className="row-span-2">
        <header className="text-3xl font-bold">{name}</header>
        <OutputField />
      </div>
      <div className="row-span-1 mt-auto">
        <InputField inputText={inputText} setInputText={setInputText} />
      </div>
    </div>
  )
}
