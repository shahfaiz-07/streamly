import { IVideoClient } from "@/types";
import VideoComponent from "./VideoComponent";

interface VideoFeedProps {
  videos: IVideoClient[];
}

export default function VideoFeed({ videos }: VideoFeedProps) {
  return (
    <div className="flex flex-wrap gap-4 m-4 items-center justify-center">
      {videos.map((video) => (
        <VideoComponent key={video._id?.toString()} video={video} />
      ))}

      {videos.length === 0 && (
        <div className="col-span-full text-center py-12 h-full grid place-content-center">
          <p className="text-base-content/70">No videos found</p>
        </div>
      )}
    </div>
  );
}
