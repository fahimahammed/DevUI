

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-start py-16 px-2 sm:px-6">
      <section className="w-full max-w-3xl text-center mb-12 animate-fade-in flex flex-col items-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight bg-gradient-to-r from-purple-400 via-blue-400 to-purple-600 bg-clip-text text-transparent">
          About DevUI
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 font-medium max-w-2xl mx-auto">
          DevUI is a modern, open-source component library showcase built with shadcn/ui. Explore, copy, and reuse beautifully designed components in your React or Next.js projects. GitHub-ready and perfect for Hacktoberfest 2025! 🚀
        </p>
      </section>
      {/* Team/Project Purpose Section */}
      <Card className="w-full max-w-3xl bg-[#18181b] border border-[#232323] shadow-lg mb-10 animate-fade-in-up">
        <CardContent className="p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-6 text-purple-300 tracking-tight">Meet the Team & Purpose</h2>
          <p className="text-gray-300 mb-4 text-lg">
            <span className="font-semibold text-blue-400">DevUI</span> is built by passionate open-source contributors for the community. Our goal is to make it easy for developers to discover, preview, and use high-quality UI components in their projects.
          </p>
          <p className="text-gray-400 mb-4 text-lg">
            We believe in collaboration, learning, and sharing. Whether you’re a beginner or a pro, you’re welcome to contribute, suggest ideas, or just explore and enjoy the library!
          </p>
        </CardContent>
      </Card>

      {/* Features Section */}
      <Card className="w-full max-w-3xl bg-[#18181b] border border-[#232323] shadow-lg mb-10 animate-fade-in-up">
        <CardContent className="p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-6 text-blue-400 tracking-tight">🌟 Features</h2>
          <ul className="text-gray-300 mb-6 list-disc list-inside space-y-2 text-left text-lg">
            <li>Shadcn/UI components with live previews</li>
            <li>Syntax-highlighted code blocks for easy readability</li>
            <li>One-click copy functionality to quickly grab code</li>
            <li>Beautiful, minimal design with subtle accent colors</li>
            <li>Fully responsive design with smooth animations and hover effects</li>
            <li>Search &amp; filter components by category</li>
            <li>GitHub-ready for open-source contributions</li>
          </ul>
          <Separator className="my-8" />

          <h2 className="text-3xl font-bold mb-6 text-blue-400 tracking-tight">🎨 Design & Components</h2>
          <p className="text-gray-400 mb-6 text-lg">
            Enjoy a clean, modern UI with subtle gradients, clean sans-serif fonts, and smooth transitions. Browse a growing collection of components—Buttons, Inputs, Cards, Avatars, Badges, and more—each with live previews and copyable code.
          </p>
          <Separator className="my-8" />

          <h2 className="text-3xl font-bold mb-6 text-blue-400 tracking-tight">⚡ Open Source & Hacktoberfest</h2>
          <p className="text-gray-300 mb-6 text-lg">
            DevUI is GitHub-ready and welcomes contributions from everyone! Whether you want to add new components, improve designs, fix bugs, or suggest ideas, your PRs help us grow. Join us for Hacktoberfest 2025 and make DevUI Components the ultimate open-source showcase!
          </p>
          <Separator className="my-8" />

          <p className="text-gray-500 italic text-base">
            (This is demo placeholder text. Final content coming soon!)
          </p>
        </CardContent>
      </Card>

      {/* Back to Home Button */}
      <Link href="/" className="inline-block mt-4 px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold shadow hover:scale-105 hover:shadow-lg transition-all duration-200 text-lg">
        ← Back to Home
      </Link>
    </main>
  );
}