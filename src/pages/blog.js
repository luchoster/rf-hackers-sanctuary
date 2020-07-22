import * as R from 'ramda'
import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { motion } from 'framer-motion'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

import { mapIndexed } from '../lib/Helpers'

export default props => {
  const {
    data: {
      allSanityPost: { edges: posts }
    }
  } = props
  return (
    <Layout>
      <SEO title="Blog" />
      <motion.div className={`page page--blog`}>
        <h1 className="glitch" data-text="Blog">
          Blog
        </h1>
        <div className="blog-posts--wrapper glitch-img-effect">
          {mapIndexed(({ node: post }, index) => {
            return (
              <motion.div className="blog-posts__thumb">
                <motion.div className="glitch-img glitch--style">
                  <motion.div
                    className="img"
                    style={{
                      background: `url(${post.mainImage.asset.fluid.src})`
                    }}
                  />
                  <motion.div
                    className="img"
                    style={{
                      background: `url(${post.mainImage.asset.fluid.src})`
                    }}
                  />
                  <motion.div
                    className="img"
                    style={{
                      background: `url(${post.mainImage.asset.fluid.src})`
                    }}
                  />
                  <motion.div
                    className="img"
                    style={{
                      background: `url(${post.mainImage.asset.fluid.src})`
                    }}
                  />
                  <motion.div
                    className="img"
                    style={{
                      background: `url(${post.mainImage.asset.fluid.src})`
                    }}
                  />
                </motion.div>
                {
                  // <Img className="img" fluid={post.mainImage.asset.fluid} />
                }
                <h3 className="color--black">{post.title}</h3>
                <AniLink
                  className="btn"
                  paintDrip
                  hex="#212121"
                  to={`/blog/${post.slug.current}`}
                  duration={1.5}
                  direction="down"
                >
                  Read More
                </AniLink>
              </motion.div>
            )
          })(
            R.compose(R.sort(R.descend(R.path(['node', 'publishedAt']))))(posts)
          )}
        </div>
      </motion.div>
    </Layout>
  )
}

export const postsQuery = graphql`
  query {
    allSanityPost {
      edges {
        node {
          slug {
            current
          }
          _id
          mainImage {
            asset {
              fluid {
                ...GatsbySanityImageFluid
              }
            }
          }
          publishedAt
          title
        }
      }
    }
  }
`
