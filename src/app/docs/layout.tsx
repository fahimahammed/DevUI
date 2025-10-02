import React from 'react';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <aside className="w-64 border-r p-6 hidden md:block">
        <h2 className="font-bold text-lg mb-4">Documentation</h2>
        <nav>
          <ul className="space-y-2">
            <li><a href="#installation" className="hover:text-blue-500">Installation</a></li>
            <li><a href="#project-setup" className="hover:text-blue-500">Project Setup</a></li>
            <li><a href="#usage-examples" className="hover:text-blue-500">Usage Examples</a></li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        {children} 
      </main>
    </div>
  );
}