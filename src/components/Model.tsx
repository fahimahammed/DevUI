// components/ui/Modal.tsx
export function Modal({ title, children, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-gray-900 rounded-2xl p-6 w-[90%] max-w-md border border-gray-700 
                      shadow-[0_0_20px_rgba(139,92,246,0.5)]">
        <h2 className="text-xl font-bold text-[var(--neon-accent)] mb-4">{title}</h2>
        <div>{children}</div>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-[var(--primary-gradient)] text-white py-2 rounded-xl 
                     hover:shadow-[0_0_20px_var(--neon-accent)] transition-all"
        >
          Close
        </button>
      </div>
    </div>
  );
}