import find from 'lodash/find'
import capitalize from 'lodash/capitalize'
import { timeDay } from 'd3-time'
import {
  format,
  startOfDay,
  addDays,
  isEqual,
} from 'date-fns'
import { ru } from 'date-fns/locale'

import {
  mainAxisColor,
  altAxisColor,
  monthAxisColor,
} from './colors'

const fontSize = 15

const drawBorder = ({ ctx, xScale, yScale }) => {
  ctx.strokeStyle = mainAxisColor
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
  const bottom = yScale.range()[0] + fontSize
  ctx.font = `${fontSize}px Impact`
  days.forEach((day) => {
    const color = find(dates, (date) => isEqual(day, date)) !== undefined
      ? mainAxisColor
      : altAxisColor
    ctx.fillStyle = color
    ctx.fillText(format(day, 'dd'), xScale(day), bottom)
  })
}

const drawXAxisMonth = ({ ctx, xScale, yScale }) => {
  ctx.textAlign = 'center'
  const bottom = yScale.range()[0] + fontSize
  const localFontSize = fontSize * 2
  ctx.font = `bold ${localFontSize}px Impact`
  ctx.fillStyle = monthAxisColor
  const [left, right] = xScale.range()
  const center = (left + right) / 2
  ctx.fillText(
    capitalize(format(new Date(), 'LLLL yyyy', { locale: ru })),
    center,
    bottom + localFontSize,
  )
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

  const [left, right] = xScale.range()
  ctx.font = `${fontSize}px Impact`
  ctx.lineWidth = 0.5
  ticks.forEach((tick) => {
    const y = yScale(tick)
    const color = tick % 5 === 0
      ? mainAxisColor
      : altAxisColor
    ctx.fillStyle = color
    ctx.strokeStyle = color
    ctx.textAlign = 'right'
    ctx.fillText(`${tick} `, left, y)
    ctx.textAlign = 'left'
    ctx.fillText(` ${tick}`, right, y)

    ctx.setLineDash(color === mainAxisColor ? [1, 1] : [1, 3])
    ctx.beginPath()
    ctx.moveTo(left, y)
    ctx.lineTo(right, y)
    ctx.stroke()
  })
}

export const drawAxis = async ({ ctx, rates, xScale, yScale }) => {
  drawBorder({ ctx, xScale, yScale })
  drawXAxis({ ctx, rates, xScale, yScale })
  drawXAxisMonth({ ctx, xScale, yScale })
  drawYAxis({ ctx, rates, xScale, yScale })
}
