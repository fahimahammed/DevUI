
"use client";

import React from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { ComponentSnippetCard } from "@/components/ComponentSnippetCard";
import { componentsData } from "@/data/components";

const DocsPage = () => {
  return (
    <div className="container mx-auto py-8">
      {/* Installation Section */}
      <section id="installation">
        <h1 className="text-4xl font-bold border-b pb-2">Installation</h1>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
          Follow these steps to get the DevUI project running on your local machine for development.
        </p>

        <h2 className="text-2xl font-semibold mt-8">1. Fork the Repository</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          First, navigate to the main repository page on GitHub and click the &apos;Fork&apos; button in the top-right corner. This will create a copy of the project under your own GitHub account.
        </p>
        <CodeBlock code="git clone https://github.com/[your-username]/DevUI.git" language="bash" />

        <h2 className="text-2xl font-semibold mt-8">2. Clone Your Fork</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Now, clone the forked repository to your local machine. Replace `[your-username]` with your actual GitHub username.
        </p>
        <CodeBlock code="git clone https://github.com/[your-username]/DevUI.git" language="bash" />

        <h2 className="text-2xl font-semibold mt-8">3. Navigate to the Directory</h2>
        <CodeBlock code="cd DevUI" language="bash" />

        <h2 className="text-2xl font-semibold mt-8">4. Install Dependencies</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Install all the necessary packages using your preferred package manager.
        </p>
        <CodeBlock code="npm install" language="bash" />
      </section>

      {/* Project Setup Section */}
      <section id="project-setup" className="mt-12">
        <h1 className="text-4xl font-bold border-b pb-2">Project Setup</h1>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
          After installation, you can start the development server.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Running the Development Server</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          To start the local development server, run the following command:
        </p>
        <CodeBlock code="npm run dev" language="bash" />
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          This will start the application, usually on <code className="text-primary">http://localhost:3000</code>. You can now view the project in your browser.
        </p>
      </section>

      {/* Component Gallery Section */}
      <section id="AI-snippets" className="mt-12">
        <h1 className="text-4xl font-bold border-b pb-2">Components</h1>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
          Explore the collection of reusable UI components built with React and Tailwind CSS, featuring copyable code snippets and AI-generated variations.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
          {componentsData.map((component) => (
            <ComponentSnippetCard
              key={component.id}
              title={component.title}
              description={component.description}
              preview={component.preview}
              code={component.code}
              category={component.category}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default DocsPage;