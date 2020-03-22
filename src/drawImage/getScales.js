import * as dateFns from 'date-fns'
import { scaleLinear, scaleTime } from 'd3-scale'

const margins = {
  left: 0.1,
  right: 0.1,
  top: 0.1,
  bottom: 0.1,
}

const getYScale = (canvasHeight, yBounds) => {
  return scaleLinear()
    .domain([yBounds.min, yBounds.max])
    .range([canvasHeight * (1 - margins.bottom), canvasHeight * margins.top])
}

const getXScale = (canvasWidth, xBounds) => {
  if (!canvasWidth) {
    return null
  }

  return scaleTime()
    .domain([xBounds.min, xBounds.max])
    .range([canvasWidth * margins.left, canvasWidth * (1 - margins.right)])
}

const getScales = ({ canvasWidth, canvasHeight, rates }) => {
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
  return { xScale, yScale }
}

export default getScales
