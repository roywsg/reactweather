import "@/app/globals.css";
import Header from "@/components/layout/header.tsx";
import Layout from "@/components/layout/layout.tsx";
import Loading from "@/components/myui/loading.tsx";
import SearchFormSection from "@/components/sections/searchFormSection.tsx";
import SearchHistorySection from "@/components/sections/searchHistorySection.tsx";
import WeatherDataSection from "@/components/sections/weatherDataSection.tsx";
import Footer from "./components/layout/footer";

function App() {
  return (
    <>
      <Layout>
        <Header />
        <SearchFormSection />
        <WeatherDataSection />
        <SearchHistorySection />
        <Footer />
      </Layout>
      <Loading />
    </>
  );
}

export default App;
