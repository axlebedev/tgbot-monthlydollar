import fs from 'fs'
import { createCanvas } from 'canvas'
import * as dateFns from 'date-fns'
import { scaleLinear, scaleTime } from 'd3-scale'

import getUSDRates from '../getUSDRates'

const getYScale = (canvasHeight, yBounds) => {
  return scaleLinear()
    .domain([yBounds.min, yBounds.max])
    .range([canvasHeight, 0])
}

const getXScale = (canvasWidth, xBounds) => {
  if (!canvasWidth) {
    return null
  }

  return scaleTime()
    .domain([xBounds.min, xBounds.max])
    .range([0, canvasWidth])
}

const drawImage = async () => {
  const rates = await getUSDRates()
  const canvasWidth = 1000
  const canvasHeight = 700
  console.log('%c11111', 'background:#00FF00', 'rates=', rates);
  const dates = rates.map(({ date }) => date)
  const xScale = getXScale(
    canvasWidth,
    {
      min: dateFns.min(dates),
      max: dateFns.max(dates),
    },
  )

  const values = rates.map(({ value }) => value)
  const yScale = getYScale(
    canvasHeight,
    {
      min: Math.min(...values) - 1,
      max: Math.max(...values) + 1,
    },
  )

  const canvas = createCanvas(canvasWidth, canvasHeight)
  const ctx = canvas.getContext('2d')

  ctx.strokeStyle = 'rgba(0,0,0,0.5)'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(xScale(rates[0].date), yScale(rates[0].value))
  for (let i = 1; i < rates.length; i++) {
    ctx.lineTo(xScale(rates[i].date), yScale(rates[i].value))
  }
  ctx.stroke()

  // // Write "Awesome!"
  // ctx.font = '30px Impact'
  // ctx.rotate(0.1)
  // ctx.fillText('Awesome!', 50, 100)

  const buf = canvas.toBuffer()
  fs.writeFileSync('test.png', buf)
  return buf.toString('base64')
}

export default drawImage
