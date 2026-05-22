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

  // Parse columns for mobile card layout
  const mediaCol = columns.find(col => /thumb|cover|image/i.test(col.header || ''))
  const actionCol = columns.find(col => /action/i.test(col.header || ''))
  const titleCol = columns.find(col => /title|info|name/i.test(col.header || '')) || 
                   columns.find(col => col !== mediaCol && col !== actionCol) ||
                   columns[0]
  const infoCols = columns.filter(col => col !== mediaCol && col !== titleCol && col !== actionCol)

  return (
    <div className="space-y-4">
      {/* Desktop view: Table */}
      <div className="hidden md:block card overflow-hidden border-none shadow-card">
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

      {/* Mobile view: Card Layout */}
      <div className="md:hidden space-y-4">
        {data.map((row, rowIndex) => (
          <div 
            key={rowIndex} 
            className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 rounded-2xl flex flex-col gap-3 shadow-sm"
          >
            {/* Header row: Media + Title + Actions */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0 flex-1">
                {mediaCol && (
                  <div className="flex-shrink-0">
                    {mediaCol.render ? mediaCol.render(row) : row[mediaCol.accessor]}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  {titleCol && (
                    titleCol.render ? titleCol.render(row) : (
                      <p className="font-semibold text-gray-900 dark:text-white truncate">{row[titleCol.accessor]}</p>
                    )
                  )}
                </div>
              </div>
              {actionCol && (
                <div className="flex-shrink-0">
                  {actionCol.render ? actionCol.render(row) : row[actionCol.accessor]}
                </div>
              )}
            </div>

            {/* Info row(s) */}
            {infoCols.length > 0 && (
              <div className="border-t border-gray-100 dark:border-gray-800 pt-3 flex flex-col gap-2 text-sm">
                {infoCols.map((col, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{col.header}:</span>
                    <div className="dark:text-gray-300 text-right">
                      {col.render ? col.render(row) : row[col.accessor]}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {data.length === 0 && (
          <div className="py-12 text-center text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl">
            No data available to display.
          </div>
        )}
      </div>
    </div>
  )
}

export default DataTable
