import { cn } from '../../lib/cn'

const DataTable = ({ columns, data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="card overflow-hidden">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800" />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 border-b border-gray-100 dark:border-gray-800 flex items-center px-4 gap-4">
              <div className="h-10 w-16 bg-gray-100 dark:bg-gray-800 rounded" />
              <div className="h-4 w-1/4 bg-gray-100 dark:bg-gray-800 rounded" />
              <div className="h-4 w-1/6 bg-gray-100 dark:bg-gray-800 rounded" />
              <div className="h-8 w-24 bg-gray-100 dark:bg-gray-800 rounded ml-auto" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="card overflow-hidden border-none shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
              {columns.map((col, i) => (
                <th 
                  key={i} 
                  className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {data.map((row, rowIndex) => (
              <tr 
                key={rowIndex} 
                className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
              >
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 text-sm whitespace-nowrap">
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        
        {data.length === 0 && (
          <div className="py-12 text-center text-gray-500 dark:text-gray-400">
            No data available to display.
          </div>
        )}
      </div>
    </div>
  )
}

export default DataTable
