import "./intro-section.scss";
import introVideo from "assets/videos/bg-video.mp4";
import introVideoMobile from "assets/videos/bg-mobile.mp4";
import bgImage from "assets/images/bg-temp.jpg";
import { NavLink } from "react-router-dom";
import { ArrowLeftCircleFill } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { MainStateType } from "redux/reducers/mainSlice";
import { useTranslation } from "react-i18next";

function IntroSection() {
  const main = useSelector((state: { main: MainStateType }) => state.main);
  const { t } = useTranslation();
  const mainDescribtion =
    main && typeof main === "object" && main.main_description
      ? main.main_description
      : "";
  return (
    <div className="intro-section">
      <video className="intro-background screen" loop autoPlay muted>
        <source src={introVideo} type="video/mp4" />
      </video>
      <video className="intro-background mobile" loop autoPlay muted>
        <source src={introVideoMobile} type="video/mp4" />
      </video>
      {/* <img src={bgImage} className="intro-background" alt="" /> */}
      <div className="page-content">
        <a href="#" className="request-service">
          {t("buttons.orderService")}
        </a>
        <div className="intro-small-card">
          <p>{mainDescribtion && mainDescribtion}</p>
          <NavLink to="about" className="icon-text-hover">
            {t("buttons.more")}
            <ArrowLeftCircleFill />
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default IntroSection;
