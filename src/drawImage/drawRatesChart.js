import sum from 'lodash/sum'
import last from 'lodash/last'
import round from 'lodash/round'

import { drawCircle } from './drawUtils'
import {
  ratesChartColor,
  avgChartColor,
} from './colors'

const fontSize = 15

export const drawRatesChart = async ({ ctx, rates, xScale, yScale }) => {
  ctx.strokeStyle = ratesChartColor
  ctx.fillStyle = ratesChartColor
  ctx.lineWidth = 3
  ctx.setLineDash([])
  ctx.beginPath()
  drawCircle(ctx, xScale(rates[0].date), yScale(rates[0].value))
  for (let i = 1; i < rates.length; i++) {
    ctx.lineTo(xScale(rates[i].date), yScale(rates[i].value))
    drawCircle(ctx, xScale(rates[i].date), yScale(rates[i].value))
  }
  ctx.stroke()

  const [, right] = xScale.range()
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
  ctx.fillRect(
    right + fontSize / 3,
    yScale(last(rates).value) - fontSize,
    fontSize * 3,
    fontSize,
  )
  ctx.fillStyle = ratesChartColor
  ctx.textAlign = 'left'
  ctx.font = `bold ${fontSize}px Impact`
  ctx.fillText(` ${round(last(rates).value, 2)}`, right, yScale(last(rates).value))
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

export const drawAvgRatesChart = async ({ ctx, rates, xScale, yScale }) => {
  const avgRates = getAvgRates(rates)

  ctx.fillStyle = avgChartColor
  ctx.strokeStyle = avgChartColor
  ctx.lineWidth = 3
  ctx.setLineDash([])
  ctx.beginPath()
  drawCircle(ctx, xScale(avgRates[0].date), yScale(avgRates[0].value))
  for (let i = 1; i < avgRates.length; i++) {
    ctx.lineTo(xScale(avgRates[i].date), yScale(avgRates[i].value))
    drawCircle(ctx, xScale(avgRates[i].date), yScale(avgRates[i].value))
  }
  ctx.stroke()

  const [, right] = xScale.range()
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
  ctx.fillRect(
    right + fontSize / 3,
    yScale(last(avgRates).value) - fontSize,
    fontSize * 3,
    fontSize,
  )
  ctx.fillStyle = avgChartColor
  ctx.textAlign = 'left'
  ctx.font = `bold ${fontSize}px Impact`
  ctx.fillText(` ${round(last(avgRates).value, 2)}`, right, yScale(last(avgRates).value))
}
