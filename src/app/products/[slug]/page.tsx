import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import { ArrowRight, ChevronRight, Check } from "lucide-react";
import { PRODUCTS_DATA, getProductBySlug, getRelatedProducts } from "@/data/products";
import ProductDetailClient from "@/components/ProductDetailClient";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-playfair",
  display: "swap",
});

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
  const product = getProductBySlug(slug);

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
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.slug, 3);

  return (
    <div
      className={`${playfair.variable} min-h-screen bg-[#F8F4EC] text-[#222222] font-sans pt-32 sm:pt-36 md:pt-40 lg:pt-44 pb-24 selection:bg-[#B08D57] selection:text-[#091B2C]`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ================================================================= */}
        {/* BREADCRUMB NAVIGATION (GUARANTEED NO OVERLAP WITH HEADER)        */}
        {/* ================================================================= */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 pb-4 border-b border-[#B08D57]/20 flex items-center justify-between"
        >
          <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs font-mono font-medium text-[#555555]">
            <li>
              <Link
                href="/"
                className="text-[#0F2A44] hover:text-[#B08D57] transition-colors"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3 w-3 text-[#B08D57]" />
            </li>
            <li>
              <Link
                href="/products"
                className="text-[#0F2A44] hover:text-[#B08D57] transition-colors"
              >
                Products
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3 w-3 text-[#B08D57]" />
            </li>
            <li>
              <span className="text-[#555555]">{product.category}</span>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3 w-3 text-[#B08D57]" />
            </li>
            <li className="font-bold text-[#0F2A44]" aria-current="page">
              {product.name}
            </li>
          </ol>

          <Link
            href="/products"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-mono font-semibold text-[#0F2A44] hover:text-[#B08D57] transition-colors"
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
        <section className="mb-24 scroll-mt-32" id="applications">
          <div className="border-t border-[#B08D57]/30 pt-14">
            <div className="max-w-3xl mb-10">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#B08D57] block">
                03 / TARGET APPLICATIONS
              </span>
              <h2 className="mt-1 font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0F2A44]">
                Field Deployments &amp; Industry Use Cases
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#555555] leading-relaxed">
                Formulated and manufactured strictly for designated operating environments, commercial crops, and industrial filling lines.
              </p>
            </div>

            {/* Unique Application Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.targetApplications.map((app, idx) => (
                <div
                  key={app.number}
                  className="rounded-xl border border-[#B08D57]/25 bg-white p-7 shadow-xs hover:border-[#B08D57]/60 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-[#B08D57]/15 pb-3">
                      <span className="font-mono text-[11px] font-bold text-[#B08D57] uppercase tracking-wider">
                        APPLICATION REF. {app.number}
                      </span>
                      <span className="font-mono text-[10px] text-[#555555] uppercase tracking-wider">
                        DEPLOYMENT 0{idx + 1}
                      </span>
                    </div>

                    <h3 className="mt-4 font-[family-name:var(--font-playfair)] text-xl font-bold text-[#0F2A44]">
                      {app.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-[#333333] leading-relaxed">
                      {app.descriptor}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#0F2A44]/10 flex items-center justify-between text-[11px] font-mono text-[#555555]">
                    <span>Graphipacks Est. 1984</span>
                    <span className="text-[#B08D57] font-semibold">Industrial Grade</span>
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
          <div className="border-t border-[#B08D57]/30 pt-14">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#B08D57] block">
                  04 / RELATED PRODUCTS
                </span>
                <h2 className="mt-1 font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl font-bold tracking-tight text-[#0F2A44]">
                  Complementary Manufacturing Lines
                </h2>
                <p className="mt-1 text-sm text-[#555555]">
                  Explore related flexible packaging specifications manufactured at our Madurai plant.
                </p>
              </div>

              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#0F2A44] hover:text-[#B08D57] transition-colors self-start sm:self-auto"
              >
                <span>Complete Catalog (All 6 Lines)</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Related 3-Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {relatedProducts.map((rel, idx) => (
                <article
                  key={rel.slug}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-[#B08D57]/30 bg-white shadow-sm hover:border-[#B08D57] transition-colors duration-200 ease-in-out"
                >
                  <div>
                    {/* Related Product Image */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0F2A44] border-b border-[#B08D57]/20">
                      <Image
                        src={rel.images[0]?.src}
                        alt={rel.images[0]?.alt || rel.name}
                        width={600}
                        height={375}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        loading="lazy"
                        decoding="async"
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4IDUiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjUiIGZpbGw9IiMwZjJhNDQiLz48L3N2Zz4="
                        className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-[1.03]"
                      />

                      <div className="absolute top-3 left-3">
                        <span className="rounded-sm bg-[#0F2A44]/95 px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-[#F8F4EC] border border-[#B08D57]/40">
                          {rel.category}
                        </span>
                      </div>

                      <div className="absolute bottom-3 right-3">
                        <span className="rounded-sm bg-[#B08D57] px-2 py-0.5 font-mono text-[10px] font-bold text-[#091B2C]">
                          MOQ: {rel.moq}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#B08D57] block">
                        Line 0{idx + 1}
                      </span>
                      <h3 className="mt-1 font-[family-name:var(--font-playfair)] text-xl font-bold text-[#0F2A44] group-hover:text-[#B08D57] transition-colors duration-200 ease-in-out">
                        <Link href={`/products/${rel.slug}`}>
                          <span className="absolute inset-0" aria-hidden="true" />
                          {rel.name}
                        </Link>
                      </h3>
                      <p className="mt-2 text-xs text-[#555555] line-clamp-2 leading-relaxed">
                        {rel.summary}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-[#0F2A44]/10 p-6 pt-3 flex items-center justify-between text-xs font-bold text-[#0F2A44] group-hover:text-[#B08D57] transition-colors duration-200 ease-in-out">
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
