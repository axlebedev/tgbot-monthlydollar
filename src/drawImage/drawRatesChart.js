import sum from 'lodash/sum'
import last from 'lodash/last'
import round from 'lodash/round'

import { drawCircle } from './drawUtils'
import {
  ratesChartColor,
  avgChartColor,
} from './colors'

const fontSize = 15
const lineWidth = 3

const drawChart = ({ ctx, array, xScale, yScale, color }) => {
  ctx.strokeStyle = color
  ctx.fillStyle = color
  ctx.lineWidth = lineWidth
  ctx.setLineDash([])
  ctx.beginPath()
  drawCircle(ctx, xScale(array[0].date), yScale(array[0].value))
  for (let i = 1; i < array.length; i++) {
    ctx.lineTo(xScale(array[i].date), yScale(array[i].value))
    drawCircle(ctx, xScale(array[i].date), yScale(array[i].value))
  }
  ctx.stroke()

  const [, right] = xScale.range()
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
  ctx.fillRect(
    right + fontSize / 3,
    yScale(last(array).value) - fontSize,
    fontSize * 3,
    fontSize,
  )
  ctx.fillStyle = color
  ctx.textAlign = 'left'
  ctx.font = `bold ${fontSize}px Impact`
  ctx.fillText(` ${round(last(array).value, 2)}`, right, yScale(last(array).value))
}

export const drawRatesChart = ({ ctx, rates, xScale, yScale }) => {
  drawChart({
    ctx,
    array: rates,
    xScale,
    yScale,
    color: ratesChartColor,
  })
}

const getAvgRates = (rates) => {
  return rates.map(({ date }, index) => {
    return {
      date,
      value: sum(
        rates
          .slice(0, index + 1)
          .map(({ value }) => value),
      ) / (index + 1),
    }
  })
}

export const drawAvgRatesChart = ({ ctx, rates, xScale, yScale }) => {
  drawChart({
    ctx,
    array: getAvgRates(rates),
    xScale,
    yScale,
    color: avgChartColor,
  })
}
