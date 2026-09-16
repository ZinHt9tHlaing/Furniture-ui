import type { Post } from "@/types";
import { Link } from "react-router";

interface BlogCardProps {
  posts: Post[];
}

const imageUrl = import.meta.env.VITE_IMG_URL ?? "";

const BlogCard = ({ posts }: BlogCardProps) => {
  return (
    <div className="my-8 grid grid-cols-1 gap-8 px-4 md:grid-cols-2 md:px-0 lg:grid-cols-3 lg:px-0">
      {posts.map((post) => (
        <div className="flex-col" key={post.id}>
          <Link to={`/blogs/${post.id}`}>
            <img
              src={imageUrl + post.image}
              alt={post.title}
              loading="lazy"
              decoding="async"
              className="mb-4 w-full rounded-2xl transition-all duration-500 ease-in-out lg:hover:scale-105"
            />
          </Link>
          <h3 className="ml-4 line-clamp-1 text-lg font-bold">{post.title}</h3>
          <div className="mt-2 ml-4 text-sm">
            <span>
              by<span className="font-semibold"> {post.author} </span>
              on
              <span className="font-semibold"> {post.updated_at}</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogCard;
