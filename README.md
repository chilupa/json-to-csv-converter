# JSON to CSV Converter

A modern React web application to convert JSON data to CSV format.

## Features

- **Dual Input Methods**: Text input and file upload with drag & drop support
- **Real-time Processing**: Instant JSON validation and conversion
- **Progress Tracking**: Upload progress indicator with visual feedback
- **Manual Download Control**: Choose when to download converted files
- **Modern UI**: Clean Material-UI design with Inter font and indigo theme
- **Error Handling**: Comprehensive validation and user-friendly error messages
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- React 18
- Material-UI (MUI) 5
- Modern ES6+ JavaScript
- Component-based architecture

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd json-to-csv-converter
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Text Input Method

1. Select the "Text Input" tab
2. Paste your JSON array data into the text area
3. Click "Convert & Download CSV" to instantly download the file

### File Upload Method

1. Select the "File Upload" tab
2. Drag and drop a JSON file or click to browse
3. Watch the upload progress
4. Click "Download CSV File" when processing is complete

## JSON Format Requirements

- Input must be a valid JSON array of objects
- All objects should have consistent property names
- Example:

```json
[
  {
    "Vehicle": "BMW",
    "Date": "30, Jul 2013 09:24 AM",
    "Location": "Texas",
    "Speed": 42
  },
  {
    "Vehicle": "Audi",
    "Date": "30, Jul 2013 12:00 AM",
    "Location": "Texas",
    "Speed": 0
  }
]
```

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## License

MIT License
