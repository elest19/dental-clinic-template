import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CategoryDetail } from "@/components/category-detail";
import { getCategoryBySlug, serviceCategories } from "@/content/services";
import { siteConfig } from "@/content/site";

type Params = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return serviceCategories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return { title: `Services | ${siteConfig.name}` };
  }

  return {
    title: `${category.name} | ${siteConfig.name}`,
    description: category.description,
    openGraph: {
      title: `${category.name} | ${siteConfig.name}`,
      description: category.description,
    },
  };
}

export default async function CategoryPage({ params }: Params) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  return <CategoryDetail category={category} />;
}