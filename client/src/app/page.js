
export default function HomePage() {
  return (
    <div>
      <section className="flex flex-col items-center justify-center h-[80vh] text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Travelfree 🌍</h1>
        <p className="text-lg mb-6">Find free accommodation and connect with travelers worldwide!</p>
        <a href="/signup" className="bg-blue-600 text-white px-6 py-3 rounded-lg">
          Get Started
        </a>
      </section>
    </div>
  );
}
