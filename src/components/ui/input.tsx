
// components/ui/Input.tsx
export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full p-3 rounded-xl bg-gray-800 text-white border border-gray-700
                 focus:border-[var(--neon-accent)] focus:ring-2 focus:ring-[var(--neon-accent)]
                 placeholder-gray-400 transition-all duration-300"
    />
  );
}