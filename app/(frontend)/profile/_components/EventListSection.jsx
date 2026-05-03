import { Calendar, Clock } from "lucide-react";

export default function EventListSection({ title, events, isPast }) {
  if (events.length === 0) return null;
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-900 mb-4">{title}</h3>
      {events.map((item, index) => {
        const eventData = item.eventTicket.event;
        return (
          <div key={index} className={"p-4 border rounded-lg mb-3 hover:bg-gray-50 transition " + (isPast ? "opacity-70" : "")}>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-2">
              <div className="flex-1">
                <h4 className="font-bold text-base text-dark">
                  {eventData.name} <span className="text-brand text-sm ml-2">[{item.eventTicket.name}]</span>
                </h4>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-gray-600">
                  <div className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(eventData.date).toDateString()}</div>
                  <div className="flex items-center gap-1"><Clock className="h-3 w-3" /> {eventData.time}</div>
                </div>
              </div>
              <span className={"px-3 py-1 rounded text-[10px] font-bold uppercase self-start " + (isPast ? 'bg-gray-200' : 'bg-[#F39200] text-white')}>
                {item.paymentStatus}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-3 border-t gap-3 text-[11px]">
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-gray-500">
                <p>ORDER: <span className="text-dark font-medium">{item.transactionId.substring(0, 12)}...</span></p>
                <p>AMOUNT: <span className="text-dark font-medium">৳{item.totalPrice}</span></p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}