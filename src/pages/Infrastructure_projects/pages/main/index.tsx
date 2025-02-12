import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import BackgroundVideo from "../../components/backgroundVideo/BackgroundVideo";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import { useEffect, useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import "./index.scss";
import { useTranslation } from "react-i18next";
import axios from "axios";
import api from "methods/api";
import Loader from "pages/Infrastructure_projects/components/Loading/Loading";

type projectCard = {
  id: number;
  code: string;
  branchName: string;
  engineerName: string;
  name: string;
  period: string;
  imgUrl: string;
  cardId?: number;
};
const Infrastructure_projects_Page = () => {
  // declare state
  const [activeSubTitle, setActiveSubTitle] = useState<string>("all");
  const [searchKey, setSearchKey] = useState<string>("");
  const [showSearch, setShowSearch] = useState(false);
  const { t } = useTranslation();
  const searchLabelVal: JSX.Element = (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SearchOutlinedIcon />
      <span>{t("InfrastructureProjects.buttons.search")}</span>
    </Box>
  );
  const [searchLabel, setSearchLabel] = useState<JSX.Element | string>(
    searchLabelVal
  );
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<projectCard[]>([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(api(`employee/contract?type=1`), {
        params: {
          limit: 100,
        },
      })
      .then((data) => {
        let arr = [],
          n = data.data?.data?.length;

        for (let i = 0; i < n; i++) {
          const element = data.data.data[i];
          arr.push({
            id: element?.id,
            code: element?.code,
            branchName: element?.branch?.name,
            engineerName: element?.employee?.name,
            name: element?.details,
            period: element?.period,
            imgUrl: element?.contract_details?.media?.filter(
              (ele: { collection_name: string }) =>
                ele?.collection_name == "main_image"
            )[0]?.original_url,
            cardId: element?.client?.card_id,
          });
        }
        setProjects(arr);
      })
      .catch((err) => {
        console.log("Error in fetch projects Data:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box id="InfrestructrueMainPage" sx={{ margin: 0, padding: 0 }}>
      <BackgroundVideo
        activeSubTitle={activeSubTitle}
        setActiveSubTitle={setActiveSubTitle}
      />
      {/* header and search field */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          style={{
            display: "flex",
            width: "90%",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "3rem 0",
          }}
        >
          {!showSearch && (
            <Button
              sx={{
                width: "50px",
                height: "50px",
                backgroundColor: "#f3f5f7",
                color: "#004693",
                border: "1px solid lightgray",
                transition: "all 0.4s ease",
                ":hover": {
                  color: "#004693",
                  background: "#fff",
                },
              }}
              onClick={() => setShowSearch(true)}
            >
              <SearchOutlinedIcon sx={{ fontSize: "30px" }} />
            </Button>
          )}
          {showSearch && (
            <TextField
              label={searchLabel}
              onFocus={() => {
                setSearchLabel("");
              }}
              onBlur={() => {
                if (searchKey.trim().length === 0) {
                  setSearchLabel(searchLabelVal);
                  setShowSearch(false);
                } else setSearchKey("");
              }}
              onChange={(e) => setSearchKey(e.target.value)}
              sx={{
                borderRadius: "35px",
                height: " 50px",
                color: "#004693",
                border: "1px solid #004693",
                outline: "none",
              }}
            />
          )}
        </Box>
      </Box>
      {/* projects' cards */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "5rem",
        }}
      >
        <Grid
          container
          style={{
            boxSizing: "border-box",
            display: "flex",
            width: "90%",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {projects.length == 0 && <Loader />}
          {projects.length > 0 &&
            projects.map((p, idx) => (
              <ProjectCard
                key={`p_${idx}_${p.id}_${p.code}`}
                id={p.id}
                name={p.name}
                period={p.period}
                branchName={p.branchName}
                imgUrl={p.imgUrl}
                engineerName={p.engineerName}
                cardId={p.cardId}
              />
            ))}
        </Grid>
      </Box>
      <Box className="pyramid-container">
        <Box id="pyramid-level-3" className="pyramid-level"></Box>
      </Box>
    </Box>
  );
};

export default Infrastructure_projects_Page;
