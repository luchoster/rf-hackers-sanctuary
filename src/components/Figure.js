import React from 'react'
import Img from 'gatsby-image'
import { getFluidGatsbyImage } from 'gatsby-source-sanity'
import FsLightbox from 'fslightbox-react'
import {
  animated,
  useTransition,
  useSpring,
  useChain,
  config
} from 'react-spring'

export default ({ node }) => {
  const [open, set] = React.useState(false)

  const springRef = React.useRef()

  const { h, w, size, opacity, ...rest } = useSpring({
    ref: springRef,
    config: config.stiff,
    from: { size: '20%' },
    to: {
      size: open ? '100%' : '20%'
    }
  })

  const transRef = React.useRef()
  const transitions = useTransition(
    open ? node : [],
    item => {
      return item.url
    },
    {
      ref: transRef,
      unique: true,
      trail: 400,
      from: { opacity: 0, transform: 'scale(0)' },
      enter: { opacity: 1, transform: 'scale(1)' },
      leave: { opacity: 0, transform: 'scale(0)' }
    }
  )

  useChain(open ? [springRef, transRef] : [transRef, springRef], [
    0,
    open ? 0.1 : 0.6
  ])

  if (!node || !node.asset || !node.asset._id) {
    return null
  }
  const fluidProps = getFluidGatsbyImage(
    node.asset._id,
    { maxWidth: 675 },
    {
      projectId: process.env.GATSBY_SANITY_ID,
      dataset: process.env.GATSBY_SANITY_DATASET
    }
  )

  return (
    <animated.div className="customImage-wrapper">
      <figure className="customImage">
        {console.log(size)}
        <animated.img
          src={node.asset.url}
          alt={node.alt}
          onClick={() => set(open => !open)}
          style={{ ...rest, width: size }}
        />
        <figcaption>{node.caption}</figcaption>
      </figure>
    </animated.div>
  )
}
