import { Badge } from "@/app/components/ui/badge";
import { Download, FileArchive, FileText, Image as ImageIcon } from "lucide-react";

export default function OrderDataField({
  label,
  value,
  highlight = false,
  color = "",
}) {
  // 1. Check if the value is a File Object (e.g., from a fresh local file upload state)
  const isFileObject = value instanceof File;
  
  // Extract filename or URL string
  const fileSource = isFileObject ? value.name : typeof value === "string" ? value : "";

  // 2. Identify File Type Extensions
  const isImage = /\.(jpeg|jpg|gif|png|webp|svg|bmp|tiff)(\?.*)?$/i.test(fileSource);
  const isPdf = /\.(pdf)(\?.*)?$/i.test(fileSource);
  const isArchive = /\.(zip|rar|7z|tar|gz)(\?.*)?$/i.test(fileSource);
  const isFileAttachment = fileSource && (isImage || isPdf || isArchive || /\.[a-z0-9]+$/i.test(fileSource));

  // Helper to trigger download actions or open links safely
  const handleAttachmentView = () => {
    if (isFileObject) {
      const localUrl = URL.createObjectURL(value);
      window.open(localUrl, "_blank");
    } else {
      window.open(value, "_blank");
    }
  };

  return (
    <div className="flex flex-col">
      <span className="text-[9px] uppercase text-muted-foreground font-black tracking-tighter">
        {label}
      </span>

      {isFileAttachment ? (
        <div className="mt-1">
          {isImage ? (
            /* --- 1. Image Asset Render --- */
            <div className="group relative w-fit rounded-md overflow-hidden border bg-muted shadow-sm">
              <img
                src={isFileObject ? URL.createObjectURL(value) : value}
                alt={label}
                className="h-10 w-14 object-cover transition-transform duration-200 group-hover:scale-110 cursor-pointer"
                onClick={handleAttachmentView}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.parentElement.innerHTML = '<span class="text-[10px] p-1 text-destructive">Error</span>';
                }}
              />
            </div>
          ) : (
            /* --- 2. Document/File Asset Render --- */
            <button
              type="button"
              onClick={handleAttachmentView}
              className="flex items-center gap-1.5 h-6 px-2 text-[10px] font-medium border rounded-md bg-secondary/50 hover:bg-secondary text-secondary-foreground transition-all max-w-[180px] truncate group shadow-xs"
              title={isFileObject ? value.name : "Click to view file"}
            >
              {isPdf ? (
                <FileText className="h-3 w-3 text-rose-500 shrink-0" />
              ) : isArchive ? (
                <FileArchive className="h-3 w-3 text-amber-500 shrink-0" />
              ) : (
                <ImageIcon className="h-3 w-3 text-blue-500 shrink-0" />
              )}
              <span className="truncate max-w-[110px]">
                {isFileObject ? value.name : fileSource.split("/").pop()}
              </span>
              <Download className="h-2.5 w-2.5 ml-auto opacity-40 group-hover:opacity-100 transition-opacity shrink-0" />
            </button>
          )}
        </div>
      ) : highlight ? (
        /* --- 3. Highlight Badge Render --- */
        <Badge
          variant="secondary"
          className="w-fit h-5 px-1.5 text-[10px] mt-1 font-bold bg-primary/10 text-primary border-none"
        >
          {value || "N/A"}
        </Badge>
      ) : (
        /* --- 4. Standard Text Field Render --- */
        <span className={`text-xs font-semibold mt-0.5 ${color}`}>
          {value || "N/A"}
        </span>
      )}
    </div>
  );
}