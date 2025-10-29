import React, { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UploadIcon, XIcon } from "lucide-react";

export default function FileUploadComponent() {
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const onDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFiles((prevFiles) => [
        ...prevFiles,
        ...Array.from(e.dataTransfer.files),
      ]);
    }
  }, []);

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFiles((prevFiles) => [...prevFiles, ...Array.from(e.target.files!)]);
    }
  }, []);

  const removeFile = useCallback((fileToRemove: File) => {
    setFiles((files) => files.filter((file) => file !== fileToRemove));
  }, []);

  return (
    <div className="mx-auto w-full">
      <div
        className={`relative rounded-lg border-2 border-muted-foreground p-4 ${
          dragActive ? "border-primary" : "border-gray-300"
        }`}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <Input
          type="file"
          multiple
          onChange={onFileChange}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          tabIndex={0}
          aria-label="File upload"
        />
        <div className="text-center">
          <UploadIcon className="text-gray-400 mx-auto h-12 w-12" />
          <p className="text-gray-600 mt-2 text-sm">
            Drag and drop files here, or click to select files
          </p>
        </div>
      </div>
      {files.length > 0 && (
        <div className="mt-4 space-y-4">
          {files.map((file, index) => (
            <Card key={index} className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 h-8 w-8"
                onClick={() => removeFile(file)}
                aria-label={`Remove ${file.name}`}
              >
                <XIcon className="h-4 w-4" />
              </Button>
              <CardContent className="pb-4 pt-8">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-100 rounded-full p-2">
                    <UploadIcon className="text-gray-500 h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-gray-900 truncate text-sm font-medium">
                      {file.name}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          <Button
            className="w-full"
            onClick={() => {
              // TODO:  Handle file upload here
            }}
          >
            Upload {files.length} {files.length === 1 ? "File" : "Files"}
          </Button>
        </div>
      )}
    </div>
  );
}
