export interface NavItem {
  title: string;
  href?: string;
  description?: string;
}

export interface NavItemWithChildren extends NavItem {
  card?: NavItemWithChildren[];
  menu?: NavItemWithChildren[];
}

export type MainNavItem = NavItemWithChildren;

export type Product = {
  id: string | number;
  name: string;
  description: string;
  images: string[];
  categoryId: string;
  price: number;
  discount: number;
  rating: number;
  inventory: number;
  status: string;
};

export type Post = {
  id: string | number;
  author: string;
  title: string;
  content: string;
  image: string;
  body: string;
  updated_at: string;
  tags: string[];
};

export type Category = {
  id: string | number;
  label: string;
};
