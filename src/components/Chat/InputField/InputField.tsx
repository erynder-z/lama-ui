import { useEffect, useRef, useState } from 'react'

type InputFieldProps = {
  inputText: string
  setInputText: React.Dispatch<React.SetStateAction<string>>
}

export default function InputField({
  inputText,
  setInputText,
}: InputFieldProps) {
  const [textareaRows, setTextareaRows] = useState(4)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setInputText(event.target.value)
    autoResizeTextarea(event.target)
  }

  const autoResizeTextarea = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
    setTextareaRows(textarea.rows)
  }

  const handleSubmit = () => {
    console.log(inputText)
  }

  useEffect(() => {
    if (textareaRef.current) {
      autoResizeTextarea(textareaRef.current)
    }
  }, [])

  return (
    <>
      <div className="relative z-0 flex bg-slate-200 border-l-4 border-indigo-400">
        <textarea
          ref={textareaRef}
          rows={textareaRows}
          required
          autoComplete="off"
          id="textInput"
          name="textInput"
          className="block p-2 w-full max-h-40 overflow-y-auto text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer overflow-hidden resize-none"
          placeholder=" "
          value={inputText}
          onChange={handleTextareaChange}
        />
        <button
          onClick={handleSubmit}
          className="p-4 bg-indigo-400 hover:bg-indigo-500"
        >
          Send
        </button>
        <label
          htmlFor="textInput"
          className="absolute duration-300 transform -translate-y-6 scale-75 top-1 left-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:-top-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6 peer-focus:rounded peer-focus:px-2 peer-focus:scale-75"
        >
          What's on your mind?
        </label>
      </div>
    </>
  )
}
