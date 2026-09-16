import { Link } from "react-router";

type TitleProps = {
  title: string;
  href?: string;
  sideText?: string;
};

const Title = ({ title, href, sideText }: TitleProps) => (
  <div className="mt-28 mb-10 flex flex-col px-4 md:px-0 md:flex-row md:items-center md:justify-between lg:px-0">
    <h2 className="mb-4 text-2xl font-bold md:mb-0">{title}</h2>
    <Link
      to={String(href)}
      className="text-muted-foreground font-semibold underline duration-200 md:active:scale-100 lg:hover:scale-105"
    >
      {sideText}
    </Link>
  </div>
);

export default Title;
