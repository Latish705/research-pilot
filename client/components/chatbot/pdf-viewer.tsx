"use client";

import { useState, useEffect } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X, Download, Loader2 } from "lucide-react";
import React from "react";

interface PDFViewerProps {
  url: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export function PDFViewer({ url, title, isOpen, onClose }: PDFViewerProps) {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isOpen) {
      setPageNumber(1);
      setLoading(true);
    }
  }, [isOpen, url]);

  const handleDocumentLoadSuccess = (e: any) => {
    setNumPages(e.numPages);
    setLoading(false);
  };

  const previousPage = () => {
    if (pageNumber > 1) setPageNumber((prevPage) => prevPage - 1);
  };

  const nextPage = () => {
    if (pageNumber < numPages) setPageNumber((prevPage) => prevPage + 1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl w-[90vw] h-[90vh] p-0 flex flex-col">
        <DialogHeader className="p-4 border-b flex-shrink-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-medium truncate pr-4">
              {title}
            </DialogTitle>
            <div className="flex items-center gap-2">
              <a
                href={url}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
              >
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </a>
              <DialogClose asChild>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </DialogClose>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          {loading && (
            <div className="h-full flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          <Worker
            workerUrl={`https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js`}
          >
            <Viewer
              fileUrl={url}
              onDocumentLoad={handleDocumentLoadSuccess}
              initialPage={pageNumber - 1}
              defaultScale={1}
              // Viewer uses zero-based page indexing
              onPageChange={(e: any) => setPageNumber(e.currentPage + 1)}
              // onLoadError={(err) => {
              //   console.error(err);
              //   setLoading(false);
              // }}
            />
          </Worker>
        </div>

        {numPages > 0 && (
          <div className="p-4 border-t flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={previousPage}
              disabled={pageNumber <= 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>

            <p className="text-sm">
              Page {pageNumber} of {numPages}
            </p>

            <Button
              variant="outline"
              size="sm"
              onClick={nextPage}
              disabled={pageNumber >= numPages}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
