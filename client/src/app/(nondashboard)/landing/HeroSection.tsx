'use client'
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const HeroSection = () => {
  return (
    <div className="relative h-screen">
      <Image
        src="/landing-splash.jpg"
        alt="Rentiful Rental Platform Hero Section"
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-black opacity-60">
        <div className="flex flex-col items-center justify-center h-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center w-full max-w-4xl mx-auto px-4 sm:px-12"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Start your journey to finding the perfect place to call home
            </h1>
            <p className="text-lg sm:text-xl text-white mb-8">
              Explore our wide range of rental properties tailored to fit your
              lifestyle and needs!
            </p>

            <div className="flex justify-center w-full max-w-lg mx-auto">
              <Input
                type="text"
                // value={searchQuery}
                onChange={() => {}}
                placeholder="Search by city, neighborhood or address"
                className="w-full rounded-none rounded-l-xl border-none bg-white h-12"
              />
              <Button
                // onClick={handleLocationSearch}
                className="bg-secondary-500 text-white rounded-none rounded-r-xl border-none hover:bg-secondary-600 h-12"
              >
                Search
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection