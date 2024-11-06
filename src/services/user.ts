import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User } from '../types/user'
import { PaginatedResponse, Pagination } from '../types/pagination'

export const userApi = createApi({
  reducerPath: 'user',
  tagTypes: ['Users'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/' }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<PaginatedResponse<User>, Pagination>({
      query: ({ pageIndex, pageSize }) => {
        if (pageIndex !== undefined && pageSize !== undefined) {
          // If pagination params are provided, return paginated data
          return `users?_page=${pageIndex + 1}&_limit=${pageSize}`
        }
        // If no pagination params, return all data
        return 'users'
      },
      transformResponse: (response: User[], meta) => {
        // Get the total count from headers
        const totalItems = parseInt(
          meta?.response?.headers.get('X-Total-Count') || '0',
          10
        )

        return { data: response, totalItems }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Users' as const, id })),
              { type: 'Users', id: 'LIST' },
            ]
          : [{ type: 'Users', id: 'LIST' }],
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
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
  }),
})

export const { useGetAllUsersQuery, useGetUserByIdQuery, useAddUserMutation } =
  userApi
