import React from 'react'
import { motion } from 'framer-motion'

import { mapIndexed } from '../lib/Helpers'

export default props => {
  const containerRef = React.useRef(null)

  return (
    <div ref={containerRef}>
      {mapIndexed((img, index) => {
        return (
          <motion.img
            drag
            dragConstraints={containerRef}
            src={img.logo.asset.url}
          />
        )
      })(props.list)}
    </div>
  )
}
