import type { Post } from "@/types";
import { Link } from "react-router";

type PostListProps = {
  posts: Post[];
};

const imageUrl = import.meta.env.VITE_IMG_URL ?? "";

const BlogPostList = ({ posts }: PostListProps) => {
  return (
    <div className="my-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:px-0">
      {posts.map((post) => (
        <div className="flex-col" key={post.id}>
          <Link to={`/blogs/${post.id}`}>
            <img
              src={imageUrl + post.image}
              alt={post.title}
              loading="lazy"
              decoding="async"
              className="mb-4 w-full rounded-xl"
            />
          </Link>
          <h2 className="line-clamp-1 text-xl font-extrabold">{post.title}</h2>
          <h3 className="my-2 line-clamp-3 text-base font-normal">
            {post.content}
          </h3>
          <div className="text-sm">
            <span>
              by<span className="font-semibold"> {post.author} </span>on
              <span className="font-semibold"> {post.updated_at}</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogPostList;
