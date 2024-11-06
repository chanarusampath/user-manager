import UserForm from '../components/UserForm'
import UserTable from '../components/UserTable'
import UserCharts from '../components/UserCharts'

const UsersPage = () => {
  return (
    <div>
      <UserForm />
      <UserTable />
      <div className="my-4 border" />
      <UserCharts />
    </div>
  )
}

export default UsersPage
