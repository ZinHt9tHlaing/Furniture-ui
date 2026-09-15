import SEOHead from "@/components/MetaTagsHead/SEOHead";
import { useParams } from "react-router";

const BlogsDetailPage = () => {
  const { postId } = useParams();

  return (
    <>
      <SEOHead title={`Blog Detail - ${postId}`} />
      BlogsDetailPage : {postId}
    </>
  );
};

export default BlogsDetailPage;
