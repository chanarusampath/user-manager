import { useGetAllUsersQuery } from '../services/user'
import PieChart from './PieChart'

const UserCharts = () => {
  const { data, isLoading, error } = useGetAllUsersQuery({})
  const users = data?.data || []

  if (isLoading) return <div className="text-center p-4">Loading...</div>
  if (error)
    return <div className="text-center text-red-500 p-4">Error occurred!</div>

  return (
    <div className="space-y-8 flex flex-col items-center">
      <h2 className="text-xl font-bold">User Distribution</h2>

      <div className="flex items-center justify-center gap-10">
        <section className="flex flex-col items-center justify-center">
          <h3 className="text-lg">Gender Distribution</h3>
          <PieChart users={users} field="gender" width={300} height={300} />
        </section>

        <section className="flex flex-col items-center justify-center">
          <h3 className="text-lg">City Distribution</h3>
          <PieChart users={users} field="city" width={300} height={300} />
        </section>
      </div>
    </div>
  )
}

export default UserCharts
