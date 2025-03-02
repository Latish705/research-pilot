// "use client";

// import { useState, useEffect } from "react";
// import { Document, Page, pdfjs } from "react-pdf";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogClose,
// } from "@/components/ui/dialog";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { ChevronLeft, ChevronRight, X, Download, Loader2 } from "lucide-react";

// // Set up the worker for PDF.js
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

// interface PDFViewerProps {
//   url: string;
//   title: string;
//   isOpen: boolean;
//   onClose: () => void;
// }

// export function PDFViewer({ url, title, isOpen, onClose }: PDFViewerProps) {
//   const [numPages, setNumPages] = useState<number | null>(null);
//   const [pageNumber, setPageNumber] = useState<number>(1);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (isOpen) {
//       setPageNumber(1);
//       setLoading(true);
//       setError(null);
//     }
//   }, [isOpen, url]);

//   function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
//     setNumPages(numPages);
//     setLoading(false);
//   }

//   function onDocumentLoadError(error: Error) {
//     console.error("Error loading PDF:", error);
//     setError(
//       "Failed to load PDF. Please try again or download the file directly."
//     );
//     setLoading(false);
//   }

//   function changePage(offset: number) {
//     setPageNumber((prevPageNumber) => {
//       const newPageNumber = prevPageNumber + offset;
//       return Math.max(1, Math.min(numPages || 1, newPageNumber));
//     });
//   }

//   function previousPage() {
//     changePage(-1);
//   }

//   function nextPage() {
//     changePage(1);
//   }

//   return (
//     <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
//       <DialogContent className="max-w-4xl w-[90vw] h-[90vh] p-0 flex flex-col">
//         <DialogHeader className="p-4 border-b flex-shrink-0">
//           <div className="flex items-center justify-between">
//             <DialogTitle className="text-lg font-medium truncate pr-4">
//               {title}
//             </DialogTitle>
//             <div className="flex items-center gap-2">
//               <a
//                 href={url}
//                 download
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex"
//               >
//                 <Button variant="outline" size="sm">
//                   <Download className="h-4 w-4 mr-1" />
//                   Download
//                 </Button>
//               </a>
//               <DialogClose asChild>
//                 <Button variant="ghost" size="sm" onClick={onClose}>
//                   <X className="h-4 w-4" />
//                 </Button>
//               </DialogClose>
//             </div>
//           </div>
//         </DialogHeader>

//         <div className="flex-1 overflow-hidden">
//           {loading && (
//             <div className="h-full flex items-center justify-center">
//               <div className="flex flex-col items-center gap-2">
//                 <Loader2 className="h-8 w-8 animate-spin text-primary" />
//                 <p className="text-sm text-muted-foreground">Loading PDF...</p>
//               </div>
//             </div>
//           )}

//           {error && (
//             <div className="h-full flex items-center justify-center">
//               <div className="text-center p-6 max-w-md">
//                 <p className="text-destructive mb-4">{error}</p>
//                 <a href={url} target="_blank" rel="noopener noreferrer">
//                   <Button>Open PDF in new tab</Button>
//                 </a>
//               </div>
//             </div>
//           )}

//           {!loading && !error && (
//             <ScrollArea className="h-full">
//               <div className="flex justify-center p-4">
//                 <Document
//                   file={url}
//                   onLoadSuccess={onDocumentLoadSuccess}
//                   onLoadError={onDocumentLoadError}
//                   loading={
//                     <div className="flex items-center justify-center h-[60vh]">
//                       <Loader2 className="h-8 w-8 animate-spin text-primary" />
//                     </div>
//                   }
//                 >
//                   <Page
//                     pageNumber={pageNumber}
//                     renderTextLayer={false}
//                     renderAnnotationLayer={false}
//                     className="shadow-lg"
//                     width={Math.min(window.innerWidth * 0.8, 800)}
//                   />
//                 </Document>
//               </div>
//             </ScrollArea>
//           )}
//         </div>

//         {numPages && numPages > 0 && (
//           <div className="p-4 border-t flex items-center justify-between">
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={previousPage}
//               disabled={pageNumber <= 1}
//             >
//               <ChevronLeft className="h-4 w-4 mr-1" />
//               Previous
//             </Button>

//             <p className="text-sm">
//               Page {pageNumber} of {numPages}
//             </p>

//             <Button
//               variant="outline"
//               size="sm"
//               onClick={nextPage}
//               disabled={pageNumber >= (numPages || 1)}
//             >
//               Next
//               <ChevronRight className="h-4 w-4 ml-1" />
//             </Button>
//           </div>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// }
