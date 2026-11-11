import { motion } from 'framer-motion';
import { t } from '../lib/motion';

/** Rises 32px and fades in once when it enters the viewport. */
export default function Reveal({ as = 'div', delay = 0, className, children, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ ...t.reveal, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
