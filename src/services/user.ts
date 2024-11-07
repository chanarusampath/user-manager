import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User } from '../types/user'
import { PaginatedResponse, Pagination } from '../types/pagination'

export const userApi = createApi({
  reducerPath: 'user',
  tagTypes: ['Users'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/' }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<PaginatedResponse<User>, Pagination>({
      query: ({ pageIndex, pageSize, search }) => {
        if (pageIndex !== undefined && pageSize !== undefined) {
          return `users?_page=${pageIndex + 1}&_per_page=${pageSize}&_sort=createdAt${search ? `&name=${search}` : ''}`
        }
        return `users?_sort=createdAt&_order=desc${search ? `&_name_like=${search}` : ''}`
      },
      transformResponse: (
        response: {
          data: User[]
          items: number
          next?: number
          prev?: number
          pages: number
        } & User[]
      ) => {
        return {
          data: response.data || response,
          totalItems: response.items,
          next: response.next,
          prev: response.prev,
          pages: response.pages,
        }
      },
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({
                type: 'Users' as const,
                id,
              })),
              { type: 'Users', id: 'LIST' },
            ]
          : [{ type: 'Users', id: 'LIST' }],
    }),
    getUserById: builder.query<User, number>({
      query: (id) => `users/${id}`,
    }),
    addUser: builder.mutation<User, Partial<User>>({
      query: (newUser) => ({
        url: 'users',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
    updateUser: builder.mutation<User, Partial<User>>({
      query: (user) => ({
        url: `users/${user.id}`,
        method: 'PUT',
        body: user,
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useAddUserMutation,
  useUpdateUserMutation,
} = userApi
