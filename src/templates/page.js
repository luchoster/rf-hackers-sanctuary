import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

import SponsorsGrid from '../components/SponsorsGrid'

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
        // case "infoRows":
        //   el = <InfoRows key={c._key} {...c} />;
        //   break;
        // case "hero":
        //   el = <Hero key={c._key} {...c} />;
        //   break;
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
      <div className={`page page--${page.slug.current}`} ref={pageRef}>
        <h1>{page.pageTitle}</h1>
        <div className="pt-24">{content}</div>
      </div>
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
