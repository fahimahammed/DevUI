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
  maxSize?: number // bytes
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
  error?: string | null
}

// --- Helper Components ---
const StatusIcon = ({ status }: { status: FileItem["status"] }) => {
  switch (status) {
    case "success":
      return <span className="text-green-500">✔️</span>
    case "error":
      return <span className="text-red-500">❌</span>
    case "uploading":
      return <span className="text-blue-500 animate-spin">⏳</span>
    default:
      return <span className="text-gray-400">📄</span>
  }
}

const FileItemRow = ({
  fileItem,
  removeFile,
  showProgress,
}: {
  fileItem: FileItem
  removeFile: (id: string) => void
  showProgress?: boolean
}) => (
  <div className="space-y-1 p-3 border rounded-lg">
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <StatusIcon status={fileItem.status} />
        <div className="min-w-0 flex-1">
          <p className="text-sm truncate">{fileItem.file.name}</p>
          <p className="text-xs text-muted-foreground">
            {(fileItem.file.size / 1024).toFixed(2)} KB
            {fileItem.error && <span className="text-red-500 ml-2">{fileItem.error}</span>}
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
        ✖️
      </Button>
    </div>
    {showProgress && fileItem.status === "uploading" && (
      <Progress value={fileItem.progress} className="h-2" />
    )}
  </div>
)

// --- Main Component ---
const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      className,
      onFileSelect,
      onFileUpload,
      accept = "*/*",
      multiple = false,
      maxSize = 10 * 1024 * 1024,
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
      if (file.size > maxSize) return `File size exceeds ${formatFileSize(maxSize)}`
      if (accept !== "*/*" && !accept.split(",").includes(`.${file.name.split(".").pop()}`))
        return "Invalid file type"
      return null
    }

    const handleFileSelect = (selectedFiles: FileList | null) => {
      if (!selectedFiles || disabled) return
      const newFiles: FileItem[] = Array.from(selectedFiles).map((file) => ({
        file,
        id: generateId(),
        progress: 0,
        status: validateFile(file) ? "error" : "pending",
        error: validateFile(file),
      }))

      if (files.length + newFiles.length > maxFiles) {
        alert(`Maximum ${maxFiles} files allowed`)
        return
      }

      const updatedFiles = multiple ? [...files, ...newFiles] : newFiles
      setFiles(updatedFiles)
      onFileSelect?.(updatedFiles.map((f) => f.file))
    }

    const handleUpload = async () => {
      if (!onFileUpload || isUploading) return
      setIsUploading(true)
      const pendingFiles = files.filter((f) => f.status === "pending")

      try {
        for (const fileItem of pendingFiles) {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === fileItem.id ? { ...f, status: "uploading", progress: 0 } : f
            )
          )
          for (let progress = 0; progress <= 100; progress += 20) {
            await new Promise((r) => setTimeout(r, 100))
            setFiles((prev) =>
              prev.map((f) => (f.id === fileItem.id ? { ...f, progress } : f))
            )
          }
          setFiles((prev) =>
            prev.map((f) =>
              f.id === fileItem.id ? { ...f, status: "success", progress: 100 } : f
            )
          )
        }
        await onFileUpload(pendingFiles.map((f) => f.file))
      } catch {
        setFiles((prev) =>
          prev.map((f) =>
            pendingFiles.some((p) => p.id === f.id)
              ? { ...f, status: "error", error: "Upload failed" }
              : f
          )
        )
      } finally {
        setIsUploading(false)
      }
    }

    const removeFile = (id: string) => setFiles((prev) => prev.filter((f) => f.id !== id))
    const clearAll = () => {
      setFiles([])
      if (fileInputRef.current) fileInputRef.current.value = ""
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
      if (!disabled) handleFileSelect(e.dataTransfer.files)
    }
    const handleClick = () => !disabled && fileInputRef.current?.click()

    const dropzoneClasses = cn(
      "relative w-full rounded-lg border-2 border-dashed transition-all duration-200",
      isDragOver && "border-primary bg-primary/5",
      disabled && "opacity-50 cursor-not-allowed",
      variant === "compact" && "p-4",
      variant === "default" && "p-8",
      variant === "dropzone" && "p-12 min-h-[200px] flex flex-col items-center justify-center",
      "hover:border-primary/50 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20",
      className
    )

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
          <div className="text-center space-y-2">
            <p className="text-sm font-medium">{isDragOver ? "Drop files here" : "Click or drag files to upload"}</p>
            <p className="text-xs text-muted-foreground">
              {accept === "*/*" ? "Any file type" : accept} up to {formatFileSize(maxSize)}
              {multiple && ` (max ${maxFiles} files)`}
            </p>
            {children && <div className="mt-2">{children}</div>}
          </div>
        </div>

        {files.length > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-medium">Selected Files ({files.length})</h4>
              <div className="flex gap-2">
                {onFileUpload && files.some((f) => f.status === "pending") && (
                  <Button type="button" size="sm" onClick={handleUpload} disabled={isUploading} loading={isUploading}>
                    Upload
                  </Button>
                )}
                <Button type="button" variant="outline" size="sm" onClick={clearAll} disabled={isUploading}>
                  Clear
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              {files.map((fileItem) => (
                <FileItemRow key={fileItem.id} fileItem={fileItem} removeFile={removeFile} showProgress={showProgress} />
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
