import SEOHead from "@/components/MetaTagsHead/SEOHead";
import Title from "@/components/Title";
import BlogCard from "@/components/blog/BlogCard";
import { CarouselCard } from "@/components/products/CarouselCard";
import { Button } from "@/components/ui/button";
import Couch from "@/data/images/couch.png";
import { posts } from "@/data/posts";
import { products } from "@/data/products";
import { Link } from "react-router";

const HomePage = () => {
  return (
    <>
      <SEOHead title="Home" />
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row lg:justify-between">
          {/* Text Section */}
          <div className="my-8 text-center lg:mt-16 lg:mb-0 lg:w-2/5 lg:text-left">
            <h1 className="text-own dark:text-dark-own mb-4 text-4xl font-extrabold lg:mb-8 lg:text-6xl">
              Modern Interior Design Studio
            </h1>
            <p className="text-own dark:text-dark-own mb-6 lg:mb-8">
              Furniture is an essential component of any living space, providing
              functionality, comfort, and aesthetic appeal.
            </p>
            {/* Button Section */}
            <div>
              <Button className="mr-2 rounded-full bg-orange-300 px-8 py-6 text-base font-bold duration-200 hover:bg-orange-400 active:scale-95">
                <Link to="#">Shop Now</Link>
              </Button>
              <Button
                variant="outline"
                className="text-own dark:text-dark-own rounded-full px-8 py-6 text-base font-bold duration-200 active:scale-95"
              >
                <Link to="#">Explore</Link>
              </Button>
            </div>
          </div>
          {/* Image Section */}
          <img src={Couch} alt="Couch" className="w-full lg:w-3/5" />
        </div>

        {/* Carousel Section */}
        <CarouselCard products={products} />

        {/* Recent Blog  */}
        <Title title="Recent Blog" href="/blogs" sideText="View All Posts" />
        <BlogCard posts={posts} />
      </div>
    </>
  );
};

export default HomePage;
