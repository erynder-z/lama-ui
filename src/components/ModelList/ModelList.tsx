import { useEffect, useRef, useState } from 'react'
import RescanButton from './RescanButton/RescanButton'
import ModelSelect from './ModelSelect/ModelSelect'

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

  const LoadingContent = <p className="text-white">Loading...</p>

  const NormalContent =
    modelList.length === 0 ? (
      <div className="flex flex-col items-start text-white">
        <p className="">No models found</p>
        <RescanButton setLoading={setLoading} getModelInfo={getModelInfo} />
      </div>
    ) : (
      <ModelSelect modelList={modelList} setSelectedModel={setSelectedModel} />
    )

  return (
    <section className="w-1/2 mx-auto my-auto ">
      {loading ? LoadingContent : NormalContent}
    </section>
  )
}
