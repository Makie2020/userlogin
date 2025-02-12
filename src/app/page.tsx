import { LoginPage } from './components/LoginPage'
import Navbar from './components/Navbar'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4">
        <LoginPage />
      </main>
    </div>
  )
}