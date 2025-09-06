import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Download, FileText } from "lucide-react";
import html2pdf from "html2pdf.js";
import { toast } from "sonner@2.0.3";
import { 
  createPDFStyleElement, 
  removePDFStyleElements, 
  applyPDFColorOverrides, 
  restorePDFColorOverrides 
} from "./pdf-styles";
import { CVTemplatePDF } from "./CVTemplatePDF";
import { debugElementDimensions, validatePDFExportElement } from "./pdf-debug";

import type { CVData } from "./types";

interface PDFExportProps {
  elementRef: React.RefObject<HTMLElement>;
  filename?: string;
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  cvData?: CVData; // CV data for fallback PDF template
  useFallback?: boolean; // Whether to use PDF-safe template
}

export function PDFExport({ 
  elementRef, 
  filename = "CV", 
  className,
  variant = "default",
  size = "default",
  cvData,
  useFallback = false
}: PDFExportProps) {
  const [isExporting, setIsExporting] = useState(false);
  const fallbackRef = useRef<HTMLDivElement>(null);

  const exportToPDF = async () => {
    // Always use fallback for more reliable PDF generation
    const targetElement = fallbackRef.current;
    
    if (!targetElement || !cvData) {
      toast.error("No content to export");
      return;
    }

    setIsExporting(true);

    try {
      // Show loading toast
      toast.info("Generating PDF...", {
        duration: 2000,
      });

      // Prepare element for measurement - make it temporarily visible
      const originalStyles = {
        position: targetElement.style.position,
        top: targetElement.style.top,
        left: targetElement.style.left,
        visibility: targetElement.style.visibility,
        opacity: targetElement.style.opacity,
        width: targetElement.style.width,
        height: targetElement.style.height,
        zIndex: targetElement.style.zIndex
      };

      // Make element visible and positioned for accurate measurement
      targetElement.style.position = 'absolute';
      targetElement.style.top = '0';
      targetElement.style.left = '0';
      targetElement.style.visibility = 'visible';
      targetElement.style.opacity = '1';
      targetElement.style.width = 'auto';
      targetElement.style.height = 'auto';
      targetElement.style.zIndex = '9999';
      targetElement.style.minWidth = '850px'; // Ensure proper minimum width
      
      // Force layout recalculation
      targetElement.offsetHeight;
      
      // Wait for layout to stabilize
      await new Promise(resolve => setTimeout(resolve, 500));

      // Debug element dimensions
      debugElementDimensions(targetElement);
      
      // Validate element before processing
      if (!validatePDFExportElement(targetElement)) {
        throw new Error("Invalid element for PDF export");
      }

      // Get precise element dimensions
      const elementRect = targetElement.getBoundingClientRect();
      const contentWidth = Math.max(targetElement.scrollWidth, targetElement.offsetWidth, elementRect.width, 850);
      const contentHeight = Math.max(targetElement.scrollHeight, targetElement.offsetHeight, elementRect.height, 600);
      
      console.log(`Content dimensions: ${contentWidth}px x ${contentHeight}px`);
      
      // Use A4 proportions but allow dynamic height
      const a4Width = 850; // Slightly larger than minimum for better layout
      const pdfWidth = Math.max(a4Width, contentWidth);
      const pdfHeight = Math.max(contentHeight, 600);
      
      // Configure html2pdf options with enhanced settings for layout preservation
      const options = {
        margin: [0.3, 0.3, 0.3, 0.3], // Small margins
        filename: `${filename}.pdf`,
        image: { 
          type: 'jpeg', 
          quality: 0.95 
        },
        html2canvas: { 
          scale: 1.5, // Balanced scale for quality vs performance
          useCORS: true,
          allowTaint: false,
          backgroundColor: '#ffffff',
          scrollX: 0,
          scrollY: 0,
          width: contentWidth,
          height: contentHeight,
          windowWidth: contentWidth,
          windowHeight: contentHeight,
          logging: false,
          removeContainer: false, // Keep container for better layout
          foreignObjectRendering: true, // Better text rendering
          ignoreElements: (element: Element) => {
            // Skip problematic elements
            if (!element.classList || typeof element.classList.contains !== 'function') {
              return false;
            }
            return element.classList.contains('no-print') ||
                   element.hasAttribute('data-html2canvas-ignore');
          },
          onclone: (clonedDoc: Document) => {
            // Enhanced styling for cloned document with table-specific optimizations
            const clonedStyle = clonedDoc.createElement('style');
            clonedStyle.textContent = `
              /* Force all colors to RGB for PDF compatibility */
              :root {
                --background: #ffffff !important;
                --foreground: #252525 !important;
                --card: #ffffff !important;
                --card-foreground: #252525 !important;
                --secondary: #f1f2f4 !important;
                --secondary-foreground: #030213 !important;
                --muted: #ececf0 !important;
                --muted-foreground: #717182 !important;
                --border: rgba(0, 0, 0, 0.1) !important;
                --primary: #030213 !important;
                --primary-foreground: #ffffff !important;
                --accent: #e9ebef !important;
                --accent-foreground: #030213 !important;
              }
              
              /* Ensure all elements render with proper colors */
              * { 
                -webkit-print-color-adjust: exact !important; 
                color-adjust: exact !important;
                print-color-adjust: exact !important;
                box-sizing: border-box !important;
              }
              
              /* Remove all animations and transitions */
              *, *::before, *::after {
                animation: none !important;
                transition: none !important;
                transform: none !important;
              }
              
              /* Optimize typography */
              body, html {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
                color: #252525 !important;
                background-color: #ffffff !important;
                line-height: 1.5 !important;
                margin: 0 !important;
                padding: 0 !important;
                overflow: visible !important;
              }
              
              /* Container optimization */
              .pdf-cv-container {
                width: 100% !important;
                min-width: 850px !important;
                max-width: none !important;
                margin: 0 auto !important;
                padding: 24px !important;
                background-color: #ffffff !important;
                position: relative !important;
                box-sizing: border-box !important;
              }
              
              /* Table layout optimization for maximum PDF compatibility */
              .pdf-layout-table {
                width: 100% !important;
                max-width: 100% !important;
                table-layout: fixed !important;
                border-collapse: separate !important;
                border-spacing: 24px 0 !important;
                margin: 0 auto !important;
                background-color: #ffffff !important;
              }
              
              .pdf-layout-table col:first-child {
                width: 300px !important;
              }
              
              .pdf-layout-table col:last-child {
                width: calc(100% - 324px) !important;
              }
              
              .pdf-left-column {
                vertical-align: top !important;
                width: 300px !important;
                max-width: 300px !important;
                padding: 0 !important;
                margin: 0 !important;
              }
              
              .pdf-right-column {
                vertical-align: top !important;
                padding: 0 !important;
                margin: 0 !important;
              }
              
              /* Ensure content blocks display properly */
              .pdf-left-content,
              .pdf-right-content {
                display: block !important;
                width: 100% !important;
              }
              
              /* Override any CSS Grid or Flexbox from main template */
              .grid,
              .lg\\:grid-cols-3 {
                display: table !important;
                width: 100% !important;
                table-layout: fixed !important;
              }
              
              .lg\\:col-span-1,
              .lg\\:col-span-2 {
                display: table-cell !important;
                vertical-align: top !important;
              }
              
              .lg\\:col-span-1 {
                width: 280px !important;
              }
              
              /* Card styling optimization */
              .card, [style*="pdfStyles.card"] {
                background-color: #ffffff !important;
                border: 1px solid rgba(0, 0, 0, 0.1) !important;
                border-radius: 10px !important;
                overflow: visible !important;
                page-break-inside: avoid !important;
              }
              
              /* Text color overrides */
              .text-muted-foreground,
              [style*="pdfStyles.mutedText"] {
                color: #717182 !important;
              }
              
              /* Badge styling */
              [style*="pdfStyles.badge"],
              [style*="pdfStyles.badgeOutline"] {
                display: inline-block !important;
                white-space: nowrap !important;
              }
            `;
            clonedDoc.head.appendChild(clonedStyle);
          }
        },
        jsPDF: { 
          unit: 'px',
          format: [pdfWidth, pdfHeight],
          orientation: 'portrait',
          compress: true,
          precision: 2
        }
      };

      // Generate and save PDF
      await html2pdf().set(options).from(targetElement).save();
      
      // Restore original styles
      Object.keys(originalStyles).forEach(key => {
        targetElement.style[key as any] = originalStyles[key as keyof typeof originalStyles];
      });
      
      toast.success("PDF exported successfully!");
    } catch (error) {
      console.error('Error generating PDF:', error);
      
      // Provide more specific error messages
      let errorMessage = "Failed to export PDF. Please try again.";
      if (error instanceof Error) {
        if (error.message.includes('canvas') || error.message.includes('html2canvas')) {
          errorMessage = "PDF export failed due to canvas rendering issue. Try using a different browser or reducing content complexity.";
        } else if (error.message.includes('Invalid element')) {
          errorMessage = "Invalid content for PDF export. Please ensure the CV has valid data.";
        } else if (error.message.includes('dimensions') || error.message.includes('size')) {
          errorMessage = "PDF export failed due to sizing issues. Please try again.";
        }
      }
      
      toast.error(errorMessage);
      
      // Ensure element is hidden again
      if (targetElement) {
        targetElement.style.position = 'fixed';
        targetElement.style.top = '-9999px';
        targetElement.style.left = '-9999px';
        targetElement.style.visibility = 'hidden';
        targetElement.style.opacity = '0';
        targetElement.style.zIndex = '-1';
      }
    } finally {
      setIsExporting(false);
    }
  };



  return (
    <>
      <Button 
        onClick={exportToPDF}
        disabled={isExporting}
        variant={variant}
        size={size}
        className={className}
      >
        {isExporting ? (
          <>
            <FileText className="w-4 h-4 mr-2 animate-pulse" />
            Exporting...
          </>
        ) : (
          <>
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </>
        )}
      </Button>
      
      {/* Hidden fallback template for PDF export */}
      {cvData && (
        <div 
          ref={fallbackRef}
          style={{ 
            position: 'fixed', 
            top: '-9999px', 
            left: '-9999px', 
            width: 'auto',
            height: 'auto',
            backgroundColor: '#ffffff',
            zIndex: -1,
            visibility: 'hidden',
            opacity: '0',
            minWidth: '850px',
            maxWidth: 'none',
            overflow: 'visible',
            transform: 'none',
            margin: '0',
            padding: '0'
          }}
          aria-hidden="true"
          className="pdf-export-fallback"
        >
          <CVTemplatePDF data={cvData} />
        </div>
      )}
    </>
  );
}