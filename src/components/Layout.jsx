import React from 'react'
import { BrowserView, MobileView } from 'react-device-detect'
import Loadable from 'react-loadable'
import { motion } from 'framer-motion'

// custom components
import Header from './Header'
import Footer from './Footer'
import '../styles/main.scss'

const ScrollContainer = Loadable({
  loader: () => import('./ScrollContainer'),
  loading() {
    return (
      <div className="page page--center">
        <div className="container">Loading ...</div>
      </div>
    )
  }
})

const contentVariant = {
  mounting: { visibility: 'hidden' },
  mounted: { visibility: 'visible', transition: { duration: 0 } }
}

const Layout = ({ children }) => {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <Header />
      <motion.main
        variants={contentVariant}
        initial="mounting"
        animate={mounted ? 'mounted' : 'mounting'}
      >
        <Footer />
        <BrowserView>
          <ScrollContainer>{children}</ScrollContainer>
        </BrowserView>
        <MobileView>{children}</MobileView>
      </motion.main>
    </>
  )
}

export default Layout
