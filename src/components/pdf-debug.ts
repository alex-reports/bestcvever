// PDF Export Debug Utilities
export function debugElementDimensions(element: HTMLElement): void {
  if (!element) {
    console.warn('No element provided for dimension debugging');
    return;
  }

  const rect = element.getBoundingClientRect();
  const computedStyle = getComputedStyle(element);
  
  console.group('PDF Export Element Debug');
  console.log('Element:', element);
  console.log('BoundingClientRect:', {
    width: rect.width,
    height: rect.height,
    top: rect.top,
    left: rect.left
  });
  console.log('Scroll dimensions:', {
    scrollWidth: element.scrollWidth,
    scrollHeight: element.scrollHeight
  });
  console.log('Offset dimensions:', {
    offsetWidth: element.offsetWidth,
    offsetHeight: element.offsetHeight
  });
  console.log('Computed style:', {
    width: computedStyle.width,
    height: computedStyle.height,
    display: computedStyle.display,
    position: computedStyle.position
  });
  console.groupEnd();
}

export function logPDFExportSettings(options: any): void {
  console.group('PDF Export Settings');
  console.log('HTML2Canvas options:', options.html2canvas);
  console.log('jsPDF options:', options.jsPDF);
  console.log('Image options:', options.image);
  console.log('Margins:', options.margin);
  console.groupEnd();
}

export function validatePDFExportElement(element: HTMLElement): boolean {
  if (!element) {
    console.error('PDF Export: No element provided');
    return false;
  }

  const rect = element.getBoundingClientRect();
  const computedStyle = getComputedStyle(element);

  if (element.offsetWidth === 0 || element.offsetHeight === 0) {
    console.error('PDF Export: Element has zero dimensions', {
      offsetWidth: element.offsetWidth,
      offsetHeight: element.offsetHeight,
      rect: { width: rect.width, height: rect.height }
    });
    return false;
  }

  if (computedStyle.display === 'none') {
    console.error('PDF Export: Element is hidden (display: none)');
    return false;
  }

  if (computedStyle.visibility === 'hidden') {
    console.warn('PDF Export: Element visibility is hidden but will proceed');
  }

  return true;
}

export function addDebugStyles(): void {
  const debugStyle = document.createElement('style');
  debugStyle.setAttribute('data-pdf-debug', 'true');
  debugStyle.textContent = `
    .pdf-debug-outline * {
      outline: 1px solid red !important;
    }
    .pdf-debug-dimensions::before {
      content: attr(data-width) ' x ' attr(data-height);
      position: absolute;
      top: 0;
      left: 0;
      background: rgba(255, 0, 0, 0.8);
      color: white;
      font-size: 10px;
      padding: 2px 4px;
      z-index: 9999;
    }
  `;
  document.head.appendChild(debugStyle);
}

export function removeDebugStyles(): void {
  const debugStyles = document.querySelectorAll('style[data-pdf-debug="true"]');
  debugStyles.forEach(style => {
    if (style.parentNode) {
      style.parentNode.removeChild(style);
    }
  });
}