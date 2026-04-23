import { MagazineShell } from "@/components/MagazineShell";
import { Masthead } from "@/components/Masthead";
import { WingitLink } from "@/components/WingitLink";
import { products } from "@/lib/content";

const [featuredProduct, ...allProducts] = products;

export default function Products() {
  return (
    <MagazineShell>
      <Masthead
        numeral="IV"
        kicker="Products"
        title="Product Portfolio"
        subtitle="Devs Miami has a variety of products, from a flagship live presentation engine to developer APIs, marketplaces, utilities, and R&D systems."
      />

      <section className="grid border-b border-black/15 lg:grid-cols-[1fr_1.1fr]">
        <div className="border-b border-black/15 bg-ink2 px-6 py-10 text-bone sm:px-8 lg:border-b-0 lg:border-r lg:px-12 lg:py-12">
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-white/50">Featured Product</p>
          <h2 className="text-[3rem] font-black uppercase leading-none sm:text-[5rem]">{featuredProduct.title}</h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80">{featuredProduct.blurb}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {featuredProduct.tags.map((tag) => (
              <span key={tag} className="rounded-md border border-white/15 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-white/75">
                {tag}
              </span>
            ))}
          </div>
          <WingitLink
            href={featuredProduct.href}
            capture={{ event: "cta_click", properties: { cta: "products_wingit" } }}
            className="mt-8 inline-flex rounded-md bg-heat px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink2 transition hover:-translate-y-0.5"
          >
            Wingit Live
          </WingitLink>
        </div>

        <div className="bg-amber px-6 py-10 sm:px-8 lg:px-12 lg:py-12">
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-black/55">Key Features</p>
          <ul className="grid gap-4">
            {featuredProduct.features?.map((feature) => (
              <li key={feature} className="rounded-lg border border-black/15 bg-white/55 p-5 text-lg font-black uppercase leading-tight text-black/80">
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-black/45">All Products</p>
            <h2 className="text-3xl font-black uppercase sm:text-4xl">In This Issue</h2>
          </div>
          <p className="max-w-lg text-sm leading-relaxed text-black/65">
            Each product reads as proof-of-work: shipped surfaces, useful infrastructure, and experiments that point toward the next system.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {allProducts.map((product, index) => {
            const hasLink = product.href !== "#";
            return (
              <article key={product.title} className="rounded-lg border border-black/15 bg-white/70 p-6">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.24em] text-black/45">{product.category}</p>
                    <h3 className="mt-2 text-2xl font-black uppercase">{product.title}</h3>
                  </div>
                  <span className="font-mono text-xs text-black/35">{String(index + 2).padStart(2, "0")}</span>
                </div>
                <p className="text-sm leading-relaxed text-black/75">{product.blurb}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span key={tag} className="rounded-md border border-black/15 px-2.5 py-1.5 text-[10px] uppercase tracking-[0.15em] text-black/55">
                      {tag}
                    </span>
                  ))}
                </div>
                {hasLink ? (
                  <a
                    href={product.href}
                    className="mt-6 inline-flex text-xs font-black uppercase tracking-[0.2em] text-black/70 transition hover:text-black"
                  >
                    Open product -&gt;
                  </a>
                ) : (
                  <span className="mt-6 inline-flex text-xs font-black uppercase tracking-[0.2em] text-black/40">In development</span>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </MagazineShell>
  );
}
