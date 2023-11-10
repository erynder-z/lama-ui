/* eslint no-constant-condition: ["error", { "checkLoops": false }] */
import { useEffect, useState } from 'react'
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
  const [modelResponse, setModelResponse] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isGeneratingReponse, setIsGeneratingResponse] =
    useState<boolean>(false)

  const submitPrompt = async () => {
    const isModelSelected = selectedModel.size

    if (isModelSelected) {
      setIsSubmitting(true)
      setIsGeneratingResponse(true)
      try {
        const apiEndpoint = 'http://localhost:11434/api/generate'
        const modelName = selectedModel.name
        const userPrompt = inputText

        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: modelName,
            prompt: userPrompt,
          }),
        })

        if (response.body) {
          const reader = response.body.getReader()
          const decoder = new TextDecoder()

          const processStream = async () => {
            while (true) {
              const { done, value } = await reader.read()
              if (done) {
                setIsGeneratingResponse(false)
                break
              }

              const chunk = decoder.decode(value)
              const parsedChunk = JSON.parse(chunk)
              const { response } = parsedChunk

              setModelResponse(prevResponse => prevResponse + response)
            }
          }

          processStream()
        }
      } catch (error) {
        setError('Something went wrong!')
        setTimeout(() => {
          setError(null)
        }, 3000)
      } finally {
        setIsSubmitting(false)
        setInputText('')
      }
    } else {
      setError('Please select a model!')
      setTimeout(() => {
        setError(null)
      }, 3000)
    }
  }

  return (
    <div className="w-full col-start-2 row-start-1 row-span-3 grid grid-cols-1 grid-rows-3 md:my-40 p-4 leading-7 text-lg bg-stone-300">
      <div className="row-span-2 w-full">
        <header className="text-3xl font-bold">{selectedModel.name}</header>
        <OutputField />
        {error && <p className="font-bold text-red-500">{error}</p>}
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
