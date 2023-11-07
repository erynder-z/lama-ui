type RescanButtonProps = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  getModelInfo: () => void
}

export default function RescanButton({
  setLoading,
  getModelInfo,
}: RescanButtonProps) {
  return (
    <button
      onClick={() => {
        setLoading(true)
        getModelInfo()
      }}
      className="px-4 py-2 bg-amber-600 text-white"
    >
      Rescan
    </button>
  )
}
