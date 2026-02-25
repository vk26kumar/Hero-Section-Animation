"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLImageElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".glass-card", { opacity: 1, y: 0 });

      gsap.config({ force3D: true });
      gsap.ticker.lagSmoothing(1000, 16);

      const introTl = gsap.timeline();

      introTl
        .from(".headline span", {
          y: 120,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.04,
        })
        .from(".subtext span", {
          y: 40,
          opacity: 0,
          stagger: 0.03,
        })
        .fromTo(
          ".glass-card",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 }
        )
        .from(carRef.current, {
          x: -300,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        });

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=200%",
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      scrollTl
        .to(".headline", { y: -200, scale: 0.8, opacity: 0 }, 0)
        .to(".subtext", { y: -150, opacity: 0 }, 0)
        .to(".bg-glow", { scale: 1.5, opacity: 0.3 }, 0)
        .fromTo(
          ".glass-card",
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1 },
          0.1
        )
        .to(
          ".glass-card",
          { y: -30, stagger: 0.1 },
          0.4
        )
        .to(
          ".glass-card",
          { opacity: 0, y: -80, stagger: 0.1 },
          0.7
        );

      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "+=200%",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;

          gsap.to(carRef.current, {
            x: 900 * p,
            scale: 1 + 0.2 * p,
            overwrite: true,
            ease: "power3.out",
            duration: 0.2,
          });

          gsap.to(".glass-card", {
            y: 80 - 160 * p,
            opacity: p < 0.15 ? p * 6 : p > 0.75 ? (1 - p) * 4 : 1,
            scale: 0.9 + 0.1 * Math.sin(p * Math.PI),
            stagger: { each: 0.08 },
            overwrite: true,
            duration: 0.2,
            ease: "power2.out",
          });
        },
      });

      ScrollTrigger.refresh();

      const marquee = document.querySelector(".feature-marquee");

      if (marquee) {
        const totalWidth = marquee.scrollWidth / 2;

        const tween = gsap.to(marquee, {
          x: -totalWidth,
          duration: 20,
          ease: "none",
          repeat: -1,
        });

        marquee.addEventListener("mouseenter", () => tween.pause());
        marquee.addEventListener("mouseleave", () => tween.resume());
      }

      const clickTl = gsap.timeline({ paused: true });

      clickTl
        .to(ctaRef.current, { scale: 0.9, duration: 0.15 })
        .to(ctaRef.current, { scale: 1, duration: 0.15 })
        .to(heroRef.current, { scale: 1.1, duration: 1, ease: "power3.inOut" }, 0)
        .to(".bg-glow", { scale: 3, opacity: 0.6, duration: 1 }, 0)
        .to(
          carRef.current,
          { x: 1200, scale: 1.4, duration: 1, ease: "power3.in" },
          0
        )
        .to(window, {
          scrollTo: ".features",
          duration: 1.2,
          ease: "power2.inOut",
        });

      ctaRef.current?.addEventListener("click", () => clickTl.play());
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="h-screen flex flex-col items-center justify-between pt-28 pb-24 bg-black text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-gray-900" />
      <div className="bg-glow absolute bottom-[-80px] w-[600px] h-[300px] bg-yellow-500/20 blur-[120px]" />
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:40px_40px]" />

      <h1 className="headline text-5xl md:text-7xl tracking-[0.6em] font-bold flex text-center relative z-10">
        {"WELCOMEITZFIZZ".split("").map((l, i) => (
          <span key={i}>{l}</span>
        ))}
      </h1>

      <h2 className="subtext mt-6 text-center text-lg md:text-2xl tracking-[0.3em] text-white/70 relative z-10">
        {"ENGINEERED FOR SPEED".split("").map((l, i) => (
          <span key={i}>{l}</span>
        ))}
        <br />
        {"DESIGNED FOR TOMORROW".split("").map((l, i) => (
          <span key={i}>{l}</span>
        ))}
      </h2>

      <button
        ref={ctaRef}
        className="relative mt-10 px-10 py-4 rounded-full border border-white/30 overflow-hidden group z-10"
      >
        <span className="relative z-10">Explore</span>
        <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition duration-700" />
      </button>

      <div className="relative z-20 flex gap-6 md:gap-10 mb-10">
        {[
          { value: "250%", label: "Growth" },
          { value: "180%", label: "Revenue" },
          { value: "320%", label: "Active Users" },
        ].map((item, i) => (
          <div
            key={i}
            className="glass glass-card p-6 rounded-xl text-center hover:scale-110 transition duration-300 will-change-transform"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              {item.value}
            </h2>
            <p className="text-white/70">{item.label}</p>
          </div>
        ))}
      </div>

      <img
        ref={carRef}
        src="/car.png"
        className="absolute bottom-[-80px] left-[-180px] w-[600px] md:w-[850px] z-0 pointer-events-none"
        alt="car"
      />
    </section>
  );
}