import RandomPosts from '@/components/random/RandomPosts'
import React from 'react'

const random_page = () => {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-12`}
    >
      <RandomPosts />
    </main>
  )
}

export default random_page
