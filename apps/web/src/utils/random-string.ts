const validCharacters = '0123456789abcdefghijklmnopqrstuvwxyz'

export const randomString = (stringLength: number) => {
  let suffix = ''
  for (let i = 0; i < stringLength; i++) {
    const randomIndex = Math.floor(Math.random() * validCharacters.length)
    suffix += validCharacters[randomIndex]
  }
  return suffix
}
