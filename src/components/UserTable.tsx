import { useMemo, useState } from 'react'
import { useGetAllUsersQuery } from '../services/user'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { User } from '../types/user'
import {
  ArrowDownUp,
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
} from 'lucide-react'

const UserTable = ({
  setIsModalOpen,
  pageSize = 10,
}: {
  setIsModalOpen: (val: boolean) => void
  pageSize?: number
}) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  })
  const { data: response, isLoading, error } = useGetAllUsersQuery(pagination)

  const users = response?.data || []

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        cell: (info) => info.getValue(),
        enableSorting: true,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        cell: (info) => info.getValue(),
        enableSorting: true,
      },
      {
        accessorKey: 'age',
        header: 'Age',
        cell: (info) => info.getValue(),
        enableSorting: true,
      },
      {
        accessorKey: 'gender',
        header: 'Gender',
        cell: (info) => info.getValue(),
        enableSorting: true,
      },
      {
        accessorKey: 'dob',
        header: 'Date of Birth',
        cell: (info) => new Date(info.getValue() as Date).toLocaleDateString(),
        enableSorting: true,
      },
      {
        accessorKey: 'country',
        header: 'Country',
        cell: (info) => info.getValue(),
        enableSorting: true,
      },
      {
        accessorKey: 'city',
        header: 'City',
        cell: (info) => info.getValue(),
        enableSorting: true,
      },
    ],
    []
  )

  const table = useReactTable({
    data: users,
    columns,
    state: {
      sorting,
      pagination: { pageIndex: pagination.pageIndex - 1, pageSize },
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    pageCount: response
      ? Math.ceil(response?.totalItems / pagination.pageSize)
      : -1,
  })

  if (isLoading) return <div className="text-center p-4">Loading...</div>
  if (error)
    return <div className="text-center text-red-500 p-4">Error occurred!</div>

  debugger

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">User Table</h1>

      {/* Button to Open Modal */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        Add User
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="px-4 py-2 text-left font-semibold text-gray-700 cursor-pointer select-none"
                  >
                    <div className="flex items-center">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      <span className="ml-1">
                        {header.column.getIsSorted() === 'asc' ? (
                          <ArrowUpNarrowWide className="w-4 h-4 text-gray-600" />
                        ) : header.column.getIsSorted() === 'desc' ? (
                          <ArrowDownWideNarrow className="w-4 h-4 text-gray-600" />
                        ) : (
                          <ArrowDownUp className="w-4 h-4 text-gray-400" />
                        )}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-2">
        <div>
          <div className="flex items-center mt-2">
            <span>Show</span>
            <select
              value={pagination.pageSize}
              onChange={(e) =>
                setPagination((prev) => ({
                  ...prev,
                  pageSize: Number(e.target.value),
                }))
              }
              className="mx-2 p-1 border rounded"
            >
              {[5, 10, 20, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span>rows per page</span>
          </div>
        </div>
        <div className="flex gap-4 items-center justify-center">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span>
            Page {pagination.pageIndex + 1} of {table.getPageCount()}
          </span>

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserTable
