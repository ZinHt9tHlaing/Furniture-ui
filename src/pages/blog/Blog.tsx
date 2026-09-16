import SEOHead from "@/components/MetaTagsHead/SEOHead";
import BlogPostList from "@/components/blog/BlogPostList";
import { posts } from "@/data/posts";

const BlogPage = () => {
  return (
    <>
      <SEOHead title="Blogs" />

      <div className="container mx-auto mt-10 px-4 md:px-0">
        <h1 className="mb-5 text-center text-3xl font-bold md:text-left">
          Latest Blog Posts
        </h1>

        <BlogPostList posts={posts} />
      </div>
    </>
  );
};

export default BlogPage;
