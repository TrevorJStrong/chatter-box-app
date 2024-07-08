type User = {
  user_id: string;
  name: string;
  email: string;
  profile_image: string;
}
  
export interface Location {
    longitude: number;
    latitude: number;
}
  
export interface PostData {
    _id: string;
    date_created: string;
    user: User;
    post: {
      title: string;
      message: string;
      image?: string;
      tags: string[];
      location: Location;
      type: string;
      mentions: string[];
      status: string;
      pinned: boolean;
      metadata: {
        hashtags: string[];
      };
    };
    reactions: {
      likes: number;
      haha: number;
      loves: number;
    };
    comments: {
      comment_id: string;
      user: User;
      message: string;
      date_created: string;
    }[];
    shares: number;
    view_count: number;
}