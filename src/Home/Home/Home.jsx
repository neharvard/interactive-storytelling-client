import Footer from "../../pages/Footer/Footer";
import About from "../About/About";
import Banner from "../Banner/Banner";
import MeetTeam from "../MeetTeam/MeetTeam";

const Home = () => {
    return (
        <div>
              {/* <h1 className="text-5xl font-bold">Welcome to Interactive Storytelling!</h1> */}
              <Banner></Banner>
              <MeetTeam></MeetTeam>
              <About></About>
              <Footer></Footer>
        </div>
    );
  }
  
  export default Home;
  