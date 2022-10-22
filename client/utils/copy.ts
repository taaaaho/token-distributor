export const copyTextToClipboard = async (text: string): Promise<boolean> => {
  return navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log('Async: Copying to clipboard was successful!')
      return true
    })
    .catch((err) => {
      console.error('Async: Could not copy text: ', err)
      return false
    })
}
