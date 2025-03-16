import React from 'react'
import { motion } from 'framer-motion'
const FeatureSection = () => {
    const containerVariants = { 
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                staggerChildren: 0.2
            } 
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    }

    
  return (
    <div>FeatureSection</div>
  )
}

export default FeatureSection