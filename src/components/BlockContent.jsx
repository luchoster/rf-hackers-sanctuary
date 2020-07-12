import React from 'react'
import BasePortableText from '@sanity/block-content-to-react'
import getYoutubeID from 'get-youtube-id'
import { Link } from 'gatsby'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

import { notNilOrEmpty } from '../lib/Helpers'
import Figure from './Figure'

library.add(fab)

export default props => {
  const _getYTId = value => {
    const id = getYoutubeID(value)
    const url = `https://www.youtube.com/embed/${id}`

    return url
  }

  // custom component in the body content from the CMS
  const serializers = {
    marks: {
      internalLink: ({ mark, children }) => {
        const { internal_slug = {} } = mark
        const href = `/${internal_slug}`
        return (
          <Link
            cover
            className="menu-item"
            to={href}
            duration={1.5}
            direction="left"
            bg={`
              url(${require('../assets/img/web_background.jpg')})
              center / cover   /* position / size */
              no-repeat        /* repeat */
              fixed            /* attachment */
              padding-box      /* origin */
              content-box      /* clip */
              black            /* color */
            `}
          >
            {children}
          </Link>
        )
      },
      link: ({ mark, children }) => {
        const { blank, href } = mark
        return blank ? (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        ) : (
          <a href={href}>{children}</a>
        )
      }
    },
    types: {
      mainImage: Figure,
      customImage: Figure,
      youtube: prop => (
        <>
          <iframe
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            frameBorder="0"
            height="315"
            src={_getYTId(prop.node.url)}
            title="YouTube Video"
            width="560"
          />
        </>
      ),
      file: fl => {
        console.log(fl)
        return (
          <a href={fl.node.asset.url}>
            <FontAwesomeIcon
              icon={faFilePdf}
              mask={['circle']}
              className="icon"
            />
            {fl.node.asset.originalFilename}
          </a>
        )
      }
    }
  }

  return (
    notNilOrEmpty(props) && (
      <>
        <BasePortableText
          blocks={props.blocks}
          serializers={serializers}
          className={props.className}
          projectId={process.env.GATSBY_SANITY_ID}
          dataset={process.env.GATSBY_SANITY_DATASET}
          token={process.env.GATSBY_SANITY_TOKEN}
        />
      </>
    )
  )
}
