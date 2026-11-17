/**
 * Parse RFC 4180 CSV string to JSON array, supporting CRLF/LF line endings,
 * quoted fields with embedded newlines, and escaped quotes ("").
 * @param {string} csvText - Raw CSV text
 * @returns {Array<Object>} Array of objects with keys from header row
 */
export function parseCSV(csvText) {
  if (!csvText || csvText.trim() === '') {
    return [];
  }

  // Strip UTF-8 BOM if present
  const normalizedText = csvText.charCodeAt(0) === 0xfeff ? csvText.slice(1) : csvText;

  const rows = parseCSVRows(normalizedText);
  if (rows.length === 0) {
    return [];
  }

  const headers = rows[0].map((header) => header.trim());
  if (headers.every((header) => header === '')) {
    return [];
  }

  const data = [];
  for (let i = 1; i < rows.length; i++) {
    const values = rows[i];

    // Skip blank lines
    if (values.length === 1 && values[0].trim() === '') {
      continue;
    }

    const row = {};
    headers.forEach((header, index) => {
      if (header) {
        row[header] = (values[index] ?? '').trim();
      }
    });
    data.push(row);
  }

  return data;
}

/**
 * Tokenize CSV text into rows of field strings.
 * @param {string} text - Normalized CSV text
 * @returns {Array<Array<string>>} Parsed rows
 */
function parseCSVRows(text) {
  const rows = [];
  let currentRow = [];
  let currentValue = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentValue += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      currentRow.push(currentValue);
      currentValue = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      currentRow.push(currentValue);
      rows.push(currentRow);
      currentRow = [];
      currentValue = '';
    } else {
      currentValue += char;
    }
  }

  // Push final field/row if there is trailing content
  if (currentValue !== '' || currentRow.length > 0) {
    currentRow.push(currentValue);
    rows.push(currentRow);
  }

  return rows;
}

/**
 * Fetch and parse CSV from URL
 * @param {string} url - CSV URL
 * @returns {Promise<Array>} Parsed data
 */
export async function fetchCSV(url) {
  try {
    const response = await fetch(url, {
      cache: 'no-cache', // Always get fresh data
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const csvText = await response.text();
    return parseCSV(csvText);
  } catch (error) {
    console.error('Error fetching CSV:', error);
    throw error;
  }
}
