import { useEffect } from 'react'
import './App.css'
import BaseButton from '@/shared/components/ui/BaseButton'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])

  return (
    <div className="App">
      Develop stand
      <BaseButton variant="contained"> Тестовая кнопка</BaseButton>
    </div>
  )
}

export default App
