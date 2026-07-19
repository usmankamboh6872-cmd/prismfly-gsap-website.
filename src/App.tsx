import { useLayoutEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    index: "01",
    title: <>Conversion Rate<br />Optimization</>,
    copy: "Maximizing revenue with data-driven testing.",
    link: "Explore CRO",
  },
  {
    index: "02",
    title: <>Shopify<br />Development</>,
    copy: "Custom themes, builds, migrations, and integrations.",
    link: "Explore Development",
  },
  {
    index: "03",
    title: <>Design &<br />Branding</>,
    copy: "Holistic branding and conversion-driven ecommerce design.",
    link: "Explore Design",
  },
];

const caseStudies = [
  { brand: "Mood", metric: "16% lift", detail: "How a Single Design Moment Drove a 16% Lift in Conversion", tone: "#9a5dec" },
  { brand: "PeakAire", metric: "100% sync", detail: "Automating Fulfillment to Eliminate Manual Risk and Create a Scalable Order Engine", tone: "#e47fb4" },
  { brand: "DFTBA", metric: "+52% CVR", detail: "+52% Conversion Lift Through a Theme Redesign Focused on Creators", tone: "#8254db" },
  { brand: "Zoku", metric: "44% growth", detail: "44% Sales Growth and a Faster, More Accessible Storefront", tone: "#cf83ea" },
  { brand: "Primal Kitchen", metric: "20% uptake", detail: "Reinventing the Bundle Builder to Reach 20% Subscription Uptake", tone: "#753ebd" },
];

const reviews = [
  {
    category: "Personal Care",
    result: "Operational clarity",
    title: '“Let\'s keep the momentum rolling.”',
    copy: "For the prior four years, modernizing our complex CMS and subscription program seemed insurmountable. Step by step, Prismfly broke large problems down and helped us see the light at the end of the tunnel.",
    name: "Stephen Pinto",
    role: "Sr. Director of Product Management",
    initials: "SP",
  },
  {
    category: "Beauty",
    result: "+35% Conversion Rate",
    title: '“I would highly recommend Prismfly.”',
    copy: "They are organized, efficient, knowledgeable, and responsive. The team helped us improve CVR by 35%, driving a significant lift in revenue as well.",
    name: "Liliya Kay",
    role: "Director of Ecommerce",
    initials: "LK",
  },
  {
    category: "Technology",
    result: "+142% Speed Score",
    title: '“Not just an agency, but a partner.”',
    copy: "They constantly help us think through challenges and create better experiences that drive growth. Their communication is efficient, so we get to market quickly.",
    name: "Caleb Fox",
    role: "Vice President of Ecommerce",
    initials: "CF",
  },
  {
    category: "Home",
    result: "3+ year partnership",
    title: '“Definitely a gem!”',
    copy: "Prismfly has more than proven its ability to make a significant difference in user experience and conversion rate. The team is personable and enjoyable to work with.",
    name: "Sarah Miller",
    role: "VP, Digital Commerce",
    initials: "SM",
  },
];

const clientNames = ["PRIMAL KITCHEN", "PRINCESS POLLY", "XTREMA", "REVIVAL", "SIMPLE MODERN", "CRUNCHLABS", "LUXY", "MIKU", "STROLLERIA", "LASHIFY"];

function BrandMark({ large = false }: { large?: boolean }) {
  return (
    <span className={large ? "brand brand--large" : "brand"} aria-label="Prismfly">
      <span className="brand__prism">✦</span> PRISMFLY
    </span>
  );
}

function Button({ children, dark = false, href = "#contact" }: { children: React.ReactNode; dark?: boolean; href?: string }) {
  return <a className={`button magnetic ${dark ? "button--dark" : ""}`} href={href}><span>{children}</span><ArrowRight size={15} /></a>;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="eyebrow reveal"><i />{children}</div>;
}

function GradientText({ children }: { children: React.ReactNode }) {
  return <span className="gradient-text">{children}</span>;
}

