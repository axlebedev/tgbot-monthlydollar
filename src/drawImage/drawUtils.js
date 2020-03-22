export const drawCircle = (ctx, x, y) => {
  ctx.arc(x, y, 3, 0, Math.PI * 2)
  ctx.moveTo(x, y)
}
