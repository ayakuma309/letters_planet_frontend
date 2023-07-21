import React from 'react'
import Style from "@/styles/search.module.css";

interface VideoGridProps {
  children: React.ReactNode
}

const VideoGrid:React.FC<VideoGridProps> = ({children}) => {
  return (
    <div className={Style.container}>
      {children}
    </div>
  )
}

export default VideoGrid
