import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { User } from '../types/user'

type UserState = {
  selectedUser?: User
}

const initialState: UserState = {
  selectedUser: undefined,
}

const userSlice = createSlice({
  name: 'selectedUser',
  initialState,
  reducers: {
    setSelectedUser: (state, actions) => {
      state.selectedUser = actions.payload
    },
    reset: (state) => {
      state.selectedUser = undefined
    },
  },
})

export const { setSelectedUser, reset } = userSlice.actions

export const selectedUserSelector = (state: RootState) =>
  state.selectedUser.selectedUser

export default userSlice.reducer
