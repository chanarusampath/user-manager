import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User } from '../types/user'

export const userApi = createApi({
  reducerPath: 'user',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/' }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<Array<User>, void>({
      query: () => 'users',
    }),
    getUserById: builder.query<User, number>({
      query: (id) => `users/${id}`,
    }),
    addUser: builder.mutation<User, Partial<User>>({
      query: (newPost) => ({
        url: 'users',
        method: 'POST',
        body: newPost,
      }),
    }),
  }),
})

export const { useGetAllUsersQuery, useGetUserByIdQuery, useAddUserMutation } =
  userApi
