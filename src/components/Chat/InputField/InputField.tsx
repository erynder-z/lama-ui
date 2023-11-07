import { useEffect, useRef, useState } from 'react'
import { TbSend, TbSendOff } from 'react-icons/tb'

type InputFieldProps = {
  inputText: string
  setInputText: React.Dispatch<React.SetStateAction<string>>
  submitPrompt: () => void
  isSubmitting: boolean
}

export default function InputField({
  inputText,
  setInputText,
  submitPrompt,
  isSubmitting,
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

  useEffect(() => {
    if (textareaRef.current) {
      autoResizeTextarea(textareaRef.current)
    }
  }, [])

  return (
    <>
      <div className="relative z-0 flex bg-slate-200 border-l-4 border-indigo-400 text-slate-900">
        <textarea
          ref={textareaRef}
          rows={textareaRows}
          required
          autoComplete="off"
          disabled={isSubmitting}
          id="textInput"
          name="textInput"
          className={`${
            isSubmitting
              ? 'bg-gray-400 text-gray-600'
              : 'bg-transparent text-slate-900'
          } block p-2 w-full max-h-40 overflow-y-auto text-sm border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer overflow-hidden resize-none`}
          placeholder=" "
          value={inputText}
          onChange={handleTextareaChange}
        />
        <button
          onClick={submitPrompt}
          disabled={isSubmitting}
          className="w-20 p-4 flex justify-center items-center bg-indigo-400 hover:bg-indigo-500"
        >
          {isSubmitting ? (
            <TbSendOff size="1.75em" />
          ) : (
            <TbSend size="1.75em" />
          )}
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
