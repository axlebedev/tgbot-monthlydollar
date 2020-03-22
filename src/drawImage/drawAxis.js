import find from 'lodash/find'
import { timeDay } from 'd3-time'
import {
  format,
  startOfDay,
  addDays,
  isEqual,
} from 'date-fns'

const mainColor = 'rgb(63, 63, 63)'
const altColor = 'rgb(128, 128, 128)'

// const mainColor = 'rgb(0, 0, 0)'
// const altColor = 'rgb(255, 0, 0)'

const drawBorder = ({ ctx, xScale, yScale }) => {
  ctx.strokeStyle = mainColor
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(xScale.range()[0], yScale.range()[1])
  ctx.lineTo(xScale.range()[0], yScale.range()[0])
  ctx.lineTo(xScale.range()[1], yScale.range()[0])
  ctx.lineTo(xScale.range()[1], yScale.range()[1])
  ctx.stroke()
}

const getVisibleDays = (xScale) => {
  const domain = xScale.domain()
  return timeDay.range(domain[0], addDays(domain[1], 1))
}

const drawXAxis = ({ ctx, rates, xScale, yScale }) => {
  const dates = rates.map(({ date }) => date)
  const days = getVisibleDays(xScale).map(startOfDay)

  ctx.textAlign = 'center'
  const fontSize = 15
  const bottom = yScale.range()[0] + fontSize
  ctx.font = `${fontSize}px Impact`
  days.forEach((day) => {
    const color = find(dates, (date) => isEqual(day, date)) !== undefined
      ? mainColor
      : altColor
    ctx.fillStyle = color
    ctx.fillText(format(day, 'dd'), xScale(day), bottom)
  })
}

const getYAxisTicks = (yScale) => {
  const [min, max] = yScale.domain()
  const result = []
  let cursor = Math.ceil(min)
  while (cursor < max) {
    result.push(cursor)
    cursor += 1
  }
  return result
}

const drawYAxis = ({ ctx, xScale, yScale }) => {
  const ticks = getYAxisTicks(yScale)

  const fontSize = 15
  const [left, right] = xScale.range()
  ctx.font = `${fontSize}px Impact`
  ctx.lineWidth = 1
  ticks.forEach((tick) => {
    const y = yScale(tick)
    const color = tick % 5 === 0
      ? mainColor
      : altColor
    ctx.fillStyle = color
    ctx.strokeStyle = color
    ctx.textAlign = 'right'
    ctx.fillText(`${tick} `, left, y)
    ctx.textAlign = 'left'
    ctx.fillText(` ${tick}`, right, y)

    ctx.setLineDash(color === mainColor ? [] : [5, 15])
    ctx.beginPath()
    ctx.moveTo(left, y)
    ctx.lineTo(right, y)
    ctx.stroke()
  })
}

export const drawAxis = async ({ ctx, rates, xScale, yScale }) => {
  drawBorder({ ctx, xScale, yScale })
  drawXAxis({ ctx, rates, xScale, yScale })
  drawYAxis({ ctx, rates, xScale, yScale })
}
