"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu ,BookOpen, ArrowLeft  } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";
import {installTailwind , installShadcn , setTailwindCSS , setupTailwindConfig , exampleComponentCode , exampleComponentUse} from "./constants"
import Footer from "@/components/footer";

export default function DocsPage() {
    const [sideBarOpen , setSideBarOpen] = useState(false);

    const sections = ['Installation' , 'Setup' , 'Usage']
    const toggleSideBar = () =>{
        setSideBarOpen(curr => !curr)
    }


  return (
    <div className="min-h-screen bg-transparent text-foreground">
        
        {/* Sidebar */}
        <div
        className={`fixed top-0 left-0 h-[100vh] min-w-[230px] z-[100] transform transition-transform duration-300 ease-in-out ${
          sideBarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ background: "#f5f5f5ff" }}
      >
        <button
          className="p-2 absolute right-2 top-2"
          onClick={toggleSideBar}
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <nav className="flex flex-col gap-1 p-3 mt-10">
          {sections.map((section, index) => (
            <a
              key={index}
              href={`#${section}`}
              className="px-4 py-3 rounded-lg text-gray-700 hover:bg-white hover:text-gray-900 transition-all duration-200 font-bold text-lg"
            >
              {section}
            </a>
          ))}
        </nav>
      </div>

      {/*Hero Section */}
      <header className="flex flex-col items-center justify-center text-center pt-32 pb-16 px-4">
            <button className="p-2 absolute left-2 top-2 " onClick={toggleSideBar}>
                <Menu className="w-6 h-6 " />
            </button>
            <div className="relative group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-transparent bg-primary/5 backdrop-blur-sm overflow-hidden">
                <BookOpen className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">DocsHub</span>
                
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                    background: 'linear-gradient(to right, #ec4899, #a855f7, #3b82f6)',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    padding: '2px'
                    }}/>

            </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          DevUI Documentation
        </h1>
        <p className="text-muted-foreground max-w-2xl mb-6">
          Learn how to configure, and use our developer-friendly React/Next
          components built with shadcn/ui and visually transform your websites.
        </p>
        <div className="flex gap-4">
            <Link href="https://github.com/fahimahammed/DevUI" target="_blank">
                <Button variant="default">Star on GitHub</Button>
            </Link>
            <Link href="/">
                <Button size="lg" variant="ghost" className="text-primary font-semibold border border-primary/10 hover:bg-primary/10">
                  Back to Home
                </Button>
            </Link>
        </div>
      </header>


      <div className="flex max-w-6xl mx-auto px-4 md:px-16 gap-8 pb-32">
        <main className="flex-1 space-y-16">
            {/* Installation Part */}
            <section id="Installation">
            <h2 className="text-2xl font-semibold mb-3">Installation</h2>
            <p className="text-muted-foreground mb-4">
                Get started by installing the TailwindCSS and ShadCN packages using npm or yarn.
            </p>
            <div className="relative bg-muted rounded-md p-4 mb-4 font-mono text-sm overflow-x-auto">
                <pre>{installTailwind}</pre>
            </div>

            <div className="relative bg-muted rounded-md p-4 font-mono text-sm overflow-x-auto">
                <pre>{installShadcn}</pre>
            </div>

            <p className="text-muted-foreground mb-4">
                Next in ShadCn/UI, you will be asked to answer some prompts. Proceed with them based on your choices!
            </p>
            </section>

            {/* Setup */}
            <section id="Setup">
            <h2 className="text-2xl font-semibold mb-3">Project Setup</h2>
            <p className="text-muted-foreground">
                Next, configure your project with Tailwind to ensure everything works smoothly.
            </p>

            <p className="text-muted-foreground mt-4">
                Make a file tailwind.config.js if not already there and add the below code
            </p>
            <CodeBlock code={setupTailwindConfig} />

            <p className="text-muted-foreground mt-4">
                Make a file tailwind.config.js if not already there and add the below code
            </p>
            <CodeBlock code={setTailwindCSS} />
            </section>

            {/* Usage */}
            <section id="Usage">
            <h2 className="text-2xl font-semibold mb-3">Usage Example</h2>
            <p className="text-muted-foreground">
                Here’s how to use the component inside your project:
            </p>

            <p className="text-muted-foreground mt-4">
                Copy this segment of code and add to a new file inside the components folder in your root directory
            </p>
            <CodeBlock code={exampleComponentCode} />

            <p className="text-muted-foreground mt-4">
                Now import this component inside your desired file and use it! Do make sure the directory path and file name match
            </p>
            <CodeBlock code={exampleComponentUse} />
            </section>
        </main>
        </div>
        
        <Footer/>
    </div>
  );
}
