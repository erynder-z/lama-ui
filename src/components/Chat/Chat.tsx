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

type ModelResponse = {
  model: string
  created_at: string
  response: string
  context: number[]
  done: boolean
  total_duration: number
  load_duration: number
  sample_count: number
  sample_duration: number
  prompt_eval_count: number
  prompt_eval_duration: number
  eval_count: number
  eval_duration: number
}

export default function Chat({ selectedModel }: ChatProps) {
  const [inputText, setInputText] = useState<string>('')
  const [outputText, setOutputText] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const submitPrompt = async () => {
    if (selectedModel) {
      setIsSubmitting(true)
      try {
        const apiEndpoint = 'http://localhost:11434/api/generate'
        const modelName = selectedModel.name
        const userPrompt = inputText
        const shouldReturnStream = false

        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: modelName,
            prompt: userPrompt,
            stream: shouldReturnStream,
          }),
        })

        const modelResponse: ModelResponse = await response.json()
        setOutputText(modelResponse.response)
      } catch (error) {
        console.log(error)
      } finally {
        setIsSubmitting(false)
        setInputText('')
      }
    }
  }

  return (
    <div className="w-full col-start-2 row-start-1 row-span-3 grid grid-cols-1 grid-rows-3 md:my-40 p-4 leading-7 text-lg bg-stone-300">
      <div className="row-span-2">
        <header className="text-3xl font-bold">{selectedModel.name}</header>
        <OutputField />
      </div>
      <div className="row-span-1 mt-auto">
        <InputField
          inputText={inputText}
          setInputText={setInputText}
          submitPrompt={submitPrompt}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  )
}
