import { motion } from 'framer-motion';
import { ease } from '../lib/motion';

/** Words come into focus one after another (the reference's headline reveal). */
export default function BlurWords({ text, className = '', wordClass = '', delay = 0, stagger = 0.06, inView = false }) {
  const words = text.split(' ');
  const trigger = inView
    ? { whileInView: 'show', viewport: { once: true, margin: '0px 0px -15% 0px' } }
    : { animate: 'show' };
  return (
    <motion.span className={className} initial="hide" {...trigger} transition={{ staggerChildren: stagger, delayChildren: delay }}>
      {words.map((w, i) => (
        <span key={i}>
          <motion.span
            className={`inline-block ${wordClass}`}
            variants={{ hide: { opacity: 0, y: 16, filter: 'blur(10px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)' } }}
            transition={{ duration: 0.9, ease }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </motion.span>
  );
}
