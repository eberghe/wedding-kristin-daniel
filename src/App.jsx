import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LangProvider } from './i18n'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Location from './components/Location'
import PhotoSlider from './components/PhotoSlider'
import RSVP from './components/RSVP'
import Gifts from './components/Gifts'
import { Hotels, FAQ, Contact } from './components/Sections'
import Dresscode from './components/Dresscode'
import Footer from './components/Footer'
import Admin from './components/Admin'

function PublicSite() {
  return (
    <>
      <a href="#main-content" className="skip-link">Zum Inhalt springen / Skip to content</a>
      <Nav />
      <main id="main-content">
        <Hero />
        <Location />
        <PhotoSlider />
        <RSVP />
        <Gifts />
        <Dresscode />
        <Hotels />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicSite />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </LangProvider>
  )
}
