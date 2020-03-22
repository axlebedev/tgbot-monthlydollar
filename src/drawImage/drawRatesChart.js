import sum from 'lodash/sum'

import { drawCircle } from './drawUtils'
import {
  ratesChartColor,
  avgChartColor,
} from './colors'

export const drawRatesChart = async ({ ctx, rates, xScale, yScale }) => {
  ctx.strokeStyle = ratesChartColor
  ctx.lineWidth = 3
  ctx.setLineDash([])
  ctx.beginPath()
  drawCircle(ctx, xScale(rates[0].date), yScale(rates[0].value))
  for (let i = 1; i < rates.length; i++) {
    ctx.lineTo(xScale(rates[i].date), yScale(rates[i].value))
    drawCircle(ctx, xScale(rates[i].date), yScale(rates[i].value))
  }
  ctx.stroke()
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
}
