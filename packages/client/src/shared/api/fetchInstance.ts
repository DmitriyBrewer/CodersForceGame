// TODO: add errors type
const fetchInstance = async <T>(endPoint: string, options = {}): Promise<T> => {
  const baseUrl = 'https:\\ya-praktikum.tech/api/v2'
  const url = `${baseUrl}${endPoint}`

  const response = await fetch(url, { credentials: 'include', ...options })

  if (!response.ok) {
    throw new Error(`Error fetching ${endPoint}; Error: ${response.statusText}`)
  }
  // TODO: handle if not correct json
  return response.json() as Promise<T>
}

export default fetchInstance
