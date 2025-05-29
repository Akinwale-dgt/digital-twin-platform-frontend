import * as React from 'react';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import { Button } from '@mui/material';
import ModelViewer from '../components/ModelViewer/Model';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { marked } from 'marked';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jsPDF } from 'jspdf';
import { decode } from 'he';

export default function Home() {
  const router = useRouter();
  const [openAnalysis, setAnalysisOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleCloseDialog = () => setAnalysisOpen(false);

  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [reportStatus, setReportStatus] = React.useState('');
  const [reportData, setReportData] = React.useState({});
  const [polling, setPolling] = React.useState(false);
  const [html, setHtml] = React.useState('');
  const hiddenRef = React.useRef(null);

  // ✅ Convert markdown to HTML once reportData is loaded
  React.useEffect(() => {
    if (reportData?.results?.report_markdown) {
      setHtml(marked.parse(reportData.results.report_markdown));
    }
  }, [reportData]);

  const getAnalysisResult = () => {
    setLoading(true);

    axios
      .get('https://digital-twin-platform.onrender.com/api/analyze-data')
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
          position: 'top-right',
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
    setReportStatus('Analyzing...');

    const intervalId = setInterval(() => {
      axios
        .get(
          `https://digital-twin-platform.onrender.com/api/report/${reportId}`
        )
        .then((res) => {
          const status = res.data?.status;
          console.log(`Polling attempt ${attempts + 1}:`, status);
          setReportStatus(`Analysing: ${status}`);

          if (status === 'completed') {
            clearInterval(intervalId);
            setPolling(false);
            setReportStatus('');
            setReportData(res.data);
          }

          if (++attempts >= maxTries) {
            clearInterval(intervalId);
            setPolling(false);
            setReportStatus(
              'Could not complete status check after several attempts.'
            );
          }
        })
        .catch((err) => {
          console.error('Polling error:', err.message);
          clearInterval(intervalId);
          setPolling(false);
          setReportStatus('An error occurred while analysing data.');
        });
    }, interval);
  };

  const discomfortData = data?.data?.digital_twin?.discomfort?.raw_scores;
  const exertionData = data?.data?.digital_twin?.exertion?.raw_scores;
  const cognitiveWorkload =
    data?.data?.digital_twin?.cognitive_load?.overall_score;
  const cognitiveLevel = (cognitiveWorkload / 120) * 100;

  const visitSubjectiveEvaluation = () => {
    router.push('/subjective-evaluation');
  };

  const handleDownload = () => {
    if (!reportData?.results?.report_markdown) return;

    const markdown = reportData.results.report_markdown;

    // Convert markdown to HTML, strip tags, decode HTML entities
    const rawHTML = marked.parse(markdown);
    const plainText = decode(rawHTML.replace(/<[^>]+>/g, ''));

    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;
    const maxWidth = 180;
    let y = margin;

    // Title Page
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('Digital Twin Report', 105, 50, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 105, 65, {
      align: 'center',
    });

    doc.addPage();
    y = margin;

    const lines = plainText.split('\n');

    lines.forEach((line) => {
      if (/^#{1,6}\s/.test(line)) {
        // Heading detection
        const level = line.match(/^#{1,6}/)[0].length;
        const text = line.replace(/^#{1,6}\s*/, '');
        const fontSize = Math.max(20 - level * 2, 10);
        const wrapped = doc.splitTextToSize(text, maxWidth);

        // Only H1 and H2 are bold
        if (level <= 2) {
          doc.setFont('helvetica', 'bold');
        } else {
          doc.setFont('helvetica', 'normal');
        }
        doc.setFontSize(fontSize);

        wrapped.forEach((wLine) => {
          if (y + 10 > pageHeight - margin) {
            doc.addPage();
            y = margin;
          }
          doc.text(wLine, margin, y);
          y += 10;
        });
      } else if (/\\text{.*?}/.test(line)) {
        // \text{} handling with basic split
        const match = line.match(/\\text{(.*?)}/);
        if (match) {
          const before = line.split(match[0])[0];
          const inner = match[1];
          const after = line.split(match[0])[1];

          const wrappedBefore = doc.splitTextToSize(before, maxWidth);
          const wrappedInner = doc.splitTextToSize(inner, maxWidth);
          const wrappedAfter = doc.splitTextToSize(after, maxWidth);

          wrappedBefore.forEach((wLine) => {
            if (y + 10 > pageHeight - margin) {
              doc.addPage();
              y = margin;
            }
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(12);
            doc.text(wLine, margin, y);
            y += 10;
          });

          wrappedInner.forEach((wLine) => {
            if (y + 10 > pageHeight - margin) {
              doc.addPage();
              y = margin;
            }
            doc.setFont('helvetica', 'italic');
            doc.setFontSize(12);
            doc.text(wLine, margin, y);
            y += 10;
          });

          wrappedAfter.forEach((wLine) => {
            if (y + 10 > pageHeight - margin) {
              doc.addPage();
              y = margin;
            }
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(12);
            doc.text(wLine, margin, y);
            y += 10;
          });
        } else {
          const wrapped = doc.splitTextToSize(line, maxWidth);
          wrapped.forEach((wLine) => {
            if (y + 10 > pageHeight - margin) {
              doc.addPage();
              y = margin;
            }
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(12);
            doc.text(wLine, margin, y);
            y += 10;
          });
        }
      } else {
        // Normal paragraph text
        const wrapped = doc.splitTextToSize(line, maxWidth);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);

        wrapped.forEach((wLine) => {
          if (y + 10 > pageHeight - margin) {
            doc.addPage();
            y = margin;
          }
          doc.text(wLine, margin, y);
          y += 10;
        });
      }
    });

    // Add Page Numbers
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Page ${i} of ${pageCount}`, 105, 290, { align: 'center' });
    }

    doc.save('report.pdf');
  };

  return (
    <>
      <div
        ref={hiddenRef}
        style={{
          position: 'absolute',
          left: '-9999px',
          top: 0,
          width: '800px', // You can adjust this
          padding: '20px',
          backgroundColor: '#fff',
          color: '#000',
          zIndex: -1,
        }}
      />
      <ToastContainer />
      <div className={styles.container}>
        <Head>
          <title>Digital Twin Platform</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <main className={styles.main}>
          <div className={styles.container}>
            <div className={styles.column}>
              {JSON.stringify(reportData) === '{}' && (
                <Button onClick={visitSubjectiveEvaluation}>Data Input</Button>
              )}
              {JSON.stringify(reportData) !== '{}' && (
                <div>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Button onClick={visitSubjectiveEvaluation}>
                      Data Input
                    </Button>
                    <Button onClick={handleDownload}>Download Report</Button>
                  </div>
                </div>
              )}
              {polling || reportStatus ? (
                <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                  {polling && (
                    <CircularProgress
                      size={20}
                      style={{ marginRight: '0.5rem' }}
                    />
                  )}
                  <span>{reportStatus}</span>
                </div>
              ) : null}

              {html ? (
                <div
                  style={{
                    maxHeight: '800px',
                    overflowY: 'auto',
                    border: '1px solid #ddd',
                    padding: '1rem',
                    marginTop: '1rem',
                    borderRadius: '8px',
                    backgroundColor: '#f9f9f9',
                    textAlign: 'left',
                  }}
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              ) : (
                <p style={{ fontStyle: 'italic', marginTop: '1rem' }}>
                  Report will appear here after analysis...
                </p>
              )}
            </div>

            <div className={styles.column}>
              <Button onClick={getAnalysisResult}>
                Analyse Risk{' '}
                {loading && (
                  <CircularProgress
                    size={20}
                    color='secondary'
                    style={{ marginRight: '0.5rem' }}
                  />
                )}
              </Button>
              <div className={styles.modelColumn}>
                <ModelViewer
                  data={{ ...discomfortData, exertion: exertionData }}
                  cognitive={true}
                  cognitiveLevel={cognitiveLevel}
                />
              </div>
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
