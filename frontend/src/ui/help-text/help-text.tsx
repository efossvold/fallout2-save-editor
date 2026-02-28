import { useHelpTextStore } from './store'

export const HelpText = () => {
  const title = useHelpTextStore(s => s.title)
  const helpText = useHelpTextStore(s => s.helpText)

  return (
    <div className="pt-1 pb-2 flex-1">
      <p className="text-xl text-gray-800">{title}</p>
      {title ? <div className="w-full border border-gray-800 mt-2 mb-2" /> : <></>}
      <p className="text-base text-gray-800">{helpText}</p>
    </div>
  )
}
