import React from 'react'
import { motion } from 'framer-motion'

import { mapIndexed } from '../../lib/Helpers'

export default props => {
  const containerRef = React.useRef(null)

  return (
    <motion.div className="list" ref={containerRef}>
      {mapIndexed((img, index) => {
        return (
          <motion.div className="sponsor-img">
            <a href={img.url} target="_blank" rel="noopener noreferrer">
              <motion.img src={img.logo.asset.url} />
            </a>
          </motion.div>
        )
      })(props.list)}
    </motion.div>
  )
}
