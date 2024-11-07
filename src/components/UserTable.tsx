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
import { useAppDispatch } from '../store/hooks'
import { openModal } from '../features/createUserFormModalSlice'
import { debounce } from 'lodash'

const UserTable = ({ pageSize = 100 }: { pageSize?: number }) => {
  const dispatch = useAppDispatch()
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  })
  const [search, setSearchTerm] = useState('')

  // Debounced function for search input
  const debouncedSearch = debounce((value) => {
    setSearchTerm(value)
  }, 300)

  // Fetch users with search term and pagination
  const {
    data: response,
    isLoading,
    error,
  } = useGetAllUsersQuery({
    ...pagination,
    search,
  })

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
      pagination,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    rowCount: response?.totalItems,
    manualPagination: true,
  })

  if (isLoading) return <div className="text-center p-4">Loading...</div>
  if (error)
    return <div className="text-center text-red-500 p-4">Error occurred!</div>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">User Table</h1>

      {/* Search Field and Add User Button */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          onChange={(e) => debouncedSearch(e.target.value)}
          className="border rounded p-2 flex-1 mr-4"
        />

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => dispatch(openModal())}
        >
          Add User
        </button>
      </div>

      {/* Users Table */}
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
        <div className="flex gap-4 items-center justify-center">
          <button
            onClick={() => table.previousPage()}
            disabled={!response?.prev}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span>
            Page {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount().toLocaleString()}
          </span>

          <button
            onClick={() => table.nextPage()}
            disabled={!response?.next}
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
