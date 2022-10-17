import { data } from '@/types/Chart'
import { getEllipsisTxt } from '@/utils/format'
import React from 'react'
import { ResponsiveContainer } from 'recharts'
import { PieChart, Pie, Cell, Text } from 'recharts'

const renderLabel = ({ name, value, cx, x, y }: any) => {
  const textAnchor = x > cx ? 'start' : 'end'
  return (
    <>
      <Text x={x} y={y} fill="#FFF" textAnchor={textAnchor}>
        {getEllipsisTxt(name, 4)}
      </Text>
      <Text
        x={x}
        y={y + 10}
        dominantBaseline="hanging"
        fill="#FFF"
        textAnchor={textAnchor}
      >
        {`${value} %`}
      </Text>
    </>
  )
}

const randomColor = () => {
  const h = Math.random() * 360
  return `hsl(${h}, 80%, 60%)`
}
interface Props {
  data: data[]
  width: string
}
const Chart: React.FC<Props> = (props): JSX.Element => {
  const { data, width } = props
  return (
    <ResponsiveContainer width={width} minHeight={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={true}
          outerRadius={90}
          fill="#8884d8"
          nameKey="wallet"
          dataKey="proportion"
          label={renderLabel}
          isAnimationActive={true}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={randomColor()} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}
export default Chart
