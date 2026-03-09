import AppShell from './app/AppShell'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import './App.css'

function App() {
  return (
    <>
      <AppShell />
      <Analytics />
      <SpeedInsights />
    </>
  )
}

export default App
