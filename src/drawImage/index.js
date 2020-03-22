import fs from 'fs'
import { createCanvas } from 'canvas'

import getUSDRates from '../getUSDRates'
import getScales from './getScales'
import { drawRatesChart, drawAvgRatesChart } from './drawRatesChart'
import { drawAxis } from './drawAxis'

const drawImage = async () => {
  const rates = await getUSDRates()
  const canvasWidth = 1000
  const canvasHeight = 700

  const { xScale, yScale } = getScales({ canvasWidth, canvasHeight, rates })
  const canvas = createCanvas(canvasWidth, canvasHeight)
  const ctx = canvas.getContext('2d')

  drawAxis({ ctx, rates, xScale, yScale })
  drawAvgRatesChart({ ctx, rates, xScale, yScale })
  drawRatesChart({ ctx, rates, xScale, yScale })

  // // Write "Awesome!"
  // ctx.font = '30px Impact'
  // ctx.rotate(0.1)
  // ctx.fillText('Awesome!', 50, 100)

  const buf = canvas.toBuffer()
  fs.writeFileSync('test.png', buf)
  return buf.toString('base64')
}

export default drawImage
