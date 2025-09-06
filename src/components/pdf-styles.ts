// RGB color mappings for PDF export (no OKLCH colors)
const RGB_COLOR_MAP = {
  // Light theme colors
  '--background': '#ffffff',
  '--foreground': '#252525',
  '--card': '#ffffff',
  '--card-foreground': '#252525',
  '--popover': '#ffffff',
  '--popover-foreground': '#252525',
  '--primary': '#030213',
  '--primary-foreground': '#ffffff',
  '--secondary': '#f1f2f4',
  '--secondary-foreground': '#030213',
  '--muted': '#ececf0',
  '--muted-foreground': '#717182',
  '--accent': '#e9ebef',
  '--accent-foreground': '#030213',
  '--destructive': '#d4183d',
  '--destructive-foreground': '#ffffff',
  '--border': 'rgba(0, 0, 0, 0.1)',
  '--input': 'transparent',
  '--input-background': '#f3f3f5',
  '--switch-background': '#cbced4',
  '--ring': '#b5b5b5',
  '--chart-1': '#ff6b6b',
  '--chart-2': '#4ecdc4',
  '--chart-3': '#45b7d1',
  '--chart-4': '#f9ca24',
  '--chart-5': '#f0932b',
  // Tailwind color variables
  '--color-background': '#ffffff',
  '--color-foreground': '#252525',
  '--color-card': '#ffffff',
  '--color-card-foreground': '#252525',
  '--color-popover': '#ffffff',
  '--color-popover-foreground': '#252525',
  '--color-primary': '#030213',
  '--color-primary-foreground': '#ffffff',
  '--color-secondary': '#f1f2f4',
  '--color-secondary-foreground': '#030213',
  '--color-muted': '#ececf0',
  '--color-muted-foreground': '#717182',
  '--color-accent': '#e9ebef',
  '--color-accent-foreground': '#030213',
  '--color-destructive': '#d4183d',
  '--color-destructive-foreground': '#ffffff',
  '--color-border': 'rgba(0, 0, 0, 0.1)',
  '--color-input': 'transparent',
  '--color-input-background': '#f3f3f5',
  '--color-switch-background': '#cbced4',
  '--color-ring': '#b5b5b5',
  '--color-chart-1': '#ff6b6b',
  '--color-chart-2': '#4ecdc4',
  '--color-chart-3': '#45b7d1',
  '--color-chart-4': '#f9ca24',
  '--color-chart-5': '#f0932b',
  // Sidebar colors
  '--sidebar': '#ffffff',
  '--sidebar-foreground': '#252525',
  '--sidebar-primary': '#030213',
  '--sidebar-primary-foreground': '#ffffff',
  '--sidebar-accent': '#f5f5f5',
  '--sidebar-accent-foreground': '#252525',
  '--sidebar-border': 'rgba(0, 0, 0, 0.1)',
  '--sidebar-ring': '#b5b5b5',
  '--color-sidebar': '#ffffff',
  '--color-sidebar-foreground': '#252525',
  '--color-sidebar-primary': '#030213',
  '--color-sidebar-primary-foreground': '#ffffff',
  '--color-sidebar-accent': '#f5f5f5',
  '--color-sidebar-accent-foreground': '#252525',
  '--color-sidebar-border': 'rgba(0, 0, 0, 0.1)',
  '--color-sidebar-ring': '#b5b5b5',
};

// Store original CSS custom property values
let originalCSSProperties: { [key: string]: string } = {};

export function applyPDFColorOverrides(): void {
  const rootStyle = document.documentElement.style;
  const computedStyle = getComputedStyle(document.documentElement);
  
  // Store original values
  originalCSSProperties = {};
  
  Object.keys(RGB_COLOR_MAP).forEach(property => {
    try {
      // Store the original value
      originalCSSProperties[property] = computedStyle.getPropertyValue(property) || '';
      
      // Set the RGB override
      rootStyle.setProperty(property, RGB_COLOR_MAP[property as keyof typeof RGB_COLOR_MAP], 'important');
    } catch (error) {
      console.warn(`Failed to apply PDF color override for ${property}:`, error);
    }
  });
}

export function restorePDFColorOverrides(): void {
  const rootStyle = document.documentElement.style;
  
  // Restore original values
  Object.keys(originalCSSProperties).forEach(property => {
    try {
      if (originalCSSProperties[property]) {
        rootStyle.setProperty(property, originalCSSProperties[property]);
      } else {
        rootStyle.removeProperty(property);
      }
    } catch (error) {
      console.warn(`Failed to restore PDF color override for ${property}:`, error);
    }
  });
  
  // Clear the storage
  originalCSSProperties = {};
}

// Comprehensive CSS override for PDF export
export const PDF_COLOR_OVERRIDES = `
  :root {
    ${Object.entries(RGB_COLOR_MAP).map(([prop, value]) => `${prop}: ${value} !important;`).join('\n    ')}
  }
  
  * {
    -webkit-print-color-adjust: exact !important;
    color-adjust: exact !important;
  }
  
  /* Ensure all Tailwind color classes use RGB values */
  .bg-background { background-color: #ffffff !important; }
  .bg-foreground { background-color: #252525 !important; }
  .bg-card { background-color: #ffffff !important; }
  .bg-popover { background-color: #ffffff !important; }
  .bg-primary { background-color: #030213 !important; }
  .bg-secondary { background-color: #f1f2f4 !important; }
  .bg-muted { background-color: #ececf0 !important; }
  .bg-accent { background-color: #e9ebef !important; }
  .bg-destructive { background-color: #d4183d !important; }
  
  .text-background { color: #ffffff !important; }
  .text-foreground { color: #252525 !important; }
  .text-card-foreground { color: #252525 !important; }
  .text-popover-foreground { color: #252525 !important; }
  .text-primary { color: #030213 !important; }
  .text-primary-foreground { color: #ffffff !important; }
  .text-secondary { color: #f1f2f4 !important; }
  .text-secondary-foreground { color: #030213 !important; }
  .text-muted { color: #ececf0 !important; }
  .text-muted-foreground { color: #717182 !important; }
  .text-accent { color: #e9ebef !important; }
  .text-accent-foreground { color: #030213 !important; }
  .text-destructive { color: #d4183d !important; }
  .text-destructive-foreground { color: #ffffff !important; }
  
  .border { border-color: rgba(0, 0, 0, 0.1) !important; }
  .border-background { border-color: #ffffff !important; }
  .border-foreground { border-color: #252525 !important; }
  .border-card { border-color: #ffffff !important; }
  .border-popover { border-color: #ffffff !important; }
  .border-primary { border-color: #030213 !important; }
  .border-secondary { border-color: #f1f2f4 !important; }
  .border-muted { border-color: #ececf0 !important; }
  .border-accent { border-color: #e9ebef !important; }
  .border-destructive { border-color: #d4183d !important; }
  .border-border { border-color: rgba(0, 0, 0, 0.1) !important; }
  .border-input { border-color: transparent !important; }
`;

export function createPDFStyleElement(): HTMLStyleElement {
  const styleElement = document.createElement('style');
  styleElement.setAttribute('data-pdf-override', 'true');
  styleElement.textContent = PDF_COLOR_OVERRIDES;
  return styleElement;
}

export function removePDFStyleElements(): void {
  const elements = document.querySelectorAll('style[data-pdf-override="true"]');
  elements.forEach(element => {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  });
}