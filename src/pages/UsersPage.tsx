import { useState } from 'react'
import UserForm from '../components/UserForm'
import UserTable from '../components/UserTable'
import UserCharts from '../components/UserCharts'

const UsersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div>
      <UserForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <UserTable setIsModalOpen={setIsModalOpen} />
      <div className="my-4 border" />
      <UserCharts />
    </div>
  )
}

export default UsersPage
