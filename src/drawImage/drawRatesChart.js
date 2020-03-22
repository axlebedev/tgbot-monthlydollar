import sum from 'lodash/sum'

export const drawRatesChart = async ({ canvas, rates, xScale, yScale }) => {
  const ctx = canvas.getContext('2d')

  ctx.strokeStyle = 'rgb(22, 14, 115)'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(xScale(rates[0].date), yScale(rates[0].value))
  ctx.arc(
    xScale(rates[0].date),
    yScale(rates[0].value),
    3,
    0,
    Math.PI * 2,
  )
  for (let i = 1; i < rates.length; i++) {
    ctx.lineTo(xScale(rates[i].date), yScale(rates[i].value))
    ctx.arc(
      xScale(rates[i].date),
      yScale(rates[i].value),
      3,
      0,
      Math.PI * 2,
    )
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

export const drawAvgRatesChart = async ({ canvas, rates, xScale, yScale }) => {
  const ctx = canvas.getContext('2d')
  const avgRates = getAvgRates(rates)

  ctx.strokeStyle = 'rgb(62, 129, 189)'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(xScale(avgRates[0].date), yScale(avgRates[0].value))
  ctx.arc(
    xScale(avgRates[0].date),
    yScale(avgRates[0].value),
    3,
    0,
    Math.PI * 2,
  )
  for (let i = 1; i < avgRates.length; i++) {
    ctx.lineTo(xScale(avgRates[i].date), yScale(avgRates[i].value))
    ctx.arc(
      xScale(avgRates[i].date),
      yScale(avgRates[i].value),
      3,
      0,
      Math.PI * 2,
    )
  }
  ctx.stroke()
}
