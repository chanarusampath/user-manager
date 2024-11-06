import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

type ModalOpenState = {
  isModalOpen: boolean
}

const initialState: ModalOpenState = {
  isModalOpen: false,
}

const createUserFormModalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true
    },
    closeModal: (state) => {
      state.isModalOpen = false
    },
  },
})

export const { openModal, closeModal } = createUserFormModalSlice.actions

export const modalStateSelector = (state: RootState) => state.modal.isModalOpen

export default createUserFormModalSlice.reducer
