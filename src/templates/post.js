import React from 'react'
import { graphql } from 'gatsby'
import { motion } from 'framer-motion'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

import BlockContent from '../components/BlockContent'

export default function Posts(props) {
  const {
    data: { sanityPost: post }
  } = props

  const pageRef = React.useRef(null)

  return (
    <Layout>
      <SEO title={post.title} />
      <motion.div
        className={`page page--post page--${post.slug.current}`}
        ref={pageRef}
      >
        <h2 className="color--black">{post.title}</h2>
        <motion.div className="container">
          <BlockContent blocks={post._rawBody} />
          <div className="all-posts-link">
            <AniLink
              className="btn"
              paintDrip
              hex="#212121"
              to="/blog"
              duration={0.75}
              direction="down"
            >
              All Posts
            </AniLink>
          </div>
        </motion.div>
      </motion.div>
    </Layout>
  )
}
export const pageQuery = graphql`
  query PostTemplateQuery($_id: String!) {
    sanityPost(_id: { eq: $_id }) {
      _rawBody(resolveReferences: { maxDepth: 10 })
      title
      slug {
        current
      }
    }
  }
`
