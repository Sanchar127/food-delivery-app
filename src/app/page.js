import Hero from "../components/layout/Hero";
import HomeMenu from "../components/layout/HomeMenu";
import SectionHeaders from "../components/layout/SectionHeaders";
import Header from "../components/layout/header";

export default function Home() {
  return (
    <>
      
      <Hero />
      <HomeMenu />

      <section className="text-center my-16">
        <SectionHeaders subHeader={"Our story"} mainHeader={"About us"} />
        <div className="text-gray-500 max-w-2xl mx-auto mt-4 flex flex-col gap-4">
          <p>
            {" "}
            This pepperoni pizza recipe produces a quick and all pizza itme are
            listed This pepperoni pizza recipe produces a quick and all pizza
            itme are listed
          </p>
          <p>
            {" "}
            This pepperoni pizza recipe produces a quick and all pizza itme are
            listed This pepperoni pizza recipe produces a quick and all pizza
            itme are listed
          </p>
          <p>
            {" "}
            This pepperoni pizza recipe produces a quick and all pizza itme are
            listed This pepperoni pizza recipe produces a quick and all pizza
            itme are listed
          </p>
        </div>
      </section> 
      <section className="text-center my-8">
        <SectionHeaders
          subHeader={"Don't hesitate"}
          mainHeader={"Contact Us"}
        />
        <div className="mt-8">
          <a
            className="text-4xl underline text-gray-500"
            href="tel:+977 9847355532"
          >
            +977 9847355532
          </a>
        </div>
      </section>
    
    </>
  );
}
