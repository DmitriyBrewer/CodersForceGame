const fetchInstance = async (endPoint: string, options = {}, responseJson = true) => {
  const baseUrl = 'https:\\ya-praktikum.tech/api/v2'
  const url = `${baseUrl}${endPoint}`

  const response = await fetch(url, { credentials: 'include', ...options })

  if (!response.ok) {
    const error = await response.json()
    throw error
  }

  if (responseJson) {
    const json = await response.json()
    return json
  }

  const text = await response.text()
  return text
}

export default fetchInstance