function App() {
  const root = useRef<HTMLDivElement>(null);
  const serviceTrack = useRef<HTMLDivElement>(null);
  const workPreview = useRef<HTMLDivElement>(null);
  const reviewTrack = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const reviewIndex = useRef(0);

  useLayoutEffect(() => {
    const cleanups: Array<() => void> = [];
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        gsap.set(".reveal, .title-line, .service-card, .case-row, .metric-fill", { clearProps: "all" });
        return;
      }

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from(".nav", { y: -40, opacity: 0, duration: 0.7 })
        .from(".hero .eyebrow", { y: 18, opacity: 0, duration: 0.55 }, "-=.2")
        .from(".hero .title-line > span", { yPercent: 115, rotate: 3, duration: 1, stagger: 0.11 }, "-=.2")
        .from(".hero__copy, .hero__actions", { y: 24, opacity: 0, duration: 0.7, stagger: 0.12 }, "-=.55");

      gsap.to(".hero__orb", {
        xPercent: 12,
        yPercent: 8,
        scale: 1.15,
        duration: 7,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
        if (element.closest(".hero")) return;
        gsap.from(element, {
          y: 42,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 86%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>(".section-title").forEach((title) => {
        const lines = title.querySelectorAll(".title-line > span");
        gsap.from(lines, {
          yPercent: 110,
          duration: 0.9,
          stagger: 0.08,
          ease: "power4.out",
          scrollTrigger: { trigger: title, start: "top 82%", once: true },
        });
      });

      gsap.to(".logo-marquee__track", { xPercent: -50, duration: 24, ease: "none", repeat: -1 });

      media.add("(min-width: 900px)", () => {
        if (serviceTrack.current) {
          const distance = Math.max(0, serviceTrack.current.scrollWidth - window.innerWidth + 120);
          gsap.to(serviceTrack.current, {
            x: -distance,
            ease: "none",
            scrollTrigger: {
              trigger: ".services__pin",
              start: "top top",
              end: () => `+=${distance + 850}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
        }

        let skewSetter = gsap.quickTo(".velocity-skew", "skewY", { duration: 0.8, ease: "power3" });
        ScrollTrigger.create({
          onUpdate: (self) => skewSetter(gsap.utils.clamp(-7, 7, self.getVelocity() / -550)),
        });
      });

      gsap.utils.toArray<HTMLElement>(".case-row").forEach((row, index) => {
        gsap.from(row, {
          y: 55,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.025,
          scrollTrigger: { trigger: row, start: "top 90%", once: true },
        });
      });

      gsap.from(".variation-card", {
        x: -60,
        opacity: 0,
        stagger: 0.16,
        duration: 0.8,
        scrollTrigger: { trigger: ".impact-visual", start: "top 75%", once: true },
      });
      gsap.from(".metric-card", {
        x: 60,
        opacity: 0,
        stagger: 0.16,
        duration: 0.8,
        scrollTrigger: { trigger: ".impact-visual", start: "top 75%", once: true },
      });
      gsap.from(".metric-fill", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.25,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ".impact-visual", start: "top 70%", once: true },
      });

      gsap.to(".partnership__mesh--one", { xPercent: 15, yPercent: -8, scale: 1.18, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".partnership__mesh--two", { xPercent: -12, yPercent: 10, scale: 1.12, duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.utils.toArray<HTMLElement>(".floating-label").forEach((label, i) => {
        gsap.to(label, { y: i % 2 ? -18 : 20, x: i % 2 ? 11 : -9, rotate: i % 2 ? 2 : -2, duration: 2.8 + i * .35, yoyo: true, repeat: -1, ease: "sine.inOut" });
      });

      document.querySelectorAll<HTMLElement>(".magnetic").forEach((button) => {
        const moveX = gsap.quickTo(button, "x", { duration: 0.35, ease: "power3" });
        const moveY = gsap.quickTo(button, "y", { duration: 0.35, ease: "power3" });
        const onMove = (event: MouseEvent) => {
          const rect = button.getBoundingClientRect();
          moveX((event.clientX - rect.left - rect.width / 2) * 0.18);
          moveY((event.clientY - rect.top - rect.height / 2) * 0.18);
        };
        const onLeave = () => { moveX(0); moveY(0); };
        button.addEventListener("mousemove", onMove);
        button.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          button.removeEventListener("mousemove", onMove);
          button.removeEventListener("mouseleave", onLeave);
        });
      });

      const cursor = document.querySelector<HTMLElement>(".cursor-dot");
      const ring = document.querySelector<HTMLElement>(".cursor-ring");
      if (cursor && ring && window.matchMedia("(pointer:fine)").matches) {
        const dotX = gsap.quickTo(cursor, "x", { duration: 0.12, ease: "power3" });
        const dotY = gsap.quickTo(cursor, "y", { duration: 0.12, ease: "power3" });
        const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
        const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });
        const onCursorMove = (event: MouseEvent) => {
          dotX(event.clientX); dotY(event.clientY); ringX(event.clientX); ringY(event.clientY);
        };
        window.addEventListener("mousemove", onCursorMove);
        cleanups.push(() => window.removeEventListener("mousemove", onCursorMove));
      }
    }, root);

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      context.revert();
      media.revert();
    };
  }, []);

  const movePreview = (event: React.MouseEvent<HTMLElement>, tone: string, brand: string) => {
    if (!workPreview.current || window.matchMedia("(pointer:coarse)").matches) return;
    workPreview.current.textContent = brand;
    gsap.to(workPreview.current, { x: event.clientX + 26, y: event.clientY - 65, background: tone, scale: 1, opacity: 1, duration: 0.35, ease: "power3.out" });
  };

  const hidePreview = () => {
    if (workPreview.current) gsap.to(workPreview.current, { scale: 0.65, opacity: 0, duration: 0.25 });
  };

  const shiftReviews = (direction: number) => {
    if (!reviewTrack.current) return;
    reviewIndex.current = Math.max(0, Math.min(reviews.length - 1, reviewIndex.current + direction));
    const card = reviewTrack.current.querySelector<HTMLElement>(".review-card");
    if (!card) return;
    const amount = (card.offsetWidth + 24) * reviewIndex.current;
    gsap.to(reviewTrack.current, { x: -amount, duration: 0.8, ease: "power4.inOut" });
  };

  return (
    <div ref={root} className="site-shell">
      <div className="cursor-dot" aria-hidden="true" />
      <div className="cursor-ring" aria-hidden="true" />

      <header className="nav">
        <a href="#top" className="nav__logo"><BrandMark /></a>
        <nav className={menuOpen ? "nav__links is-open" : "nav__links"} aria-label="Main navigation">
          <a href="#work" onClick={() => setMenuOpen(false)}>Our Work</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services <ChevronDown size={13} /></a>
          <a href="#about" onClick={() => setMenuOpen(false)}>Company <ChevronDown size={13} /></a>
          <a href="#insights" onClick={() => setMenuOpen(false)}>Blog</a>
          <Button href="#contact">Let’s Talk</Button>
        </nav>
        <button className="nav__toggle" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero__orb" />
          <div className="container hero__inner">
            <Eyebrow>👋 &nbsp; Hey there, you’ve made it</Eyebrow>
            <h1 className="hero__title velocity-skew">
              <span className="title-line"><span>Award-winning DTC</span></span>
              <span className="title-line"><span><GradientText>Optimization</GradientText></span></span>
            </h1>
            <p className="hero__copy">Revenue growth for ecommerce brands through CRO, tailored development, standout design, and personalized lifecycle marketing.</p>
            <div className="hero__actions"><Button>Let’s Talk</Button><Button dark href="#work">Our Work</Button></div>
          </div>
        </section>

        <section className="logo-marquee" aria-label="Selected clients">
          <div className="logo-marquee__track">
            {[...clientNames, ...clientNames].map((name, i) => <span key={`${name}-${i}`}>{name}</span>)}
          </div>
        </section>

        <section className="services" id="services">
          <div className="services__pin">
            <div className="container services__header">
              <Eyebrow>Services</Eyebrow>
              <h2 className="section-title"><span className="title-line"><span>Your <GradientText>one-stop</GradientText> for DTC</span></span><span className="title-line"><span>optimization</span></span></h2>
            </div>
            <div className="services__viewport">
              <div className="services__track" ref={serviceTrack}>
                {services.map((service) => (
                  <article className="service-card" key={service.index}>
                    <span className="service-card__index">Service {service.index}</span>
                    <div><h3>{service.title}</h3><p>{service.copy}</p></div>
                    <a href="#contact">{service.link}<ArrowRight size={17} /></a>
                    <div className="service-card__glow" />
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="work section-pad" id="work">
          <div className="container">
            <div className="section-heading">
              <Eyebrow>Case studies</Eyebrow>
              <h2 className="section-title"><span className="title-line"><span>Work that <GradientText>speaks for</GradientText></span></span><span className="title-line"><span><GradientText>itself</GradientText></span></span></h2>
            </div>
            <div className="case-list">
              {caseStudies.map((item) => (
                <a className="case-row" href="#contact" key={item.brand} onMouseMove={(e) => movePreview(e, item.tone, item.brand)} onMouseLeave={hidePreview}>
                  <h3>{item.brand}</h3><span>{item.metric}</span><p>{item.detail}</p><ArrowRight size={22} />
                </a>
              ))}
            </div>
            <div className="center"><Button dark>See More</Button></div>
          </div>
        </section>

        <div ref={workPreview} className="work-preview" aria-hidden="true" />

        <section className="impact section-pad" id="insights">
          <div className="container">
            <div className="section-heading section-heading--compact">
              <Eyebrow>Experimentation impact</Eyebrow>
              <h2 className="section-title"><span className="title-line"><span>Turn insights into</span></span><span className="title-line"><span><GradientText>revenue</GradientText></span></span></h2>
              <p className="reveal">A single successful A/B test can create significant lifts in profit annually. We conduct a lot of tests to ensure the best results for your business.</p>
            </div>
            <div className="impact-visual reveal">
              <div className="variations">
                <div className="variation-card"><b>Variation A</b><i /><i className="active" /><i /></div>
                <div className="variation-card variation-card--b"><b>Variation B</b><div><i className="active vertical" /><span><i /><i /><i /></span></div></div>
              </div>
              <div className="connector" aria-hidden="true"><span /></div>
              <div className="metrics">
                <div className="metric-card"><h3>Average Order Value <small>i</small></h3><div className="metric-line"><i className="metric-fill fill-60" /><b>+22%</b></div></div>
                <div className="metric-card metric-card--active"><h3>Purchase Conversion Rate <small>i</small></h3><div className="metric-line"><i className="metric-fill fill-84" /><b>12.9%</b></div></div>
                <div className="metric-card"><h3>Monthly Sessions <small>i</small></h3><div className="metric-line"><i className="metric-fill fill-72" /><b>242,000</b></div></div>
              </div>
            </div>
          </div>
        </section>

        <section className="partnership" id="about">
          <div className="partnership__mesh partnership__mesh--one" />
          <div className="partnership__mesh partnership__mesh--two" />
          <span className="floating-label label--cro">↗ CRO</span><span className="floating-label label--email">↖ EMAIL</span><span className="floating-label label--design">↗ DESIGN</span><span className="floating-label label--dev">↖ DEVELOPMENT</span>
          <div className="container partnership__inner">
            <h2 className="section-title"><span className="title-line"><span>Every specialist,</span></span><span className="title-line"><span><GradientText>One partnership</GradientText></span></span></h2>
            <p className="reveal">Work with seasoned CRO, Email, Development, and Design experts who feel like an extension of your team, all in-sync to drive success.</p>
            <strong className="reveal">No generalists. No one is green.</strong>
            <Button>Let’s Talk</Button>
          </div>
        </section>

        <section className="reviews section-pad">
          <div className="container section-heading section-heading--reviews">
            <Eyebrow>Reviews</Eyebrow>
            <h2 className="section-title"><span className="title-line"><span>Backed by operators.</span></span><span className="title-line"><span><GradientText>Results to prove it.</GradientText></span></span></h2>
          </div>
          <div className="reviews__viewport">
            <div className="reviews__track" ref={reviewTrack}>
              {reviews.map((review) => (
                <article className="review-card" key={review.name}>
                  <div className="review-card__meta"><b>{review.category}</b><span>▲ {review.result}</span></div>
                  <h3>{review.title}</h3><p>{review.copy}</p>
                  <div className="review-card__person"><i>{review.initials}</i><span><b>{review.name}</b><small>{review.role}</small></span><strong>{review.category === "Technology" ? "miku" : review.category === "Beauty" ? "luxy" : "Prismfly"}</strong></div>
                </article>
              ))}
            </div>
          </div>
          <div className="reviews__controls"><button onClick={() => shiftReviews(-1)} aria-label="Previous review"><ArrowLeft /></button><button onClick={() => shiftReviews(1)} aria-label="Next review"><ArrowRight /></button></div>
        </section>

        <section className="contact section-pad" id="contact">
          <div className="container contact__inner">
            <Eyebrow>Ready when you are</Eyebrow>
            <h2 className="section-title"><span className="title-line"><span>Let’s talk about</span></span><span className="title-line"><span><GradientText>your project</GradientText></span></span></h2>
            <div className="contact__actions reveal"><Button>Let’s Talk</Button><Button dark href="#work">Our Work</Button></div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer__ticker"><span>Data Driven Optimization for DTC</span><span>Our Work &nbsp; · &nbsp; Services &nbsp; · &nbsp; Company &nbsp; · &nbsp; Blog</span></div>
        <div className="container footer__brand"><BrandMark large /></div>
        <div className="footer__bottom"><span>© 2026 Prismfly. All Rights Reserved.</span><span>Dallas &nbsp;&nbsp; New York</span><span>LinkedIn &nbsp; Instagram &nbsp; X</span></div>
      </footer>
    </div>
  );
}

export default App;
