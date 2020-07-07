import React from 'react'
import { BrowserView, MobileView } from 'react-device-detect'

// custom components
import Header from './Header'
import Footer from './Footer'
import ScrollContainer from './ScrollContainer'
import '../styles/main.scss'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        <Footer />
        <BrowserView>
          <ScrollContainer>{children}</ScrollContainer>
        </BrowserView>
        <MobileView>{children}</MobileView>
      </main>
    </>
  )
}

export default Layout
