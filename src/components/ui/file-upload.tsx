"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Progress } from "./progress"

interface FileUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  onFileSelect?: (files: File[]) => void
  onFileUpload?: (files: File[]) => Promise<void>
  accept?: string
  multiple?: boolean
  maxSize?: number // in bytes
  maxFiles?: number
  disabled?: boolean
  showProgress?: boolean
  variant?: "default" | "compact" | "dropzone"
}

interface FileItem {
  file: File
  id: string
  progress: number
  status: "pending" | "uploading" | "success" | "error"
  error?: string
}

const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      className,
      onFileSelect,
      onFileUpload,
      accept = "*/*",
      multiple = false,
      maxSize = 10 * 1024 * 1024, // 10MB default
      maxFiles = multiple ? 5 : 1,
      disabled = false,
      showProgress = true,
      variant = "default",
      children,
      ...props
    },
    ref
  ) => {
    const [files, setFiles] = React.useState<FileItem[]>([])
    const [isDragOver, setIsDragOver] = React.useState(false)
    const [isUploading, setIsUploading] = React.useState(false)
    const fileInputRef = React.useRef<HTMLInputElement>(null)

    const generateId = () => Math.random().toString(36).substr(2, 9)

    const formatFileSize = (bytes: number) => {
      if (bytes === 0) return "0 Bytes"
      const k = 1024
      const sizes = ["Bytes", "KB", "MB", "GB"]
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    }

    const validateFile = (file: File): string | null => {
      if (file.size > maxSize) {
        return `File size exceeds ${formatFileSize(maxSize)}`
      }
      return null
    }

    const handleFileSelect = (selectedFiles: FileList | null) => {
      if (!selectedFiles || disabled) return

      const newFiles: FileItem[] = []
      const fileArray = Array.from(selectedFiles)

      // Check max files limit
      if (files.length + fileArray.length > maxFiles) {
        alert(`Maximum ${maxFiles} files allowed`)
        return
      }

      fileArray.forEach((file) => {
        const error = validateFile(file)
        newFiles.push({
          file,
          id: generateId(),
          progress: 0,
          status: error ? "error" : "pending",
          error,
        })
      })

      const updatedFiles = multiple ? [...files, ...newFiles] : newFiles
      setFiles(updatedFiles)
      onFileSelect?.(updatedFiles.map((f) => f.file))
    }

    const handleUpload = async () => {
      if (!onFileUpload || isUploading) return

      setIsUploading(true)
      const filesToUpload = files.filter((f) => f.status === "pending")

      try {
        // Simulate upload progress for each file
        for (const fileItem of filesToUpload) {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === fileItem.id ? { ...f, status: "uploading", progress: 0 } : f
            )
          )

          // Simulate progress updates
          for (let progress = 0; progress <= 100; progress += 10) {
            await new Promise((resolve) => setTimeout(resolve, 100))
            setFiles((prev) =>
              prev.map((f) =>
                f.id === fileItem.id ? { ...f, progress } : f
              )
            )
          }

          setFiles((prev) =>
            prev.map((f) =>
              f.id === fileItem.id ? { ...f, status: "success", progress: 100 } : f
            )
          )
        }

        // Call the actual upload function
        await onFileUpload(filesToUpload.map((f) => f.file))
      } catch (error) {
        setFiles((prev) =>
          prev.map((f) =>
            filesToUpload.some((upload) => upload.id === f.id)
              ? { ...f, status: "error", error: "Upload failed" }
              : f
          )
        )
      } finally {
        setIsUploading(false)
      }
    }

    const removeFile = (id: string) => {
      setFiles((prev) => prev.filter((f) => f.id !== id))
    }

    const clearAll = () => {
      setFiles([])
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault()
      if (!disabled) setIsDragOver(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
    }

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      if (!disabled) {
        handleFileSelect(e.dataTransfer.files)
      }
    }

    const handleClick = () => {
      if (!disabled) {
        fileInputRef.current?.click()
      }
    }

    const getStatusIcon = (status: FileItem["status"]) => {
      switch (status) {
        case "success":
          return (
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )
        case "error":
          return (
            <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          )
        case "uploading":
          return (
            <svg className="w-4 h-4 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
          )
        default:
          return (
            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd" />
            </svg>
          )
      }
    }

    const dropzoneClasses = cn(
      "relative w-full rounded-lg border-2 border-dashed transition-all duration-200",
      "hover:border-primary/50 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20",
      isDragOver && "border-primary bg-primary/5",
      disabled && "opacity-50 cursor-not-allowed",
      variant === "compact" && "p-4",
      variant === "default" && "p-8",
      variant === "dropzone" && "p-12 min-h-[200px] flex flex-col items-center justify-center",
      className
    )

    if (variant === "compact") {
      return (
        <div ref={ref} className={cn("space-y-4", className)} {...props}>
          <div className="flex items-center gap-4">
            <input
              ref={fileInputRef}
              type="file"
              accept={accept}
              multiple={multiple}
              onChange={(e) => handleFileSelect(e.target.files)}
              className="hidden"
              disabled={disabled}
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleClick}
              disabled={disabled}
              className="shrink-0"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Choose Files
            </Button>
            <span className="text-sm text-muted-foreground">
              {files.length === 0 ? "No files selected" : `${files.length} file(s) selected`}
            </span>
          </div>
          
          {files.length > 0 && (
            <div className="space-y-2">
              {files.map((fileItem) => (
                <div key={fileItem.id} className="flex items-center justify-between p-2 bg-muted rounded-md">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    {getStatusIcon(fileItem.status)}
                    <span className="text-sm truncate">{fileItem.file.name}</span>
                    <span className="text-xs text-muted-foreground">({formatFileSize(fileItem.file.size)})</span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(fileItem.id)}
                    className="h-6 w-6 p-0"
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      )
    }

    return (
      <div ref={ref} className={cn("space-y-4", className)} {...props}>
        <div
          className={dropzoneClasses}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={(e) => handleFileSelect(e.target.files)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={disabled}
          />
          
          <div className="text-center space-y-4">
            <div className="mx-auto w-12 h-12 text-muted-foreground">
              <svg fill="none" stroke="currentColor" viewBox="0 0 48 48" aria-hidden="true">
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">
                {isDragOver ? "Drop files here" : "Click to upload or drag and drop"}
              </p>
              <p className="text-xs text-muted-foreground">
                {accept === "*/*" ? "Any file type" : accept} up to {formatFileSize(maxSize)}
                {multiple && ` (max ${maxFiles} files)`}
              </p>
            </div>
            
            {children && <div className="mt-4">{children}</div>}
          </div>
        </div>

        {files.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Selected Files ({files.length})</h4>
              <div className="flex gap-2">
                {onFileUpload && files.some((f) => f.status === "pending") && (
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleUpload}
                    disabled={isUploading}
                    loading={isUploading}
                  >
                    Upload Files
                  </Button>
                )}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={clearAll}
                  disabled={isUploading}
                >
                  Clear All
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {files.map((fileItem) => (
                <div key={fileItem.id} className="space-y-2 p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {getStatusIcon(fileItem.status)}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">{fileItem.file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(fileItem.file.size)}
                          {fileItem.error && (
                            <span className="text-red-500 ml-2">{fileItem.error}</span>
                          )}
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(fileItem.id)}
                      disabled={fileItem.status === "uploading"}
                      className="h-8 w-8 p-0"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Button>
                  </div>
                  
                  {showProgress && fileItem.status === "uploading" && (
                    <Progress value={fileItem.progress} className="h-2" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
)

FileUpload.displayName = "FileUpload"

export { FileUpload, type FileUploadProps }