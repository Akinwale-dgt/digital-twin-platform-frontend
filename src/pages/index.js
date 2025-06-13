import * as React from "react";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
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

export default function Home() {
  const router = useRouter();
  const [openAnalysis, setAnalysisOpen] = React.useState(false);
  const [isNewSession, setNewSession] = React.useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleCloseDialog = () => setAnalysisOpen(false);

  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [reportStatus, setReportStatus] = React.useState("");
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

  const getAnalysisResult = () => {
    setLoading(true);

    axios
      .get(`${BASE_URL}/analyze-data`)
      .then((response) => {
        const data = response.data;
        setData(data);

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
    const original = document.getElementById("downloadableDiv");
    if (!original) {
      console.error("Element with ID 'downloadableDiv' not found");
      return;
    }

    // Step 1: Create a properly formatted container for PDF
    const pdfContainer = document.createElement("div");
    pdfContainer.style.position = "fixed";
    pdfContainer.style.top = "0";
    pdfContainer.style.left = "0";
    pdfContainer.style.width = "800px";
    pdfContainer.style.height = "auto";
    pdfContainer.style.zIndex = "-1";
    pdfContainer.style.opacity = "0";
    pdfContainer.style.pointerEvents = "none";
    pdfContainer.style.backgroundColor = "white";
    pdfContainer.style.padding = "30px";
    pdfContainer.style.fontFamily =
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    pdfContainer.style.fontSize = "14px";
    pdfContainer.style.lineHeight = "1.6";
    pdfContainer.style.color = "#000";

    // Step 2: Add header information
    const currentDate = new Date().toLocaleDateString("en-GB");
    const headerHtml = `
    <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 15px;">
      <h1 style="margin: 0; font-size: 24px; font-weight: bold; color: #333;">Digital Twin Report</h1>
      <p style="margin: 10px 0 0 0; font-size: 14px; color: #666;">Generated: ${currentDate}</p>
    </div>
  `;

    // Step 3: Clone and clean up the original content
    const clone = original.cloneNode(true);

    // Remove any background colors and improve formatting
    const cleanupElement = (element) => {
      if (element.style) {
        element.style.backgroundColor = "transparent";
        element.style.background = "none";
        element.style.maxHeight = "none";
        element.style.overflow = "visible";
        element.style.border = "none";
        element.style.borderRadius = "0";
        element.style.boxShadow = "none";
      }

      // Improve heading spacing
      if (element.tagName && element.tagName.match(/^H[1-6]$/)) {
        element.style.marginTop = "25px";
        element.style.marginBottom = "15px";
        element.style.lineHeight = "1.3";
        element.style.fontWeight = "bold";
        element.style.color = "#333";

        // Fix title spacing issues
        if (element.tagName === "H1") {
          element.style.fontSize = "22px";
          element.style.wordSpacing = "normal";
          element.style.letterSpacing = "normal";
        }
      }

      // Improve paragraph spacing
      if (element.tagName === "P") {
        element.style.marginBottom = "12px";
        element.style.lineHeight = "1.6";
      }

      // Improve table formatting
      if (element.tagName === "TABLE") {
        element.style.width = "100%";
        element.style.borderCollapse = "collapse";
        element.style.marginBottom = "20px";
      }

      if (element.tagName === "TD" || element.tagName === "TH") {
        element.style.padding = "8px";
        element.style.border = "1px solid #ddd";
        element.style.textAlign = "left";
      }

      if (element.tagName === "TH") {
        element.style.backgroundColor = "#f5f5f5";
        element.style.fontWeight = "bold";
      }

      // Recursively clean child elements
      for (let child of element.children) {
        cleanupElement(child);
      }
    };

    cleanupElement(clone);

    // Step 4: Combine header and content
    pdfContainer.innerHTML = headerHtml + clone.innerHTML;

    document.body.appendChild(pdfContainer);

    try {
      // Wait for fonts and styles to load
      await new Promise((resolve) => setTimeout(resolve, 200));

      const canvas = await html2canvas(pdfContainer, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        width: pdfContainer.scrollWidth,
        height: pdfContainer.scrollHeight,
        onclone: (clonedDoc) => {
          // Ensure consistent styling in cloned document
          const style = clonedDoc.createElement("style");
          style.textContent = `
          * { 
            box-sizing: border-box; 
            background: transparent !important;
            background-color: transparent !important;
          }
          h1, h2, h3 { 
            word-spacing: normal !important; 
            letter-spacing: normal !important;
            line-height: 1.3 !important;
          }
          table { border-collapse: collapse !important; }
          td, th { padding: 8px !important; border: 1px solid #ddd !important; }
        `;
          clonedDoc.head.appendChild(style);
        },
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pdfWidth;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

      const paddingBottom = 15;
      const availableHeight = pdfHeight - paddingBottom;
      const fontSize = 8;

      let heightLeft = imgHeight;
      let position = 0;
      let pageNumber = 1;
      let totalPages = Math.ceil(imgHeight / availableHeight);

      // Add first page with page counter
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

      // Add page footer for first page
      if (totalPages > 1) {
        pdf.setDrawColor(200, 200, 200);
        pdf.setLineWidth(0.3);
        pdf.line(
          10,
          pdfHeight - paddingBottom + 3,
          pdfWidth - 10,
          pdfHeight - paddingBottom + 3
        );

        pdf.setFontSize(fontSize);
        pdf.setTextColor(120, 120, 120);
        pdf.text(`Page ${pageNumber} of ${totalPages}`, 10, pdfHeight - 3);
        pdf.text("Continued...", pdfWidth - 25, pdfHeight - 3);
      } else {
        // Single page - just add page number
        pdf.setDrawColor(200, 200, 200);
        pdf.setLineWidth(0.3);
        pdf.line(
          10,
          pdfHeight - paddingBottom + 3,
          pdfWidth - 10,
          pdfHeight - paddingBottom + 3
        );

        pdf.setFontSize(fontSize);
        pdf.setTextColor(120, 120, 120);
        pdf.text(`Page ${pageNumber} of ${totalPages}`, 10, pdfHeight - 3);
      }

      heightLeft -= availableHeight;

      // Add subsequent pages
      while (heightLeft > 0) {
        position -= availableHeight;
        pdf.addPage();
        pageNumber++;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

        const isLastPage = heightLeft <= availableHeight;

        // Add footer
        pdf.setDrawColor(200, 200, 200);
        pdf.setLineWidth(0.3);
        pdf.line(
          10,
          pdfHeight - paddingBottom + 3,
          pdfWidth - 10,
          pdfHeight - paddingBottom + 3
        );

        pdf.setFontSize(fontSize);
        pdf.setTextColor(120, 120, 120);
        pdf.text(`Page ${pageNumber} of ${totalPages}`, 10, pdfHeight - 3);

        if (isLastPage) {
          pdf.text("End of Report", pdfWidth - 28, pdfHeight - 3);
        } else {
          pdf.text("Continued...", pdfWidth - 25, pdfHeight - 3);
        }

        heightLeft -= availableHeight;
      }

      // Generate filename with timestamp
      const timestamp = new Date().toISOString().slice(0, 10);
      const filename = `Digital-Twin-Report-${timestamp}.pdf`;

      pdf.save(filename);

      console.log("PDF generated successfully");
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      // Clean up
      if (document.body.contains(pdfContainer)) {
        document.body.removeChild(pdfContainer);
      }
    }
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
          width: "800px", // You can adjust this
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
          <div className={styles.container}>
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

                  <h4>{isNewSession}</h4>
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
              <Select
                multiple
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
                    <Checkbox checked={selectedRisks.includes(risk.value)} />
                    <ListItemText primary={risk.label} />
                  </MenuItem>
                ))}
              </Select>
              {!!selectedRisks.length && (
                <Button onClick={getAnalysisResult}>
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
              {data?.data?.digital_twin && (
                <ModelArray twins={data.data.digital_twin} />
              )}

              {/* {!data?.data?.digital_twin && (
                    <ModelArray
                    twins={data?.data?.digital_twin?.length ? data.data.digital_twin : dummyTwin}
                  />
                  )} */}
              {/* </div> */}
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
    </>
  );
}

function ModelArray({ twins }) {
  return (
    <>
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
          const exertionData = twin.exertion?.raw_scores;
          const cognitiveWorkload = twin.cognitive_load?.overall_score || 0;
          const cognitiveLevel = (cognitiveWorkload / 120) * 100;

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
                data={{ ...discomfortData, exertion: exertionData }}
                cognitive
                cognitiveLevel={cognitiveLevel}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
