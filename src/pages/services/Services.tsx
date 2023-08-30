import PageBannerLayout, {
  PageBannerDataType,
} from "pages/page-banner-layout/PageBannerLayout";
import "./services.scss";
import { useTranslation } from "react-i18next";
import ServiceCard from "./components/service-card/ServiceCard";
import { useEffect } from "react";
import { requestSetServices } from "redux/middlewares/servicesMiddleware";
import { useDispatch, useSelector } from "react-redux";
import { ServicesStateType } from "redux/reducers/servicesSlice";
// import ServicePlaceHolder from "./components/placeholder/ServicesPlaceholder";
// import HexagonShape from "./components/hexagon-shape/HexagonShape";
import HexagonsContainer from "./components/hexagons-container/HexagonsContainer";
import CircleContainer from "./components/circle-container/CircleContainer";
import ServicesCardsContainer from "./components/cards-container/CardsContainer";
import HalfCircleContainer from "./components/half-circle/HalfCircleContainer";
import { ArrowLeftCircleFill, Whatsapp } from "react-bootstrap-icons";
import { SettingsStateType } from "redux/reducers/settingsSlice";
import { getValueByKey } from "types/SettingsType";

function Services() {
  const { t } = useTranslation();
  const settings = useSelector(
    (state: { settings: SettingsStateType }) => state.settings
  );
  const getvalue = getValueByKey(settings);
  const whatsapp = getvalue("whatsapp") as undefined | [string];
  const data: PageBannerDataType = {
    bgImage: { gradient: true },
    title: t("links.services"),
  };
  const { services } = useSelector(
    (state: { services: ServicesStateType }) => state.services
  );
  console.log("services state: ", services);
  const dispatch = useDispatch();
  useEffect(() => {
    requestSetServices(dispatch).then(console.log).catch(console.log);
  }, []);
  return (
    <PageBannerLayout data={data}>
      <div className="services-page tight-section">
        {/* {services === "loading" && <ServicePlaceHolder />}
        {typeof services === "object" &&
          services.map((service) => <ServiceCard data={service} />)} */}
        {typeof services === "object" &&
          services.map((service, index) => {
            const className = "bg-main-transparent";
            return (
              <>
                {service.design === "hexagon" && (
                  <HexagonsContainer service={service} addClass={className} />
                )}
                {service.design === "circle" && (
                  <CircleContainer service={service} addClass={className} />
                )}
                {service.design === "circle" && (
                  <HalfCircleContainer service={service} addClass={className} />
                )}
                {service.design === "circle" && (
                  <ServicesCardsContainer
                    service={service}
                    addClass={className}
                  />
                )}
              </>
            );
          })}
        {services === "loading" && <h2>Loading</h2>}
        {services === "error" && <h2>Error Fetching Data</h2>}

        {whatsapp && whatsapp[0] && (
          <a
            className="link-with-arrow custom"
            target="_blank"
            href={"https://wa.me/" + whatsapp[0]}
          >
            تواصل عبر الواتس اب
            <Whatsapp />
          </a>
        )}
      </div>
    </PageBannerLayout>
  );
}

export default Services;
