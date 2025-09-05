import Hero from "./sections/Hero";
import Materials from "./sections/Materials";
import Path from "./sections/Path";
import Ready from "./sections/Ready";
import Results from "./sections/Results";
import Secondary from "./sections/Secondary";
import Subjects from "./sections/Subjects";
import Test from "./sections/Test";
import Work from "./sections/Work";

function Home() {
  return <>
    <Hero/>
    <Secondary/>
    <Subjects/>
    <Test/>
    <Work/>
    <Results/>
    <Path/>
    <Ready/>
    <Materials/>
  </>;
}

export default Home;
