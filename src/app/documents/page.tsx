"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu ,BookOpen  } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";
// import { Input } from "@/components/ui/input";

export default function DocsPage() {
    const [copied, setCopied] = useState(false);
    const [sideBarOpen , setSideBarOpen] = useState(true);

    const sections = ['Installation' , 'Setup' , 'Usage']

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const installTailwind = `npm install -D tailwindcss postcss autoprefixer\nnpx tailwindcss init -p`; // install the tailwind packages and shadcn/ui packages
    const installShadcn = `npx shadcn@latest init` // isntalling shadcn/ui library

    const setupTailwindConfig = 
    `export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
    }`

    const setTailwindCSS = 
    `@tailwind base;
@tailwind components;
@tailwind utilities;`
    
    
    const usageCode = `import { MyComponent } from "my-package";

    export default function Page() {
    return <MyComponent />;
    }`;

  return (
    <div className="min-h-screen bg-transparent text-foreground">
        
        {/* Sidebar */}
        {   
            sideBarOpen ? 
            <>
                {/* when side bar is open */}
                <div className="flex flex-col fixed min-w-[230px] h-[100vh]" 
                style={{background : "#f5f5f5ff"}}>
                    <nav className="flex flex-col gap-1 p-3 mt-4">
                        {
                            sections.map((section , index) => {
                                return(
                                    <a key={index}
                                    href={`#${section}`} 
                                    className="px-4 py-3 rounded-lg text-gray-700 hover:bg-white hover:text-gray-900 transition-all duration-200 font-bold text-large"
                                    >
                                    {section}
                                    </a>
                                )
                            })
                        }
                    </nav>
                </div>
            </> : 
            <>
            {/* when side bar is closed - feature only for the  */}
            </>
        }

      {/*Hero Section */}
      <header className="flex flex-col items-center justify-center text-center pt-32 pb-16 px-4">
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
        </div>
      </header>


      {/* Main Layout */}
      <div className="flex max-w-6xl mx-64 px-4 gap-8">


        {/* Content */}
        <main className="flex-1 space-y-16">
          {/* Installation */}
          <section id="Installation">
            <h2 className="text-2xl font-semibold mb-3">Installation</h2>
            <p className="text-muted-foreground mb-4">
              Get started by installing the TailwindCSS and ShadCN packages using npm or yarn.
            </p>
            <div className="relative bg-muted rounded-md p-4 mb-4 font-mono text-sm">
              <pre>{installTailwind}</pre>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2"
                onClick={() => handleCopy(installTailwind)}
              >
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>

            <div className="relative bg-muted rounded-md p-4 font-mono text-sm">
              <pre>{installShadcn}</pre>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2"
                onClick={() => handleCopy(installShadcn)}
              >
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>

            <p className="text-muted-foreground mb-4">
             Next in ShadCn/UI, you will be asked to answer some prompts. Proceed with them based on your choices!
            </p>
          </section>



                        
          {/* Setup */}
          <section id="Setup">
            <h2 className="text-2xl font-semibold mb-3">Project Setup</h2>
            <p className="text-muted-foreground">
              Next, configure your project with Tailwind to ensure
              everything works smoothly.
            </p>

            <p className="text-muted-foreground mt-4">
              Make a file tailwind.config.js if not already there and add the below code
            </p>
            <CodeBlock code={setupTailwindConfig}/>


            <p className="text-muted-foreground mt-4">
              Make a file tailwind.config.js if not already there and add the below code
            </p>
            <CodeBlock code={setTailwindCSS}/>

          </section>

          {/* Usage */}
          <section id="Usage">
            <h2 className="text-2xl font-semibold mb-3">Usage Example</h2>
            <p className="text-muted-foreground mb-4">
              Here’s how to use the component inside your project:
            </p>
            <div className="relative bg-muted rounded-md p-4 font-mono text-sm overflow-x-auto">
              <pre>{usageCode}</pre>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2"
                onClick={() => handleCopy(usageCode)}
              >
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
