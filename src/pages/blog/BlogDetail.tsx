import BackButton from "@/components/BackButton";
import { Icons } from "@/components/Icons";
import SEOHead from "@/components/MetaTagsHead/SEOHead";
import RichTextRenderer from "@/components/blog/RichTextRenderer";
import { Button } from "@/components/ui/button";
import { posts } from "@/data/posts";
import { Link, useParams } from "react-router";

const BlogsDetailPage = () => {
  const { postId } = useParams();
  const postDetailData = posts.find((post) => post.id === postId);

  if (!postDetailData) {
    return <h1>Post not found</h1>;
  }

  const imageUrl = import.meta.env.VITE_IMG_URL ?? "";

  return (
    <>
      <SEOHead title={`Blog Detail - ${postId}`} />
      <div className="container mx-auto px-4 md:px-0">
        <section className="flex flex-col lg:flex-row">
          <section className="w-full lg:w-3/4 lg:pr-16">
            {/* back button */}
            <BackButton href="/blogs" label="All Posts" />

            {postDetailData ? (
              <>
                <h2 className="mb-3 text-3xl font-extrabold">
                  {postDetailData.title}
                </h2>
                <div className="text-sm">
                  <span>
                    by
                    <span className="font-semibold">
                      {" "}
                      {postDetailData.author}{" "}
                    </span>
                    on{" "}
                    <span className="font-semibold">
                      {postDetailData.updated_at}
                    </span>
                  </span>
                </div>
                <h3 className="my-6 text-base font-normal">
                  {postDetailData.content}
                </h3>
                <img
                  src={imageUrl + postDetailData.image}
                  alt={postDetailData.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full rounded-xl"
                />
                <RichTextRenderer
                  content={postDetailData.body}
                  className="mb-6"
                />
                <div className="mb-12 space-x-2">
                  {postDetailData.tags.map((tag, index: number) => (
                    <Button variant={"secondary"} key={index}>
                      {tag}
                    </Button>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-muted-foreground mt-8 mb-16 text-center text-xl font-bold lg:mt-24">
                No post found
              </p>
            )}
          </section>

          {/* Other */}
          <section className="w-full lg:mt-24 lg:w-1/4">
            <div className="mb-8 flex items-center gap-4 text-base font-semibold">
              <Icons.layers />
              <h3 className="">Other Blog Posts</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
              {posts.map((post) => (
                <Link
                  to={`/blogs/${post.id}`}
                  key={post.id}
                  className="mb-6 flex items-start gap-2"
                >
                  <img
                    src={imageUrl + post.image}
                    alt={post.title}
                    loading="lazy"
                    decoding="async"
                    className="w-1/4 rounded"
                  />
                  <div className="text-muted-foreground w-3/4 text-sm font-medium">
                    <p className="line-clamp-2">{post.content}</p>
                    <i>... see more</i>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </section>
      </div>
    </>
  );
};

export default BlogsDetailPage;
