import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

type ModalTypes = 'create' | 'update'

type ModalOpenState = {
  isModalOpen: boolean
  modalType: ModalTypes
}

const initialState: ModalOpenState = {
  isModalOpen: false,
  modalType: 'create',
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
    setModalType: (state, action: { payload: ModalTypes }) => {
      state.modalType = action.payload
    },
  },
})

export const { openModal, closeModal, setModalType } =
  createUserFormModalSlice.actions

export const modalStateSelector = (state: RootState) => state.modal.isModalOpen
export const modalTypeSelector = (state: RootState) => state.modal.modalType

export default createUserFormModalSlice.reducer
