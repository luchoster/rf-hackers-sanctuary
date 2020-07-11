import React from 'react'
import { graphql } from 'gatsby'
import { motion } from 'framer-motion'
import { config } from 'react-spring/renderprops'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import TrailsGrid from '../components/TrailsGrid/Grid'
import Cell from '../components/TrailsGrid/Crew'

import BlockContent from '../components/BlockContent'
import SponsorsGrid from '../components/Sections/SponsorsGrid'
import Title from '../components/Sections/Title'

export default props => {
  const {
    data: { sanityPost: post }
  } = props

  const pageRef = React.useRef(null)

  return (
    <Layout>
      <SEO title={post.title} />
      <motion.div className={`page page--${post.slug.current}`} ref={pageRef}>
        <motion.div className="container">
          <h1 className="">{post.title}</h1>
          <BlockContent blocks={post._rawBody} />
          <div style={{ height: 20 }} />
          <hr style={{ width: 100 }} />
          <div style={{ height: 20 }} />
          <AniLink
            className="btn"
            paintDrip
            duration={1}
            to="/blog"
            hex="#212121"
          >
            All Posts
          </AniLink>
        </motion.div>
      </motion.div>
    </Layout>
  )
}
export const pageQuery = graphql`
  query PostTemplateQuery($_id: String!) {
    sanityPost(_id: { eq: $_id }) {
      _rawBody
      title
      slug {
        current
      }
    }
  }
`
