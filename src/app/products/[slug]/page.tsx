import { notFound, permanentRedirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight, ChevronRight } from "lucide-react";
import { PRODUCTS_DATA, getProductBySlug, getRelatedProducts } from "@/data/products";
import ProductDetailClient from "@/components/ProductDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = new Set(PRODUCTS_DATA.map((product) => product.slug));
  slugs.add("wicked-poly-bags");
  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const canonicalSlug = slug === "wicked-poly-bags" ? "wicketted-poly-bags" : slug;
  const product = getProductBySlug(canonicalSlug);

  if (!product) {
    return {
      title: "Product Not Found | Graphipacks Private Limited",
    };
  }

  const title = `${product.name} | Graphipacks Private Limited`;
  const description = product.metaDescription || product.summary;
  const coverImage = product.images[0]?.src || "/images/products/mulch-film.jpg";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: coverImage,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  if (slug === "wicked-poly-bags") {
    permanentRedirect("/products/wicketted-poly-bags");
  }
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.slug, 3);

  return (
    <div
      className="min-h-screen relative overflow-x-clip bg-light-atmosphere text-ink font-sans pt-32 pb-28 md:pt-40 md:pb-28 selection:bg-heritage selection:text-background"
    >
      <div aria-hidden="true" className="grain-layer pointer-events-none absolute inset-0 z-[1]" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* ================================================================= */}
        {/* BREADCRUMB NAVIGATION                                             */}
        {/* ================================================================= */}
        <nav
          aria-label="Breadcrumb"
          className="mb-10 pb-4 border-b border-powder flex items-center justify-between"
        >
          <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs font-mono font-medium text-ink/75">
            <li>
              <Link
                href="/"
                className="text-ink hover:text-heritage transition-colors"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3 w-3 text-steel" />
            </li>
            <li>
              <Link
                href="/products"
                className="text-ink hover:text-heritage transition-colors"
              >
                Products
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3 w-3 text-steel" />
            </li>
            <li>
              <span className="text-ink/75">{product.category}</span>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3 w-3 text-steel" />
            </li>
            <li className="font-bold text-heritage" aria-current="page">
              {product.name}
            </li>
          </ol>

          <Link
            href="/products"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-mono font-semibold text-ink hover:text-heritage transition-colors"
          >
            <span>&larr; Back to Catalog Index</span>
          </Link>
        </nav>

        {/* ================================================================= */}
        {/* SECTION A & B: CLIENT COMPONENT (GALLERY, VARIANTS, & SPEC TABLE) */}
        {/* ================================================================= */}
        <ProductDetailClient product={product} />

        {/* ================================================================= */}
        {/* SECTION C: TARGET APPLICATIONS (03 / TARGET APPLICATIONS)         */}
        {/* ================================================================= */}
        <section className="mb-24 md:mb-32 scroll-mt-32" id="applications">
          <div className="border-t border-powder/40 pt-16">
            <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16 flex flex-col items-center">
              <span className="inline-flex items-center justify-center gap-2 font-mono text-xs tracking-[0.2em] uppercase text-[#457B9D] mb-4">
                <span className="h-2 w-2 rounded-full bg-[#E63946] shrink-0" aria-hidden="true" />
                <span>03 / TARGET APPLICATIONS</span>
              </span>
              <h2 className="mt-1 font-display text-3xl sm:text-4xl md:text-[2.75rem] font-bold leading-[1.15] tracking-[-0.015em] text-[#1D3557] [text-wrap:balance]">
                Field Deployments &amp; Industry Use Cases
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-base md:text-[17px] leading-relaxed text-[#1D3557]/85">
                Formulated and manufactured strictly for designated operating environments, commercial crops, and industrial filling lines.
              </p>
            </div>

            {/* Application Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-9">
              {product.targetApplications.map((app, idx) => (
                <div
                  key={app.number}
                  className="rounded-lg border border-ink/10 bg-background p-6 md:p-8 hover:border-steel transition-colors duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-ink/10 pb-3">
                      <span className="font-mono text-[11px] font-bold text-steel uppercase tracking-wider">
                        APPLICATION REF. {app.number}
                      </span>
                      <span className="font-mono text-[10px] text-ink/75 uppercase tracking-wider">
                        DEPLOYMENT 0{idx + 1}
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-xl md:text-2xl font-bold leading-[1.2] tracking-[-0.01em] text-ink">
                      {app.title}
                    </h3>

                    <p className="mt-3 text-base md:text-[17px] leading-relaxed text-[#1D3557]/85">
                      {app.descriptor}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-ink/10 flex items-center justify-between text-[11px] font-mono text-ink/75">
                    <span>Graphipacks Est. 1984</span>
                    <span className="text-steel font-semibold">Industrial Grade</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION D: RELATED PRODUCTS (04 / RELATED PRODUCTS)               */}
        {/* ================================================================= */}
        <section className="scroll-mt-32" id="related-products">
          <div className="border-t border-powder/40 pt-16">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 md:mb-16">
              <div>
                <span className="block font-mono text-[11px] uppercase tracking-[0.22em] font-medium text-steel mb-4">
                  04 / RELATED PRODUCTS
                </span>
                <h2 className="mt-1 font-display text-3xl sm:text-4xl md:text-[2.75rem] font-bold leading-[1.15] tracking-[-0.015em] text-ink">
                  Complementary Manufacturing Lines
                </h2>
                <p className="mt-3 max-w-[62ch] text-[15px] md:text-base leading-[1.7] text-ink/75">
                  Explore related flexible packaging specifications manufactured at our Madurai plant.
                </p>
              </div>

              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-navy hover:text-steel transition-colors self-start sm:self-auto"
              >
                <span>Complete Catalog (All 6 Lines)</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Related 3-Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7 md:gap-9">
              {relatedProducts.map((rel, idx) => (
                <article
                  key={rel.slug}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-lg border border-powder/50 bg-background hover:border-steel transition-colors duration-200 ease-in-out"
                >
                  <div>
                    {/* Related Product Image — Curated Gallery Exhibit Mat */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface border-b border-powder/40">
                      <Image
                        src={rel.images[0]?.src}
                        alt={rel.images[0]?.alt || rel.name}
                        width={600}
                        height={375}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out md:group-hover:scale-[1.02]"
                      />

                      <div className="absolute top-3 left-3">
                        <span className="rounded-sm bg-powder/20 px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-navy border border-powder">
                          {rel.category}
                        </span>
                      </div>

                      <div className="absolute bottom-3 right-3">
                        <span className="rounded-sm bg-navy px-2 py-0.5 font-mono text-[10px] font-bold text-background">
                          MOQ: {rel.moq}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-steel block">
                        Line 0{idx + 1}
                      </span>
                      <h3 className="mt-2 font-display text-xl md:text-2xl font-bold leading-[1.2] tracking-[-0.01em] text-ink group-hover:text-navy transition-colors duration-200 ease-in-out">
                        <Link href={`/products/${rel.slug}`}>
                          <span className="absolute inset-0" aria-hidden="true" />
                          {rel.name}
                        </Link>
                      </h3>
                      <p className="mt-2 text-sm md:text-[15px] text-ink/75 line-clamp-2 leading-[1.7]">
                        {rel.summary}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-ink/10 p-6 md:p-8 pt-4 flex items-center justify-between text-xs font-bold text-steel group-hover:text-navy transition-colors duration-200 ease-in-out">
                    <span>View Specifications</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-200 ease-in-out" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
