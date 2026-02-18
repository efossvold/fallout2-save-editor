import { useAPIStore } from './store'

export const StoreDebuggerPanel = () => {
  const data = useAPIStore(s => s.data)

  return (
    <div className="@container py-1 p-2 my-1 h-full rounded-sm bg-gray-50">
      <h1 className="text-gray-700">Data</h1>

      <div className="text-xs overflow-scroll max-h-[calc(100vh-2.5rem)]">
        {Object.entries(data).map(([name, value]) => (
          <div key={name}>
            <span className="text-gray-500">{name}</span>
            <span className="text-gray-900 ml-px mr-2">:</span>
            {typeof value === 'number' ? (
              <span className="text-red-400">{value}</span>
            ) : (
              <span className="text-green-600">"{value}"</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
