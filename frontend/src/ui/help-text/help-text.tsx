import { useHelpTextStore } from './store'

export const HelpText = () => {
  const title = useHelpTextStore(s => s.title)
  const helpText = useHelpTextStore(s => s.helpText)

  return (
    <div className="flex-1 pt-1 pb-2">
      <p className="text-xl text-gray-800">{title}</p>
      {title ? <div className="mt-2 mb-2 w-full border border-gray-800" /> : <></>}
      <p className="text-base text-gray-800">{helpText}</p>
    </div>
  )
}
