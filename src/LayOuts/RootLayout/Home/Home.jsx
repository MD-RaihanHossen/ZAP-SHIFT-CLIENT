import Banner from "./Banner";
import CustomerReview from "./CustomerReview";
import CustomerSatisfaction from "./CustomerSatisfaction ";
import GiveServices from "./GiveServices";
import HowWork from "./HowWork";
import OurServices from "./OurServices";
import SalesTeams from "./SalesTeams";

const Home = () => {
    return (
        <div className="">
            <div>
                <Banner></Banner>
            </div>
            <div data-aos="flip-left"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000">
                <HowWork></HowWork>
            </div>
            <div data-aos="zoom-out">
                <OurServices></OurServices>
            </div>
            <div data-aos="zoom-out-up">
                <SalesTeams></SalesTeams>
            </div>
            <div data-aos="zoom-out-down">
                <GiveServices></GiveServices>
            </div>
            <div data-aos="zoom-out-right">
                <CustomerSatisfaction></CustomerSatisfaction>
            </div>
            <div>
                <CustomerReview></CustomerReview>
            </div>
            
        </div>
    );
};

export default Home;