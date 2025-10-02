
    export const installTailwind = `npm install -D tailwindcss postcss autoprefixer\nnpx tailwindcss init -p`; // install the tailwind packages and shadcn/ui packages
    export const installShadcn = `npx shadcn@latest init` // isntalling shadcn/ui library

    export const setupTailwindConfig = 
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

    export const setTailwindCSS = 
    `@tailwind base;
@tailwind components;
@tailwind utilities;`
    

    export const exampleComponentCode = `import { Button } from "@/components/ui/button"
export function ButtonDemo() {
  return (
    <div className="flex gap-4">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
    </div>
  )
}`

    export const exampleComponentUse = ` "use client" ; // only if using Next.js
import { ButtonDemo } from "@/components/ButtonDemo"

export default function Page() {
  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Button Demo Example</h1>
      <ButtonDemo />
    </main>
  )
}`
