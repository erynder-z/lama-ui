import Chat from './components/Chat/Chat'

export default function App() {
  return (
    <div className="h-screen w-screen flex md:grid grid-cols-3 grid-rows-3 bg-slate-700 font-mainFont">
      <Chat />
    </div>
  )
}
