import { useEffect, useRef, useState } from 'react'
import Select from 'react-select'
import RescanButton from './RescanButton/RescanButton'

type ModelListProps = {
  setSelectedModel: React.Dispatch<React.SetStateAction<Model>>
}

type Model = {
  name: string
  modified_at: string
  size: number
}

type Response = {
  models: Model[]
}

export default function ModelList({
  setSelectedModel,
}: ModelListProps): JSX.Element {
  const [modelList, setModelList] = useState<Model[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const shouldGetModelInfo = useRef<boolean>(true)

  const getModelInfo = async (): Promise<void> => {
    try {
      const res = await fetch('http://localhost:11434/api/tags')
      const data: Response = await res.json()
      setModelList(data.models)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (shouldGetModelInfo.current) getModelInfo()

    return () => {
      shouldGetModelInfo.current = false
    }
  }, [])

  const colorStyles = {
    control: (styles: Record<string, unknown>) => ({
      ...styles,
      backgroundColor: 'white',
      fontSize: '0.875rem;',
    }),
    option: (
      styles: Record<string, unknown>,
      { isFocused, isSelected }: { isFocused: boolean; isSelected: boolean },
    ) => {
      return {
        ...styles,
        fontSize: '0.875rem;',

        backgroundColor: isSelected
          ? '#818cf8'
          : isFocused
          ? '#eef2ff'
          : 'white',
      }
    },
  }

  const modelOptions = modelList.map(model => ({
    value: model,
    label: model.name,
  }))

  return (
    <section className="w-1/2 mx-auto my-auto ">
      {loading ? (
        <p className="text-white">Loading...</p>
      ) : modelList.length === 0 ? (
        <div className="flex flex-col items-start text-white">
          <p className="">No models found</p>
          <RescanButton setLoading={setLoading} getModelInfo={getModelInfo} />
        </div>
      ) : (
        <div>
          <h1 className="text-white">Model List</h1>
          <Select
            options={modelOptions}
            styles={colorStyles}
            onChange={selectedOption => {
              if (selectedOption !== null) {
                setSelectedModel(selectedOption.value as Model)
              }
            }}
          />
        </div>
      )}
    </section>
  )
}
