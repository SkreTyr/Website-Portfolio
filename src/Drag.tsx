import { motion, useMotionValue, animate } from 'framer-motion'
import imgDrag from './assets/react.svg'

const box = {
  width: 200,
  height: 200,
  backgroundColor: 'var(--hue-2)',
  borderRadius: 10,
  overflow: 'hidden',
}

export default function Drag({ src, constraintsRef }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  return (
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragElastic={0}
      onDragEnd={() => {
        animate(x, 0)
        animate(y, 0)
      }}
      style={{ ...box, position: 'absolute', x, y }}
    >
      <img
        src={imgDrag}
        alt="draggable"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          WebkitUserDrag: 'none',
          userDrag: 'none',
        }}
      />
    </motion.div>
  )
}
