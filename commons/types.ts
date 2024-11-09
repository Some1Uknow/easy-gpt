export type VideoData = {
    channel: string;
    channel_url: string;
    description: string;
    duration: string;
    like_count: number;
    text?: string; // Optional, as it seems to represent partial content
    thumbnail: string;
    title: string;
    transcript: { start: number; duration: number; text: string }[]; // Array of transcript segments
  };
  