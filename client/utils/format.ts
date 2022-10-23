/**
 * Returns a string of form "abc...xyz"
 * @param {string} str string to string
 * @param {number} n number of chars to keep at front/end
 * @returns {string}
 */
export const getEllipsisTxt = (str: string, n = 6) => {
  if (str) {
    return `${str.slice(0, n)}...${str.slice(str.length - n)}`
  }
  return ''
}

export const formatDate = (stringDate: string) => {
  const date = new Date(stringDate)
  if (date) {
    return `${date.getFullYear()}/${zeroPadding(
      date.getMonth() + 1
    )}/${zeroPadding(date.getDate())} ${zeroPadding(
      date.getHours()
    )}:${zeroPadding(date.getMinutes())}:${zeroPadding(date.getSeconds())}`
  }
}

const zeroPadding = (str: number) => {
  return ('0' + str).slice(-2)
}

export const capitalize = (str: string | undefined) => {
  if (!str || str == undefined) return str
  const tempStr = str.replaceAll('homestead', 'Ethereum')
  return tempStr.charAt(0).toUpperCase() + tempStr.slice(1).toLowerCase()
}
