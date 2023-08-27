import { ModeToggle } from "@/components/mode-toggle.tsx";

export default function Header() {
  return (
    <header>
      <div className="flex justify-between items-center border-b border-b-gray-400 pb-3">
        <h1>Today's Weather</h1>
        <ModeToggle />
      </div>
    </header>
  );
}
