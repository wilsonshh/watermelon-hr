import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

const queryClient = new QueryClient()

class App extends Component {
  render() {
    return (
      <QueryClientProvider client={queryClient}>
        <HashRouter>
          <Suspense fallback={loading}>
            <Routes>
              <Route path="*" name="People" element={<DefaultLayout />} />
            </Routes>
          </Suspense>
        </HashRouter>
      </QueryClientProvider>
    )
  }
}

export default App
