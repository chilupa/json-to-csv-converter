import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  ThemeProvider,
  Tabs,
  Tab,
} from "@mui/material";
import TextInput from "./components/TextInput";
import FileUpload from "./components/FileUpload";
import AlertMessage from "./components/AlertMessage";
import { theme } from "./theme";

export default function App() {
  const [jsonInput, setJsonInput] = useState(
    '[{"Vehicle":"BMW","Date":"30, Jul 2013 09:24 AM","Location":"Texas"},{"Vehicle":"Audi","Date":"30, Jul 2013 12:00 AM","Location":"Texas"}]'
  );
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [csvData, setCsvData] = useState(null);

  const processJSON = (jsonData, autoDownload = true) => {
    try {
      setError("");
      setSuccess("");

      const data = JSON.parse(jsonData.trim());
      if (!Array.isArray(data) || !data.length) {
        setError("JSON must be a non-empty array of objects");
        return;
      }

      const headers = Object.keys(data[0]);
      const csvRows = [headers.join(",")];

      data.forEach((row) => {
        const values = headers.map(
          (header) => `"${String(row[header] ?? "").replace(/"/g, '""')}"`
        );
        csvRows.push(values.join(","));
      });

      const csvContent = csvRows.join("\n");

      if (autoDownload) {
        downloadCSV(csvContent);
      } else {
        setCsvData(csvContent);
      }

      setSuccess(`Successfully converted ${data.length} records to CSV!`);
    } catch (err) {
      setError(`Invalid JSON: ${err.message}`);
    }
  };

  const downloadCSV = (csvContent) => {
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `data_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (file) => {
    setUploading(true);
    setProgress(0);
    setError("");
    setSuccess("");

    const reader = new FileReader();

    reader.onprogress = (e) => {
      if (e.lengthComputable) {
        setProgress((e.loaded / e.total) * 100);
      }
    };

    reader.onload = (e) => {
      setProgress(100);
      setTimeout(() => {
        processJSON(e.target.result, false);
        setUploading(false);
        setProgress(0);
      }, 200);
    };

    reader.onerror = () => {
      setError("Error reading file");
      setUploading(false);
      setProgress(0);
    };

    reader.readAsText(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file?.type === "application/json" || file?.name.endsWith(".json")) {
      handleFileUpload(file);
    } else {
      setError("Please upload a valid JSON file");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 4 }}>
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography
              variant="h4"
              gutterBottom
              align="center"
              color="primary"
              fontWeight={600}
            >
              JSON to CSV Converter
            </Typography>

            <Tabs
              value={tabValue}
              onChange={(e, v) => {
                setTabValue(v);
                setError("");
                setSuccess("");
                setCsvData(null);
              }}
              sx={{ mb: 3 }}
            >
              <Tab label="Text Input" />
              <Tab label="File Upload" />
            </Tabs>

            {tabValue === 0 ? (
              <TextInput
                jsonInput={jsonInput}
                setJsonInput={setJsonInput}
                onConvert={processJSON}
              />
            ) : (
              <FileUpload
                uploading={uploading}
                progress={progress}
                isDragOver={isDragOver}
                csvData={csvData}
                onFileUpload={handleFileUpload}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDownload={downloadCSV}
              />
            )}

            <AlertMessage error={error} success={success} />
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
