import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServicesDetail } from "@/components/services-detail";
import { getCategoryBySlug, getServiceBySlug, getServicesByCategory, serviceCategories } from "@/content/services";
import { siteConfig } from "@/content/site";

type Params = { params: Promise<{ category: string; service: string }> };

export function generateStaticParams() {
  return serviceCategories.flatMap((category) =>
    getServicesByCategory(category.slug).map((service) => ({
      category: category.slug,
      service: service.slug,
    })),
  );
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category: categorySlug, service: serviceSlug } = await params;
  const service = getServiceBySlug(categorySlug, serviceSlug);

  if (!service) {
    return { title: `Services | ${siteConfig.name}` };
  }

  return {
    title: `${service.name} | ${siteConfig.name}`,
    description: service.description,
    openGraph: {
      title: `${service.name} | ${siteConfig.name}`,
      description: service.description,
    },
  };
}

export default async function ServicePage({ params }: Params) {
  const { category: categorySlug, service: serviceSlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  const service = getServiceBySlug(categorySlug, serviceSlug);

  if (!category || !service) {
    notFound();
  }

  return <ServicesDetail service={service} />;
}