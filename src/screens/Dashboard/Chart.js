/* eslint-disable react/prop-types */
import { Line, Bar } from 'react-chartjs-2'

import React from 'react'
import { Chart as ChartJS } from 'chart.js/auto'
function Chart({ chartData }) {
  return <Line data={chartData} />
}

export default Chart
