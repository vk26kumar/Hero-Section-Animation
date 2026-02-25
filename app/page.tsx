import Hero from "./components/Hero";

export default function Home() {
  const items = [
    "Performance",
    "Precision",
    "Innovation",
  ];

  const loopItems = [...items, ...items]; 

  return (
    <main className="bg-black text-white overflow-hidden">
      <Hero />

      <section className="features relative min-h-screen flex flex-col justify-center items-center">

        <div className="feature-bg absolute w-[600px] h-[600px] bg-blue-500/20 blur-[140px] rounded-full top-[-200px] left-[-200px]" />
        <div className="feature-bg2 absolute w-[500px] h-[500px] bg-purple-500/20 blur-[140px] rounded-full bottom-[-200px] right-[-150px]" />

        <h2 className="feature-title text-4xl md:text-6xl font-bold mb-20 text-center">
          BUILT FOR THE FUTURE
        </h2>

        <div className="w-full overflow-hidden">
          <div className="feature-marquee flex gap-10 w-max px-6">

            {loopItems.map((item, i) => (
              <div
                key={i}
                className="feature-card glass min-w-[300px] p-10 rounded-2xl text-center"
              >
                <h3 className="text-2xl font-semibold mb-4">{item}</h3>
                <p className="text-white/60">
                  Experience next-level engineering with cutting-edge design.
                </p>
              </div>
            ))}

          </div>
        </div>

      </section>
    </main>
  );
}