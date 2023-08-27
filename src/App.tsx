import Header from "@/components/layout/header.tsx";
import { ModeToggle } from "@/components/mode-toggle.tsx";
import Layout from "@/components/layout/layout.tsx";
import "@/app/globals.css";

function App() {
  return (
    <Layout>
      <Header />
      <ModeToggle />
    </Layout>
  );
}

export default App;
