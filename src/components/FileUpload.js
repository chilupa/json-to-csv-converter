import React from 'react';
import { Box, Typography, Button, LinearProgress, styled } from '@mui/material';
import { CloudUpload, Download } from '@mui/icons-material';

const UploadBox = styled(Box)(({ theme, isDragOver }) => ({
  border: `2px dashed ${isDragOver ? theme.palette.primary.main : '#ccc'}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  textAlign: 'center',
  cursor: 'pointer',
  backgroundColor: isDragOver ? theme.palette.action.hover : 'transparent',
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover,
  },
}));

export default function FileUpload({ 
  uploading, 
  progress, 
  isDragOver, 
  csvData, 
  onFileUpload, 
  onDrop, 
  onDragOver, 
  onDragLeave, 
  onDownload 
}) {
  return (
    <>
      <UploadBox
        isDragOver={isDragOver}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={() => !uploading && document.getElementById('file-input').click()}
        sx={{ mb: 3, minHeight: 300, opacity: uploading ? 0.7 : 1 }}
      >
        <CloudUpload sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          {uploading ? 'Processing...' : 'Drop JSON file here or click to browse'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Supports .json files
        </Typography>
        <input
          id="file-input"
          type="file"
          accept=".json,application/json"
          style={{ display: 'none' }}
          onChange={(e) => e.target.files[0] && onFileUpload(e.target.files[0])}
          disabled={uploading}
        />
      </UploadBox>
      {uploading && (
        <Box sx={{ mb: 2 }}>
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
            {Math.round(progress)}% uploaded
          </Typography>
        </Box>
      )}
      {csvData && (
        <Button
          variant="contained"
          size="large"
          startIcon={<Download />}
          onClick={() => onDownload(csvData)}
          fullWidth
          sx={{ py: 1.5, mb: 2 }}
        >
          Download CSV File
        </Button>
      )}
    </>
  );
}