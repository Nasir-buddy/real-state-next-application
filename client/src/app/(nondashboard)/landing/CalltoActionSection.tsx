'use client'
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'

const CalltoActionSection = () => {
    return (
        <div className='relative py-24'>
            {/* Background image container */}
            <div className='absolute inset-0 z-0'>
                <Image
                    src='/landing-call-to-action.jpg'
                    alt='Rentiful Search Section Background'
                    fill
                    className='object-cover object-center'
                />
            </div>
            
            {/* Overlay with proper z-index */}
            <div className='absolute inset-0 bg-black opacity-60 z-10'></div>
            
            {/* Content with full opacity and z-index */}
            <div className='relative z-20 h-full flex items-center justify-center'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className='w-full max-w-4xl xl:max-w-6xl mx-auto sm:px-8 lg:px-12 xl:px-16 py-12'
                >
                    <div className='flex flex-col md:flex-row justify-center items-center text-center'>
                        <div>
                            <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold text-white'>
                                Find Your Dream Rental Property
                            </h2>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default CalltoActionSection