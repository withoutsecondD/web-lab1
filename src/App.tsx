import { Routes, Route } from 'react-router'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './pages/Home'
import PlayerList from './pages/PlayerList'
import PlayerDetail from './pages/PlayerDetail'
import TeamList from './pages/TeamList'
import TeamPlayers from './pages/TeamPlayers'
import About from './pages/About'

import './App.css'

function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <main className='flex-grow'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/players' element={<PlayerList />} />
          <Route path='/players/:id' element={<PlayerDetail />} />
          <Route path='/teams' element={<TeamList />} />
          <Route path='/teams/:id/players' element={<TeamPlayers />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
