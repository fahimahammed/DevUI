import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItemProps {
  title: string;
  content: string;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem = ({ title, content, isOpen, onClick }: AccordionItemProps) => {
  return (
    <div className="border-b bg-black dark:bg-white border-gray-100 last:border-none">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between py-3 px-4 text-left text-sm font-medium  text-white dark:text-gray-700  transition-colors rounded-xl"
      >
        <span>{title}</span>
        <ChevronDown
          className={`h-4 w-4 text-gray-400  transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-3 dark:text-gray-600 text-gray-200 text-sm leading-relaxed">
          {content}
        </div>
      </div>
    </div>
  );
};

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = [
    {
      title: "✨ What is DevUI?",
      content:
        "DevUI is a modern, open-source component library to build beautiful apps faster.",
    },
    {
      title: "🤝 Can I contribute?",
      content:
        "Yes! Fork our GitHub repo, submit your PR, and join our awesome community.",
    },
    {
      title: "💜 Is it free?",
      content:
        "Absolutely! DevUI is free under the MIT license. Use it anywhere without limits.",
    },
  ];

  return (
    <div className="w-full max-w-lg mx-auto p-6">
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        {items.map((item, i) => (
          <AccordionItem
            key={i}
            {...item}
            isOpen={openIndex === i}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </div>
  );
};

export default Accordion;