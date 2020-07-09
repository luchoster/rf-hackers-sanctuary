import React from 'react'
import { motion } from 'framer-motion'

import { mapIndexed } from '../../lib/Helpers'

export default props => {
  const containerRef = React.useRef(null)

  return (
    <motion.div className="masonry" ref={containerRef}>
      {mapIndexed((img, index) => {
        return (
          <motion.div className="brick">
            <motion.img src={img.logo.asset.url} />
          </motion.div>
        )
      })(props.list)}
    </motion.div>
  )
}
