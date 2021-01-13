/**
 * 正则配置
 */

export const mobile = /^1(3|4|5|6|7|8|9)[0-9]{9}$/
export const idCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
export const bankCard = /^\d{16}|\d{19}$/
export const receiveEmail = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/
export const doc = /(\.docx$)|(\.doc$)/
export const exc = /(\.xls$)|(\.xlsx$)/
export const img = /(\.jpg$)|(\.jpeg$)|(\.png$)|(\.bmp$)/
export const pdfOrHtml = /(\.pdf$)|(\.htm$)|(\.html$)|(\.txt$)/
export const email = /@(\w)+((\.\w+)+)$/

const regExp = {
  mobile,
  idCard,
  bankCard,
  receiveEmail,
  doc,
  exc,
  img,
  pdfOrHtml,
  email
}

export default regExp