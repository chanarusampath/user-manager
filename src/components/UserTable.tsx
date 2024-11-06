import { useMemo, useState } from 'react'
import { useAddUserMutation, useGetAllUsersQuery } from '../services/user'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { User } from '../types/user'
import {
  ArrowDownUp,
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
} from 'lucide-react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CityPieChart from './PieChart'

type FormData = Omit<User, 'id'>

const countries = ['USA', 'Canada', 'UK']
const citiesByCountry = {
  USA: ['New York', 'Los Angeles', 'Chicago'],
  Canada: ['Toronto', 'Vancouver', 'Montreal'],
  UK: ['London', 'Manchester', 'Birmingham'],
}

const UserTable = () => {
  const { data: users = [], isLoading, error } = useGetAllUsersQuery()
  const [sorting, setSorting] = useState<SortingState>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [createUser] = useAddUserMutation()

  // Define columns for the table
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

  // Set up the form with React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    reset,
  } = useForm<FormData>()
  const selectedCountry = watch('country')

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await createUser(data).unwrap()
      setIsModalOpen(false)
      reset()
    } catch (err) {
      console.error('Failed to create user: ', err)
    }
  }

  // Initialize the table instance
  const table = useReactTable({
    data: users,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  if (isLoading) return <div className="text-center p-4">Loading...</div>
  if (error)
    return <div className="text-center text-red-500 p-4">Error occurred!</div>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Table</h1>

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

      {/* Modal for Adding User */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New User</h2>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 p-4 max-w-md mx-auto bg-white rounded shadow"
            >
              {/* Name */}
              <div>
                <label className="block font-medium">Name</label>
                <input
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  className={`block w-full mt-1 p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block font-medium">Email</label>
                <input
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: 'Invalid email address',
                    },
                  })}
                  className={`block w-full mt-1 p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Age */}
              <div>
                <label className="block font-medium">Age</label>
                <input
                  type="number"
                  {...register('age', { required: 'Age is required', min: 1 })}
                  className={`block w-full mt-1 p-2 border ${errors.age ? 'border-red-500' : 'border-gray-300'} rounded`}
                />
                {errors.age && (
                  <p className="text-red-500 text-sm">{errors.age.message}</p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="block font-medium">Gender</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="male"
                      {...register('gender', {
                        required: 'Gender is required',
                      })}
                      className="mr-2"
                    />
                    Male
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="female"
                      {...register('gender', {
                        required: 'Gender is required',
                      })}
                      className="mr-2"
                    />
                    Female
                  </label>
                </div>
                {errors.gender && (
                  <p className="text-red-500 text-sm">
                    {errors.gender.message}
                  </p>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block font-medium">Date of Birth</label>
                <Controller
                  control={control}
                  name="dob"
                  rules={{ required: 'Date of Birth is required' }}
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      dateFormat="yyyy-MM-dd"
                      className={`block w-full mt-1 p-2 border ${errors.dob ? 'border-red-500' : 'border-gray-300'} rounded`}
                      placeholderText="Select Date"
                    />
                  )}
                />
                {errors.dob && (
                  <p className="text-red-500 text-sm">{errors.dob.message}</p>
                )}
              </div>

              {/* Country */}
              <div>
                <label className="block font-medium">Country</label>
                <select
                  {...register('country', { required: 'Country is required' })}
                  className={`block w-full mt-1 p-2 border ${errors.country ? 'border-red-500' : 'border-gray-300'} rounded`}
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                {errors.country && (
                  <p className="text-red-500 text-sm">
                    {errors.country.message}
                  </p>
                )}
              </div>

              {/* City */}
              <div>
                <label className="block font-medium">City</label>
                <select
                  {...register('city', { required: 'City is required' })}
                  className={`block w-full mt-1 p-2 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded`}
                  disabled={!selectedCountry}
                >
                  <option value="">Select City</option>
                  {(
                    citiesByCountry[
                      selectedCountry as keyof typeof citiesByCountry
                    ] || []
                  ).map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                {errors.city && (
                  <p className="text-red-500 text-sm">{errors.city.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-4 p-2 bg-blue-500 text-white rounded"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="space-y-8">
        <h2 className="text-xl font-bold">User Distribution</h2>

        <section>
          <h3 className="text-lg">Gender Distribution</h3>
          <CityPieChart users={users} field="gender" width={300} height={300} />
        </section>

        <section>
          <h3 className="text-lg">City Distribution</h3>
          <CityPieChart users={users} field="city" width={300} height={300} />
        </section>
      </div>
    </div>
  )
}

export default UserTable
