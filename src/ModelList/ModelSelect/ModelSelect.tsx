import Select from 'react-select'

type ModelSelectProps = {
  modelList: Model[]
  setSelectedModel: React.Dispatch<React.SetStateAction<Model>>
}

type Model = {
  name: string
  modified_at: string
  size: number
}

export default function ModelSelect({
  modelList,
  setSelectedModel,
}: ModelSelectProps) {
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
  )
}
