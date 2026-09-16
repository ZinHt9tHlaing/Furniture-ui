import SEOHead from "@/components/MetaTagsHead/SEOHead";
import { useParams } from "react-router";

const ProductDetailPage = () => {
  const { productId } = useParams();

  return (
    <div>
      <SEOHead title={`Product Detail - ${productId}`} />
      ProductDetailPage {productId}
    </div>
  );
};

export default ProductDetailPage;
