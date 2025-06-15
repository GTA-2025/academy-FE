export interface Comment {
  _id: string;
  content: string;
  // add other comment fields
}


export interface Post {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  author: string;
  authorId: string;
  fullName: string;
profilePicture: string,
  images: string;
  liked: boolean;
  likes: string[];
  likesCount: number;
  comments: Comment[];
}
