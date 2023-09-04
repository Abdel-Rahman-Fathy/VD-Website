import TrippleSlider from "components/tripple-slider/TrippleSlider";
import "./project.scss";
import PageBannerLayout, {
  PageBannerDataType,
} from "pages/page-banner-layout/PageBannerLayout";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProjectType } from "redux/reducers/projectsSlice";
import axios from "axios";
import api from "methods/api";
import ApiResponse from "types/ApiResponse";
import { useTranslation } from "react-i18next";

function Project() {
  const { projectId } = useParams();
  const [project, setProject] = useState<ProjectType | "error" | "loading">(
    "loading"
  );
  const { t } = useTranslation();

  const data: PageBannerDataType =
    typeof project === "object"
      ? {
          bgImage: project?.["main-image"] || "",
          title: project?.title || `المشروع ${projectId}`,
          subtitle: {
            type: "navigate",
            links: [
              { title: "الرئيسية", path: "/" },
              { title: "المشاريع", path: "/projects" },
              {
                title: project?.title || `المشروع ${projectId}`,
                path: `/projects/${projectId}`,
                active: true,
              },
            ],
          },
        }
      : {
          bgImage: "",
          title: project === "loading" ? "جار تحميل المشروع" : "فشل التحميل",
          subtitle: {
            type: "navigate",
            links: [
              { title: "الرئيسية", path: "/" },
              { title: "المشاريع", path: "/projects" },
            ],
          },
        };
  useEffect(() => {
    axios
      .get<ApiResponse<ProjectType>>(
        api(`client/company-projects/${projectId}`)
      )
      .then((result) => {
        setProject(result.data.data);
        console.log("project : ", result.data);
      })
      .catch((err) => {});
  }, []);

  return (
    <PageBannerLayout data={data}>
      {typeof project === "object" && (
        <div className="project-page tight-section">
          <section className="section">
            <h3 className="section-title">{t("project.name")}</h3>
            <div className="section-content">
              <p>{project?.title}</p>
            </div>
          </section>
          {project?.attachments && (
            <section className="">
              <TrippleSlider images={project.attachments} />
            </section>
          )}
          <section className="section">
            <h3 className="section-title">{t("project.describtion")}</h3>
            <div className="section-content">
              <p>{project?.description}</p>
            </div>
          </section>
          <section className="section">
            <h3 className="section-title">{t("project.zone")}</h3>
            <div className="section-content">
              <div className="work-areas-container">
                {project?.workZones.map((zone) => (
                  <div key={`${Math.random()}`} className="work-area-card">
                    <div className="title">{zone.name}</div>
                    <div className="content">{zone.zone}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}
    </PageBannerLayout>
  );
}

export default Project;
