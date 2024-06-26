// import { CssBaseline } from '@mui/material'
// import { Provider } from 'react-redux'

import { Suspense, useEffect, useState } from 'react'

// import store from '@/shared/store'
// import ErrorBoundary from '@/shared/context/error-boundary'
// import ThemeModeProvider from '@/shared/context/theme-provider'

// import GlobalErrorWrapper from '@/shared/context/global-error-wrapper'

// import AppRouter from '../router'

const App = () => {
  // const [mounted, setMounted] = useState(false)
  // useEffect(() => {
  //   setMounted(true)
  // }, [])
  // useEffect(() => {
  //   const fetchServerData = async () => {
  //     const url = `http://localhost:${__SERVER_PORT__}/api`
  //     const response = await fetch(url)
  //     const data = await response.json()
  //     console.log(data)
  //   }

  //   fetchServerData()
  // }, [])

  // const [mounted, setMounted] = useState(false)
  const [test, setTest] = useState('olo')

  useEffect(() => {
    setTest('llo')
  }, [])

  // useEffect(() => {
  //   setMounted(true)
  // }, [])

  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}/api`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])

  return (
    <Suspense>
      <div className="App">Hello world :) {test}</div>
    </Suspense>

    // <Provider store={store}>
    //   <ErrorBoundary>
    //     <ThemeModeProvider>
    //       <CssBaseline />
    //       <GlobalErrorWrapper>
    //         <AppRouter />
    //       </GlobalErrorWrapper>
    //     </ThemeModeProvider>
    //   </ErrorBoundary>
    // </Provider>
  )
}

export default App
