import * as React from "react";
import Head from "next/head";
import styles from "/styles/Home.module.css";
import {
  Button,
  Checkbox,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import ModelViewer from "../components/ModelViewer/Model";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { marked } from "marked";
import html2canvas from "html2canvas";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jsPDF } from "jspdf";
import { decode } from "he";
import { BASE_URL } from "../env";
import QuestionnaireModal from "../components/questionaire";
import ControlPanel from "../components/ControlPanel"; // Add this import

export default function Home() {
  const router = useRouter();
  const [openAnalysis, setAnalysisOpen] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isNewSession, setNewSession] = React.useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleCloseDialog = () => setAnalysisOpen(false);
  const [selectOpen, setSelectOpen] = React.useState(false);

  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [reportStatus, setReportStatus] = React.useState("");
  const [reportInferredData, setReportInferredData] = React.useState({});
  const [reportData, setReportData] = React.useState({});
  const [polling, setPolling] = React.useState(false);
  const [html, setHtml] = React.useState("");
  const hiddenRef = React.useRef(null);
  const [selectedRisks, setSelectedRisks] = React.useState([]);
  const riskOptions = [
    { label: "Exo1", value: 1 },
    { label: "Exo2", value: 2 },
    { label: "Exo3", value: 3 },
  ];

  const [showQuestionnaire, setShowQuestionnaire] = React.useState(false);

  // Add control panel state
  const [controls, setControls] = React.useState({
    cognitiveLoad: true,
    exertion: true,
    stability: true,
    discomfort: true
  });

  const handleControlChange = (controlName, value) => {
    setControls(prev => ({
      ...prev,
      [controlName]: value
    }));
  };

  const handleStartAnalysis = () => {
    setShowQuestionnaire(true);
  };

  const handleQuestionnaireSubmit = (answers) => {
    setShowQuestionnaire(false);
    submitAnalysisResult(answers);
  };

  const handleChange = (event) => {
    setSelectedRisks(event.target.value);
  };

  // ✅ Convert markdown to HTML once reportData is loaded
  React.useEffect(() => {
    if (reportData?.results?.report_markdown) {
      setHtml(marked.parse(reportData.results.report_markdown));
    }
  }, [reportData]);

  React.useEffect(() => {
    axios
      .get(`${BASE_URL}/session-check`, {
        withCredentials: true,
      })
      .then(
        (response) => {
          console.log(response);
          setNewSession(response.data.message);
        },
        (error) => {
          console.log(error);
        }
      );
  }, [reportData]);

  const submitAnalysisResult = (payload) => {
    setLoading(true);

    axios
      .post(`${BASE_URL}/analyze-data`, payload, { withCredentials: true })
      .then((response) => {
        const data = response.data;
        setData(data);
        setIsLoaded(true)
        window.scrollTo(100, 100)

        const reportId = data?.data?.report?.reportId;
        if (reportId) {
          pollReportStatus(reportId);
        }
      })
      .catch((error) => {
        console.log(error.message);
        toast(error.message, {
          position: "top-right",
        });
      })
      .finally(() => {
        setLoading(false);
        handleCloseDialog();
      });
  };

  const pollReportStatus = (reportId, interval = 7000, maxTries = 10) => {
    let attempts = 0;
    setPolling(true);
    setReportStatus("Analyzing...");

    const intervalId = setInterval(() => {
      axios
        .get(`${BASE_URL}/report/${reportId}`)
        .then((res) => {
          const status = res.data?.status;
          console.log(`Polling attempt ${attempts + 1}:`, status);
          setReportStatus(`Analysing: ${status}`);

          if (status === "completed") {
            clearInterval(intervalId);
            setPolling(false);
            setReportStatus("");
            setReportData(res.data);
          }

          if (++attempts >= maxTries) {
            clearInterval(intervalId);
            setPolling(false);
            setReportStatus(
              "Could not complete status check after several attempts."
            );
          }
        })
        .catch((err) => {
          console.error("Polling error:", err.message);
          clearInterval(intervalId);
          setPolling(false);
          setReportStatus("An error occurred while analysing data.");
        });
    }, interval);
  };

  const discomfortData = data?.data?.digital_twin?.discomfort?.raw_scores;
  const exertionData = data?.data?.digital_twin?.exertion?.raw_scores;
  const cognitiveWorkload =
    data?.data?.digital_twin?.cognitive_load?.overall_score;
  const cognitiveLevel = (cognitiveWorkload / 120) * 100;

  const visitSubjectiveEvaluation = (no) => {
    router.push(`/subjective-evaluation/${no}`);
  };

  const downloadDivContentAsPDF = async () => {
    // ... (keep existing PDF download logic)
  };

  const dummyTwin = [
    {
      exoID: 0,
      discomfort: {
        raw_scores: {
          hand_wrist: 2,
          upper_arm: 3,
          shoulder: 1,
          chest: 2,
          lower_back: 3,
          thigh: 2,
          lower_leg_foot: 2,
          head: 1,
          neck: 2,
        },
      },
      exertion: { raw_scores: 2 },
      cognitive_load: { overall_score: 25 },
    },
  ];

  return (
    <>
      <div
        ref={hiddenRef}
        style={{
          position: "absolute",
          left: "-9999px",
          top: 0,
          width: "800px",
          padding: "20px",
          backgroundColor: "#fff",
          color: "#000",
          zIndex: -1,
        }}
      />
      <ToastContainer />
      <div className={styles.container}>
        <Head>
          <title>Exoskeleton Decision-Support Platform</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <div className={styles.container} style={{ alignItems: "flex-start" }}>
            <div className={styles.column}>
              {JSON.stringify(reportData) === "{}" && (
                <>
                  <select
                    onChange={(e) => visitSubjectiveEvaluation(e.target.value)}
                    defaultValue=""
                    className={styles.buttonStyle}
                  >
                    <option value="" disabled>
                      DATA INPUT
                    </option>
                    <option value="1">Exo 1</option>
                    <option value="2">Exo 2</option>
                    <option value="3">Exo 3</option>
                  </select>
                </>
              )}
              {JSON.stringify(reportData) !== "{}" && (
                <div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <select
                      onChange={(e) =>
                        visitSubjectiveEvaluation(e.target.value)
                      }
                      defaultValue=""
                      className={styles.buttonStyle}
                    >
                      <option value="" disabled>
                        DATA INPUT
                      </option>
                      <option value="1">Exo 1</option>
                      <option value="2">Exo 2</option>
                      <option value="3">Exo 3</option>
                    </select>
                    <Button onClick={downloadDivContentAsPDF}>
                      Download Report
                    </Button>
                  </div>
                </div>
              )}
              {polling || reportStatus ? (
                <div style={{ marginTop: "1rem", textAlign: "center" }}>
                  {polling && (
                    <CircularProgress
                      size={20}
                      style={{ marginRight: "0.5rem" }}
                    />
                  )}
                  <span>{reportStatus}</span>
                </div>
              ) : null}

              {html ? (
                <div
                  id="downloadableDiv"
                  style={{
                    maxHeight: "800px",
                    overflowY: "auto",
                    border: "1px solid #ddd",
                    padding: "1rem",
                    marginTop: "1rem",
                    borderRadius: "8px",
                    backgroundColor: "#f9f9f9",
                    textAlign: "left",
                    wordBreak: "break-word",
                  }}
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              ) : (
                <p style={{ fontStyle: "italic", marginTop: "1rem" }}>
                  Report will appear here after analysis...
                </p>
              )}
            </div>

            <div className={styles.column}>
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "flex-start",
                }}
              >
                <div style={{ flex: 1 }}>
                  <Select
                    multiple
                    open={selectOpen}
                    onOpen={() => setSelectOpen(true)}
                    onClose={() => setSelectOpen(false)}
                    value={selectedRisks}
                    onChange={handleChange}
                    displayEmpty
                    renderValue={(selected) =>
                      loading ? (
                        <CircularProgress size={20} color="secondary" />
                      ) : selected.length === 0 ? (
                        "Select Exo"
                      ) : (
                        selected
                          .map((value) => {
                            const match = riskOptions.find(
                              (risk) => risk.value === value
                            );
                            return match?.label || value;
                          })
                          .join(", ")
                      )
                    }
                    style={{ minWidth: 180 }}
                  >
                    {riskOptions.map((risk) => (
                      <MenuItem key={risk.value} value={risk.value}>
                        <Checkbox
                          checked={selectedRisks.includes(risk.value)}
                        />
                        <ListItemText primary={risk.label} />
                      </MenuItem>
                    ))}
                    <Button onClick={handleStartAnalysis}>
                      Analyse Risk{" "}
                      {loading && (
                        <CircularProgress
                          size={20}
                          color="secondary"
                          style={{ marginRight: "0.5rem" }}
                        />
                      )}
                    </Button>
                  </Select>
                  {!selectOpen && !!selectedRisks.length && (
                    <Button onClick={handleStartAnalysis}>
                      Analyse Risk{" "}
                      {loading && (
                        <CircularProgress
                          size={20}
                          color="secondary"
                          style={{ marginRight: "0.5rem" }}
                        />
                      )}
                    </Button>
                  )}
                </div>

                {/* Add Control Panel */}
                {data?.data?.digital_twin && <ControlPanel
                  controls={controls}
                  onControlChange={handleControlChange}
                  style={{ marginTop: "1rem" }}
                />}
              </div>

              {/* {data?.data?.digital_twin && ( */}
                <ModelArray
                  inferredAnalysis={reportData.inferredAnalysis}
                  twins={data?.data?.digital_twin}
                  controls={controls}
                  isLoaded={isLoaded}
                />
              {/* )} */}
            </div>
          </div>
        </main>

        <style jsx>{`
          main {
            padding: 0;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          footer {
            width: 100%;
            height: 100px;
            border-top: 1px solid #eaeaea;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          footer img {
            margin-left: 0.5rem;
          }
          footer a {
            display: flex;
            justify-content: center;
            align-items: center;
            text-decoration: none;
            color: inherit;
          }
          code {
            background: #fafafa;
            border-radius: 5px;
            padding: 0.75rem;
            font-size: 1.1rem;
            font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
              DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
          }
        `}</style>

        <style jsx global>{`
          html,
          h1 {
            text-align: center;
          }
          ,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
          }
          * {
            box-sizing: border-box;
          }
        `}</style>
      </div>

      <QuestionnaireModal
        open={showQuestionnaire}
        onClose={() => setShowQuestionnaire(false)}
        onSubmit={handleQuestionnaireSubmit}
      />
    </>
  );
}

