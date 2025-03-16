'use client'
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

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
                    <div className='flex flex-col items-center text-center'>
                        <div className='mb-6'>
                            <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold text-white'>
                                Find Your Dream Rental Property
                            </h2>
                        </div>

                        <div className='text-center max-w-2xl mx-auto'>
                            <p className='text-white mb-6'>
                                Discover a wide range of rental properties in your desired location.
                            </p>
                            <div className='flex justify-center md:justify-start gap-4'>
                                <button
                                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                    className='inline-block text-primary-700 bg-white rounded-lg px-6 py-3 font-semibold hover:bg-primary-500 hover:text-primary-50'>
                                    Search
                                </button>
                                <Link
                                    href='/signup'
                                    className='inline-block text-white bg-secondary-500 rounded-lg px-6 py-3 font-semibold hover:bg-secondary-600'
                                    scroll={false}
                                >
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default CalltoActionSection