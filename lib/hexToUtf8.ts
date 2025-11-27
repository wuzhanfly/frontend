import hexToBytes from 'lib/hexToBytes';

// Error message types
type Utf8ErrorType = 'invalid_utf8' | 'decode_error';

function isValidUtf8(bytes: Uint8Array): boolean {
  let i = 0;
  while (i < bytes.length) {
    const byte = bytes[i];
    
    // ASCII (0-127)
    if (byte <= 0x7F) {
      i++;
      continue;
    }
    
    // Multi-byte sequence
    let expectedContinuations = 0;
    let minValue = 0;
    
    if ((byte & 0xE0) === 0xC0) {
      // 2-byte sequence
      expectedContinuations = 1;
      minValue = 0x80;
    } else if ((byte & 0xF0) === 0xE0) {
      // 3-byte sequence
      expectedContinuations = 2;
      minValue = 0x800;
    } else if ((byte & 0xF8) === 0xF0) {
      // 4-byte sequence
      expectedContinuations = 3;
      minValue = 0x10000;
    } else {
      // Invalid UTF-8 start byte
      return false;
    }
    
    // Check continuation bytes
    if (i + expectedContinuations >= bytes.length) {
      return false;
    }
    
    for (let j = 1; j <= expectedContinuations; j++) {
      if ((bytes[i + j] & 0xC0) !== 0x80) {
        return false;
      }
    }
    
    // Check for overlong encoding
    const codePoint = getCodePoint(bytes, i, expectedContinuations + 1);
    if (codePoint < minValue) {
      return false;
    }
    
    i += expectedContinuations + 1;
  }
  
  return true;
}

function getCodePoint(bytes: Uint8Array, start: number, length: number): number {
  let codePoint = 0;
  switch (length) {
    case 2:
      codePoint = ((bytes[start] & 0x1F) << 6) | (bytes[start + 1] & 0x3F);
      break;
    case 3:
      codePoint = ((bytes[start] & 0x0F) << 12) | ((bytes[start + 1] & 0x3F) << 6) | (bytes[start + 2] & 0x3F);
      break;
    case 4:
      codePoint = ((bytes[start] & 0x07) << 18) | ((bytes[start + 1] & 0x3F) << 12) | ((bytes[start + 2] & 0x3F) << 6) | (bytes[start + 3] & 0x3F);
      break;
  }
  return codePoint;
}

export default function hexToUtf8(hex: string, t?: (key: string, params?: Record<string, any>) => string) {
  try {
    const bytes = hexToBytes(hex);
    
    // Check if the hex is empty or just contains zeros
    if (bytes.length === 0 || bytes.every(byte => byte === 0)) {
      return '';
    }
    
    // First, validate if it's proper UTF-8
    if (!isValidUtf8(bytes)) {
      return t ? 
        t('shared.common.invalid_utf8_with_hex', { hex }) : 
        `[Invalid UTF-8] ${ hex }`;
    }
    
    // Now decode with strict mode
    const utf8decoder = new TextDecoder('utf-8', { fatal: true, ignoreBOM: true });
    return utf8decoder.decode(bytes);
  } catch (error) {
    // If decoding fails, return a helpful message with the original hex
    return t ? 
      t('shared.common.decode_error_with_hex', { hex }) : 
      `[Decode error] ${ hex }`;
  }
}

export function getUtf8ErrorMessage(errorType: Utf8ErrorType, hex: string, t?: (key: string, params?: Record<string, any>) => string) {
  return t ? 
    t(`shared.common.${errorType}_with_hex`, { hex }) : 
    `[${errorType === 'invalid_utf8' ? 'Invalid UTF-8' : 'Decode error'}] ${ hex }`;
}
