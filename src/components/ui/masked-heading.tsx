'use client';

import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface MaskedHeadingProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'div';
  className?: string;
  delay?: number;
  duration?: number;
  splitWords?: boolean;
}

export function MaskedHeading({
  children,
  as: Tag = 'h2',
  className = '',
  delay = 0,
  duration = 0.75,
  splitWords = false,
}: MaskedHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  if (splitWords && typeof children === 'string') {
    const words = children.split(' ');
    return (
      <Tag ref={ref} className={cn('block', className)}>
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden py-[0.12em] -my-[0.12em] align-top">
            <motion.span
              className="inline-block"
              initial={{ y: '110%', opacity: 0 }}
              animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
              transition={{
                duration,
                ease: [0.16, 1, 0.3, 1],
                delay: delay + i * 0.035,
              }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag ref={ref} className={cn('block', className)}>
      <span className="block overflow-hidden py-[0.12em] -my-[0.12em]">
        <motion.span
          className="block"
          initial={{ y: '110%', opacity: 0 }}
          animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
          transition={{
            duration,
            ease: [0.16, 1, 0.3, 1],
            delay,
          }}
        >
          {children}
        </motion.span>
      </span>
    </Tag>
  );
}

export default MaskedHeading;
