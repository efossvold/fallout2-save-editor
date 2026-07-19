import { useHelpTextStore } from './store'

export const HelpText = () => {
  const title = useHelpTextStore(s => s.title)
  const helpText = useHelpTextStore(s => s.helpText)

  return (
    <div className="pb-2 pt-1 flex-1">
      <p className="text-xl text-gray-800">{title}</p>
      {title ? <div className="mb-2 mt-2 border border-gray-800 w-full" /> : <></>}
      <p className="text-base text-gray-800">{helpText}</p>
    </div>
  )
}
