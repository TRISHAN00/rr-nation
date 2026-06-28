import { Switch } from "@/app/components/ui/switch";
import { Calendar, ChevronDown, ChevronUp, Clock, ExternalLink, Hash, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import DataSubmissionModal from "./DataSubmissionModal";

export default function EventListSection({ title, events, isPast }) {
  const [submitFor, setSubmitFor] = useState(null);
  const [expandedForm, setExpandedForm] = useState(null);
  const [submittingId, setSubmittingId] = useState(null);
  const [showSubmitForm, setShowSubmitForm] = useState({});

  const handleSubmissionComplete = (itemId) => {
    setSubmittingId(null);
    setSubmitFor(null);
  };

  const handleSubmissionStart = (item) => {
    setSubmittingId(item.id);
    setSubmitFor(item);
  };

  const toggleSubmissionMode = (itemId) => {
    setShowSubmitForm((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  if (events.length === 0) return null;
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-900 mb-4">{title}</h3>
      {events.map((item, index) => {
        const eventData = item.eventTicket.event;
        const formData = item.formData || [];
        const isExpanded = expandedForm === index;
        const hasSubmission = item.bib?.submissionLinks?.length > 0;
        const isVirtual = item.eventTicket?.event?.eventType === "virtual";
        const isSubmitting = submittingId === item.id;
        return (
          <div key={index} className={"p-3 sm:p-4 border rounded-lg mb-3 hover:bg-gray-50 transition " + (isPast ? "opacity-70" : "")}>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-2">
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm sm:text-base text-dark break-words">
                  {eventData.name} <span className="text-brand text-xs sm:text-sm ml-1 sm:ml-2">[{item.eventTicket.name}]</span>
                </h4>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-[11px] sm:text-xs text-gray-600">
                  <div className="flex items-center gap-1"><Calendar className="h-3 w-3 shrink-0" /> {new Date(eventData.date).toDateString()}</div>
                  <div className="flex items-center gap-1"><Clock className="h-3 w-3 shrink-0" /> {eventData.time}</div>
                </div>
              </div>
              <span className={"px-3 py-1 rounded text-[10px] font-bold uppercase self-start shrink-0 " + (isPast ? 'bg-gray-200' : 'bg-[#F39200] text-white')}>
                {item.paymentStatus}
              </span>
            </div>

            {formData.length > 0 && (
              <div className="mb-3">
                <button
                  onClick={() => setExpandedForm(isExpanded ? null : index)}
                  className="flex items-center gap-1 text-[11px] font-semibold text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                  Registration Data ({formData.length})
                </button>
                {isExpanded && (
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2 p-3 bg-gray-50 rounded-lg border">
                    {formData.map((field, fi) => (
                      <div key={fi} className="flex flex-col">
                        <span className="text-[9px] uppercase text-gray-500 font-semibold tracking-tighter">{field.label}</span>
                        <span className="text-xs font-medium text-gray-900 truncate">{field.value || "—"}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {item?.bib && (
              <div className="mb-3 p-3 bg-gray-50 rounded-lg border">
                <div className="flex items-center justify-between mb-2 gap-2">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                    <Hash className="h-3 w-3 shrink-0" /> BIB Info
                  </span>
                  <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase shrink-0 ${
                    item.bib.adminApproval === "approved" ? "bg-[#F39200]/10 text-[#F39200]" :
                    item.bib.adminApproval === "pending" ? "bg-gray-200 text-gray-600" :
                    "bg-red-100 text-red-600"
                  }`}>
                    {item.bib.adminApproval}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-x-4 gap-y-1.5 text-[11px] text-gray-600">
                  <span className="font-semibold text-gray-900 break-all">{item.bib.bibNumber}</span>
                  {item.bib.tracking && (
                    <span className="break-words">Tracking: {item.bib.tracking}</span>
                  )}
                  {item.bib.bibAttachment && (
                    <button
                      onClick={() => window.open(item.bib.bibAttachment, "_blank")}
                      className="text-[#F39200] hover:underline inline-flex items-center gap-0.5 w-fit"
                    >
                      <ExternalLink className="h-3 w-3 shrink-0" /> BIB File
                    </button>
                  )}
                  {item.bib.certificateDownloadLink && (
                    <button
                      onClick={() => window.open(item.bib.certificateDownloadLink, "_blank")}
                      className="text-[#F39200] hover:underline inline-flex items-center gap-0.5 w-fit"
                    >
                      <ExternalLink className="h-3 w-3 shrink-0" /> Certificate
                    </button>
                  )}
                </div>
                {item.bib.submissionLinks?.length > 0 && (
                  <div className="mt-2 pt-2 border-t flex flex-wrap gap-2">
                    {item.bib.submissionLinks.map((link, li) => (
                      <a
                        key={li}
                        href={link.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] text-[#F39200] hover:underline bg-gray-100 px-2 py-0.5 rounded truncate max-w-full"
                        title={link.title}
                      >
                        <ExternalLink className="h-2.5 w-2.5 shrink-0" />
                        <span className="truncate">{link.title}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-3 border-t gap-3 text-[11px]">
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-gray-500">
                <p>ORDER: <span className="text-dark font-medium break-all">{item.transactionId.substring(0, 12)}...</span></p>
                <p>AMOUNT: <span className="text-dark font-medium">৳{item.totalPrice}</span></p>
              </div>
              {isVirtual && (
                <div className="flex items-center gap-2 flex-wrap">
                  {hasSubmission ? (
                    <>
                      <span className={`text-[14px] font-semibold ${!showSubmitForm[item.id] ? "text-brand" : "text-gray-400"}`}>
                        Submitted
                      </span>
                      <Switch
                        checked={!!showSubmitForm[item.id]}
                        onCheckedChange={() => toggleSubmissionMode(item.id)}
                        size="sm"
                      />
                      <span className={`text-[14px] font-semibold ${showSubmitForm[item.id] ? "text-brand" : "text-gray-400"}`}>
                        Re-Submit
                      </span>
                      {showSubmitForm[item.id] && (
                        <button
                          onClick={() => !isSubmitting && handleSubmissionStart(item)}
                          disabled={isSubmitting}
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-semibold bg-brand/10 text-brand hover:bg-brand/20 transition-colors disabled:opacity-50"
                        >
                          <Upload className="h-3.5 w-3.5 shrink-0" />
                          {isSubmitting ? "Submitting..." : "Data Submission"}
                        </button>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => !isSubmitting && handleSubmissionStart(item)}
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-semibold bg-brand/10 text-brand hover:bg-brand/20 transition-colors w-full sm:w-auto disabled:opacity-50"
                    >
                      <Upload className="h-3.5 w-3.5 shrink-0" />
                      {isSubmitting ? "Submitting..." : "Data Submission"}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
      {submitFor && (
        <DataSubmissionModal
          open={!!submitFor}
          onClose={() => handleSubmissionComplete(submitFor.id)}
          onSuccess={() => {
            toast.success("Data submitted successfully");
            handleSubmissionComplete(submitFor.id);
          }}
          orderItem={submitFor}
        />
      )}
    </div>
  );
}