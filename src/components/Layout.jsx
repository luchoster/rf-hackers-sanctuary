import React from 'react'
import { BrowserView, MobileView } from 'react-device-detect'
import Loadable from 'react-loadable'

// custom components
import Header from './Header'
import Footer from './Footer'
import '../styles/main.scss'

const ScrollContainer = Loadable({
  loader: () => import('./ScrollContainer'),
  loading() {
    return <div>Loading ...</div>
  }
})

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
