export default (v) => {
  if (!v) {
    return ''
  }
  return v / 60 + '分钟'
}