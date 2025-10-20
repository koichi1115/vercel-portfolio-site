import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 transition-colors">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Portfolio Site
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Welcome to my portfolio
        </p>
      </div>
    </div>
  );
}
