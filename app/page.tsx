import { Footer } from "@/components/Footer";
import { Town } from "@/components/town/Town";
import { signFont } from "@/components/town/font";
import urawaJson from "@/data/town/urawa.json";
import { parseTownConfig } from "@/lib/town/schema";

export default function Home() {
  const town = parseTownConfig(urawaJson);

  return (
    <main className="min-h-[calc(100vh-80px)] bg-bone dark:bg-abyss">
      <Town config={town} signFontClassName={signFont.className} />
      <Footer />
    </main>
  );
}
