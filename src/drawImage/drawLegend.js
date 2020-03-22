import {
  mainAxisColor,
  ratesChartColor,
  avgChartColor,
} from './colors'

const fontSize = 15

export const drawLegend = ({ ctx, xScale, yScale }) => {
  const left = xScale.range()[0]
  const top = yScale.range()[1] / 2
  ctx.textAlign = 'left'
  ctx.font = `${fontSize}px Impact`

  ctx.fillStyle = ratesChartColor
  ctx.fillRect(left, top - fontSize, fontSize, fontSize)
  ctx.fillStyle = mainAxisColor
  ctx.fillText(' Курс по дням', left + fontSize, top)

  ctx.fillStyle = avgChartColor
  const top2 = top + fontSize * 1.5
  ctx.fillRect(left, top2 - fontSize, fontSize, fontSize)
  ctx.fillStyle = mainAxisColor
  ctx.fillText(' Средние за месяц', left + fontSize, top2)
}
