import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useAddUserMutation } from '../services/user'
import { User } from '../types/user'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  closeModal,
  modalStateSelector,
} from '../features/createUserFormModalSlice'

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
  const [createUser] = useAddUserMutation()

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
      await createUser({ ...data, createdAt: new Date() }).unwrap()
      dispatch(closeModal())
      reset()
    } catch (err) {
      console.error('Failed to create user: ', err)
    }
  }

  return (
    <>
      {isModalOpen && (
        <div className="fixed overflow-y-auto inset-0 bg-black bg-opacity-50 flex  justify-center z-50">
          <div className="bg-white  rounded shadow-lg w-full max-w-md ">
            <h2 className="text-xl px-6 pt-6 font-semibold mb-2">
              Add New User
            </h2>

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
    </>
  )
}

export default UserForm
