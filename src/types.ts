export interface Session {
  user: {
    name: string;
    email: string;
    image?: string;
  };
  expires: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
}
