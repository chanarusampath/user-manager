import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useAddUserMutation, useUpdateUserMutation } from '../services/user'
import { User } from '../types/user'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  closeModal,
  modalStateSelector,
  modalTypeSelector,
} from '../features/createUserFormModalSlice'
import { useEffect, useState } from 'react'
import { CircleX } from 'lucide-react'
import { selectedUserSelector, setSelectedUser } from '../features/userSlice'

const countries = ['USA', 'Canada', 'UK']
const citiesByCountry = {
  USA: ['New York', 'Los Angeles', 'Chicago'],
  Canada: ['Toronto', 'Vancouver', 'Montreal'],
  UK: ['London', 'Manchester', 'Birmingham'],
}

type FormData = Omit<User, 'id' | 'createdAt'>

const UserForm = () => {
  const dispatch = useAppDispatch()
  const isModalOpen = useAppSelector(modalStateSelector)
  const modalType = useAppSelector(modalTypeSelector)
  const selectedUser = useAppSelector(selectedUserSelector)
  const [createUser] = useAddUserMutation()
  const [updateUser] = useUpdateUserMutation()
  const [calculatedAge, setCalculatedAge] = useState<number | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    reset,
  } = useForm<FormData>()

  useEffect(() => {
    if (selectedUser) {
      reset(selectedUser)
    } else {
      reset()
    }
  }, [selectedUser, reset])

  const selectedCountry = watch('country')
  const dob = watch('dob')

  // Calculate age based on DOB
  useEffect(() => {
    if (dob) {
      const ageDiff = new Date().getFullYear() - new Date(dob).getFullYear()
      setCalculatedAge(ageDiff)
    } else {
      setCalculatedAge(null)
    }
  }, [dob])

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      if (modalType === 'create') {
        await createUser({ ...data, createdAt: new Date() }).unwrap()
      } else {
        await updateUser({ ...selectedUser, ...data }).unwrap()
      }

      dispatch(closeModal())
      reset()
    } catch (err) {
      console.error('Failed to create user: ', err)
    }
  }

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg sm:mx-4 md:mx-8 p-6 bg-white rounded-lg shadow-lg mx-2">
            <div className="flex item-center justify-between">
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Add New User
              </h2>

              <button
                onClick={() => {
                  dispatch(setSelectedUser(undefined))
                  dispatch(closeModal())
                }}
              >
                <CircleX />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  className={`block w-full mt-1 p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium">Email</label>
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
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* DOB and Age */}
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium">
                    Date of Birth
                  </label>
                  <Controller
                    control={control}
                    name="dob"
                    rules={{ required: 'Date of Birth is required' }}
                    render={({ field }) => (
                      <DatePicker
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                        dateFormat="yyyy-MM-dd"
                        className={`block w-full mt-1 p-2 border ${
                          errors.dob ? 'border-red-500' : 'border-gray-300'
                        } rounded`}
                        placeholderText="Select Date"
                      />
                    )}
                  />
                  {errors.dob && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.dob.message}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium">Age</label>
                  <input
                    type="number"
                    value={calculatedAge || ''}
                    readOnly
                    className="block w-full mt-1 p-2 border border-gray-300 bg-gray-100 rounded"
                  />
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium">Gender</label>
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
                  <p className="text-red-500 text-xs mt-1">
                    {errors.gender.message}
                  </p>
                )}
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium">Country</label>
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
                  <p className="text-red-500 text-xs mt-1">
                    {errors.country.message}
                  </p>
                )}
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium">City</label>
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
                  <p className="text-red-500 text-xs mt-1">
                    {errors.city.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                {modalType === 'create' ? 'Submit' : 'Update'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default UserForm
