"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";

interface VideoCardProps {
  item: {
    id: number;
    type: string;
    video?: string;
    thumbnail?: string; // Add thumbnail URL to your data
    title: string;
    date: string;
    content?: string;
  };
  i18n: any;
  cardRef?: (el: HTMLDivElement | null) => void;
}

const VideoCard = ({ item, i18n, cardRef }: VideoCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Generate thumbnail from video on mount (fallback if no thumbnail provided)
  useEffect(() => {
    if (item.type === "video" && item.video && !item.thumbnail && videoRef.current) {
      const video = videoRef.current;
      
      // Wait for video metadata to load
      const handleLoadedMetadata = () => {
        setIsLoaded(true);
        // Seek to 1 second to get a better thumbnail frame
        video.currentTime = 1;
      };

      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      
      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, [item.type, item.video, item.thumbnail]);

  const handlePlayClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-sacred transition-sacred bg-card border-border">
      {item.type === "video" && item.video && (
        <div className="relative aspect-video overflow-hidden bg-muted">
          {/* Thumbnail Image - shows before video loads or as poster */}
          {item.thumbnail && !isPlaying && (
            <img
              src={item.thumbnail}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          )}
          
          {/* Video Element */}
          <video
            ref={videoRef}
            src={item.video}
            className={`w-full h-full object-cover ${!isPlaying && item.thumbnail ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
            muted
            loop
            playsInline
            preload="metadata"
            poster={item.thumbnail} // Fallback poster
            onLoadedData={() => setIsLoaded(true)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
          
          {/* Play/Pause Overlay */}
          {!isPlaying && (
            <button
              onClick={handlePlayClick}
              className="absolute inset-0 bg-black/30 flex items-center justify-center cursor-pointer group transition-all hover:bg-black/40"
              aria-label="Play video"
            >
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-white ml-1" fill="white" />
              </div>
            </button>
          )}
          
          {/* Click to pause when playing */}
          {isPlaying && (
            <button
              onClick={handlePlayClick}
              className="absolute inset-0 cursor-pointer"
              aria-label="Pause video"
            />
          )}
          
          {/* Loading indicator */}
          {!isLoaded && !item.thumbnail && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            {new Date(item.date).toLocaleDateString(
              i18n.language === "ar" ? "ar-LB" : i18n.language === "fr" ? "fr-FR" : "en-US",
              {
                year: "numeric",
                month: "long",
                day: "numeric"
              }
            )}
          </span>
        </div>
        <h3 className="font-serif text-xl font-bold text-foreground mb-2 line-clamp-2">
          {item.title}
        </h3>
        {item.content && (
          <p className="text-muted-foreground text-sm line-clamp-3">
            {item.content}
          </p>
        )}
      </div>
    </Card>
  );
};

export default VideoCard;