import { Pie } from '@visx/shape'
import { Group } from '@visx/group'
import { scaleOrdinal } from '@visx/scale'
import { User } from '../types/user'

/**
 * This component return a pie chart based on the filed provided.
 * @returns Pie Chart Component.
 */
const PieChart = ({
  users,
  field,
  width = 300,
  height = 300,
}: {
  users: Array<User>
  field: keyof Omit<User, 'dob' | 'createdAt'>
  width?: number
  height?: number
}) => {
  const fieldData = users.reduce<{ [key: string]: number }>((acc, user) => {
    acc[user[field]] = (acc[user[field]] || 0) + 1
    return acc
  }, {})

  const fieldEntries = Object.entries(fieldData).map(([city, count]) => ({
    city,
    count,
  }))

  const colorScale = scaleOrdinal({
    domain: fieldEntries.map((d) => d.city),
    range: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
  })
  const radius = Math.min(width, height) / 2

  return (
    <svg width={width} height={height}>
      <Group top={height / 2} left={width / 2}>
        <Pie
          data={fieldEntries}
          pieValue={(d) => d.count}
          outerRadius={radius}
          cornerRadius={3}
          padAngle={0.02}
        >
          {(pie) =>
            pie.arcs.map((arc) => (
              <g key={`arc-${arc.data.city}`}>
                <path
                  d={pie.path(arc) || ''}
                  fill={colorScale(arc.data.city)}
                />
                <text
                  x={pie.path.centroid(arc)[0]}
                  y={pie.path.centroid(arc)[1]}
                  dy=".33em"
                  fontSize={10}
                  textAnchor="middle"
                  fill="white"
                >
                  {arc.data.city}
                </text>
              </g>
            ))
          }
        </Pie>
      </Group>
    </svg>
  )
}

export default PieChart
