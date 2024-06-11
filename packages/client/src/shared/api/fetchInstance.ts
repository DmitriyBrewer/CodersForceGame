const fetchInstance = async (endPoint: string, options = {}) => {
  const baseUrl = 'https:\\ya-praktikum.tech/api/v2'
  const url = `${baseUrl}${endPoint}`

  const response = await fetch(url, { credentials: 'include', ...options })

  if (!response.ok) {
    throw new Error(`Error fetching ${endPoint}; Error: ${response.statusText}`)
  }

  return response.json()
}

export default fetchInstance