function ModelArray({ twins = [{}, {}, {}], inferredAnalysis = [], controls, isLoaded }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        justifyContent: "center",
        alignItems: "flex-start",
        marginTop: "2rem",
      }}
    >
      {twins.slice(0, 3).map((twin, index) => {
        const discomfortData = twin.discomfort?.raw_scores;
        const exertionData = isLoaded? twin.exertion?.raw_scores : null;
        const cognitiveWorkload = twin.cognitive_load?.overall_score || 0;
        const cognitiveLevel = isLoaded ? (cognitiveWorkload / 120) * 100 : null;
        const stabilityData = isLoaded? twin.balance?.raw_scores : null;
        // const { metrics } = inferredAnalysis[index] || {};
        // const { fall_risk_pressure } = metrics || {};

        return (
          <div
            key={twin.exoID ?? index}
            style={{
              flex: "1 1 1",
              minWidth: "250px",
              maxWidth: "250px",
              border: "1px solid #e0e0e0",
              borderRadius: "10px",
              background: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              position: "relative",
            }}
          >
            <ModelViewer
              data={{ 
                ...(controls.discomfort ? discomfortData : {}), 
                exertion: controls.exertion ? exertionData : null 
              }}
              isLoaded={isLoaded}
              cognitive={controls.cognitiveLoad}
              cognitiveLevel={controls.cognitiveLoad ? cognitiveLevel : null}
              stability={controls.stability ? stabilityData : null}
            />
          </div>
        );
      })}
    </div>
  );
}