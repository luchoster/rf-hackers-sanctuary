import React from 'react'
import { graphql } from 'gatsby'
import { motion } from 'framer-motion'
import { config } from 'react-spring/renderprops'
import { isMobile } from 'react-device-detect'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import TrailsGrid from '../components/TrailsGrid/Grid'
import Cell from '../components/TrailsGrid/Crew'
import Crew from '../components/Sections/Crew'

import BlockContent from '../components/BlockContent'
import SponsorsGrid from '../components/Sections/SponsorsGrid'
import Title from '../components/Sections/Title'

export default props => {
  const {
    data: { sanityPage: page }
  } = props

  const pageRef = React.useRef(null)

  const content = (page._rawContent || [])
    .filter(c => !c.disabled)
    .map((c, i) => {
      let el = null
      switch (c._type) {
        case 'sponsors':
          el = <SponsorsGrid key={c._key} {...c} />
          break
        case 'section_title':
          el = <Title key={c._key} {...c} />
          break
        case 'section_content':
          el = <BlockContent key={c._key} blocks={c.body} />
          break
        case 'crew':
          el = <Crew key={c._key} blocks={c.list} />
          break
        // case 'blah':
        //   el = (
        //     <TrailsGrid
        //       className="grid crew"
        //       // Arbitrary data, should contain keys, possibly heights, etc.
        //       data={c.list}
        //       // Key accessor, instructs grid on how to fet individual keys from the data set
        //       keys={d => d._key}
        //       // Can be a fixed value or an individual data accessor
        //       heights={d => 300}
        //       // Number of columns
        //       columns={isMobile ? 1 : 2}
        //       // Space between elements
        //       margin={30}
        //       // Removes the possibility to scroll away from a maximized element
        //       lockScroll={true}
        //       // Delay when active elements (blown up) are minimized again
        //       closeDelay={500}
        //       // Regular react-spring configs
        //       config={config.slow}
        //     >
        //       {(data, active, toggle) => (
        //         <Cell {...data} active={active} toggle={toggle} />
        //       )}
        //     </TrailsGrid>
        //   )
        //   break
        // case "ctaColumns":
        //   el = <CTAColumns key={c._key} {...c} />;
        //   break;
        // case "ctaPlug":
        //   el = <CTA key={c._key} {...c} />;
        //   break;
        // case "uiComponentRef":
        //   switch (c.name) {
        //     case "topWave":
        //       el = <TopWave />;
        //       break;
        //     case "bottomWave":
        //       el = <BottomWave />;
        //       break;
        //     default:
        //       break;
        //   }
        //   break;
        default:
          el = null
      }
      return el
    })

  return (
    <Layout>
      <SEO title="Page" />
      <motion.div
        className={`page page--bg page--${page.slug.current}`}
        ref={pageRef}
      >
        <div className="container">
          <h1 className="glitch" data-text={page.pageTitle}>
            {page.pageTitle}
          </h1>
          {content}
        </div>
      </motion.div>
    </Layout>
  )
}
export const pageQuery = graphql`
  query PageTemplateQuery($_id: String!) {
    sanityPage(_id: { eq: $_id }) {
      _rawContent(resolveReferences: { maxDepth: 10 })
      pageTitle
      slug {
        current
      }
    }
  }
`
