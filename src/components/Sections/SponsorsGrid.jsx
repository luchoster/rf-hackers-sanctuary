import React from 'react'
import { motion } from 'framer-motion'

import { mapIndexed } from '../../lib/Helpers'

export default props => {
  const containerRef = React.useRef(null)

  return (
    <motion.div className="list" ref={containerRef}>
      {mapIndexed((img, index) => {
        return (
          <motion.div className="">
            <motion.img src={img.logo.asset.url} />
          </motion.div>
        )
      })(props.list)}
    </motion.div>
  )
}
