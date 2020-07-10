import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { motion } from 'framer-motion'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

const imageVariants = {
  hover: { scale: 1.05 }
}

const frameVariants = {
  hover: { scale: 0.95 }
}

const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }

export default props => {
  const {
    data: { sanityHomePage: homePage }
  } = props

  const pageRef = React.useRef(null)

  return (
    <Layout>
      <SEO title="Home | RF Hackers Santuary" />
      <div className="page page--home" ref={pageRef}>
        <div className="page--home__content">
          <h2
            data-text={homePage.content_title}
            className="animated fadeIn page--home__content__title glitch"
          >
            {homePage.content_title}
          </h2>
          <div className="glow">{homePage.content_title}</div>
          <p className="animated fadeIn page--home__content__intro">
            {homePage.content_intro}
          </p>
        </div>
        <motion.div
          className="frame"
          whileHover="hover"
          variants={frameVariants}
          transition={transition}
          variants={{ exit: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.img
            drag
            dragConstraints={pageRef}
            src={homePage.featured_image.asset.fluid.src}
            variants={imageVariants}
            transition={transition}
            className="page--home__featured_img"
          />
        </motion.div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    sanityHomePage {
      featured_image {
        asset {
          fluid(maxHeight: 750) {
            ...GatsbySanityImageFluid
          }
        }
      }
      pageTitle
      content_intro
      content_title
    }
  }
`
