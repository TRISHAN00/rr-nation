"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import { CreditCard, Ticket, User } from "lucide-react";
import BIBInput from "./BIBInput";
import OrderDataField from "./OrderDataField";

export default function OrderSheet({ selectedReg, setTotalPages }) {
  return (
    <div className="p-6 space-y-8">
      {/* Section 1: Buyer Information (The Account Holder) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-primary">
          <User className="h-4 w-4" />
          <h4 className="text-xs font-bold uppercase tracking-widest">
            User Information
          </h4>
        </div>
        <div className="grid gap-3 p-4 rounded-xl border border-border bg-muted/30">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-muted-foreground font-bold">
              Account Name
            </span>
            <span className="text-sm font-semibold">
              {selectedReg?.user?.firstName} {selectedReg?.user?.lastName}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-muted-foreground font-bold">
                Email
              </span>
              <span className="text-sm truncate">
                {selectedReg?.user?.email || "N/A"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-muted-foreground font-bold">
                Phone
              </span>
              <span className="text-sm">
                {selectedReg?.user?.phone || "N/A"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-muted-foreground font-bold">
                Address
              </span>
              <span className="text-sm">
                {selectedReg?.user?.address || "N/A"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-muted-foreground font-bold">
                Gender
              </span>
              <span className="text-sm">
                {selectedReg?.user?.gender || "N/A"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Participants (The Core Data) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-primary">
          <Ticket className="h-4 w-4" />
          <h4 className="text-xs font-bold uppercase tracking-widest">
            Participants ({selectedReg?.order?.items?.length})
          </h4>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {selectedReg?.order?.items.map((item, idx) => {
            return (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className="border border-border rounded-xl px-4 bg-background shadow-sm overflow-hidden"
              >
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center gap-3 text-left">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      {item?.participant?.name?.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold">
                        {item?.participant?.name}
                      </span>
                      <span className="text-[11px] text-muted-foreground font-medium">
                        {item?.eventTicket?.name}

                        {item?.participant?.distanceCategory && (
                          <> • {item.participant.distanceCategory}KM</>
                        )}
                      </span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="border-t border-border/50 pt-4 pb-4">
                  <BIBInput item={item} />
                  <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                    {
                      selectedReg?.order?.items?.map((item) =>
                        item?.formData?.map((field, index) => (
                          <OrderDataField
                            key={`${item.id}-${index}`}
                            label={field.label}
                            value={field.value}
                          />
                        ))
                      )
                    }
                    {/* Key Stats */}
                    {
                      item.participant?.tshirtSize && <OrderDataField
                        label="T-Shirt Size"
                        value={item.participant?.tshirtSize}
                        highlight
                      />
                    }

                    {
                      item.participant?.bloodGroup && <OrderDataField
                        label="Blood Group"
                        value={item.participant?.bloodGroup}
                        color="text-destructive"
                      />
                    }

                    {
                      item.participant?.distanceCategory && <OrderDataField
                        label="Distance"
                        value={item.participant?.distanceCategory}
                      />
                    }

                    {
                      item.participant?.runnerCategory && <OrderDataField
                        label="Runner Cat."
                        value={item.participant?.runnerCategory}
                      />
                    }

                    {
                      item.participant?.ageCategory && <OrderDataField
                        label="Age Category"
                        value={item.participant?.ageCategory}
                      />
                    }

                    {
                      item.participant?.dateOfBirth && <OrderDataField
                        label="DOB"
                        value={item.participant?.dateOfBirth}
                      />
                    }

                    {
                      item.participant?.emergencyContactNumber && <OrderDataField
                        label="Emergency Contact"
                        value={item.participant?.emergencyContactNumber}
                      />
                    }
                    {
                      item.participant?.communityName && <OrderDataField
                        label="Community"
                        value={item.participant?.communityName}
                      />
                    }

                    {
                      item.participant?.participatedEventNumbers !== undefined && <OrderDataField
                        label="Past Events"
                        value={item.participant?.participatedEventNumbers}
                      />
                    }

                    {
                      item.participant?.cycleBrandName && <OrderDataField
                        label="Cycle Brand"
                        value={item.participant?.cycleBrandName}
                      />
                    }

                    {
                      item.participant?.cycleFrameSize && <OrderDataField
                        label="Frame Size"
                        value={item.participant?.cycleFrameSize}
                      />
                    }

                    {
                      item.participant?.deliveryAddress && <OrderDataField
                        label="Delivery Address"
                        value={item.participant?.deliveryAddress}
                      />
                    }
                    {
                      item.participant?.district && <OrderDataField
                        label="District"
                        value={item.participant?.district}
                      />
                    }


                    {/* Contact Info */}
                    <div className="col-span-2 grid grid-cols-2 gap-4 border-t border-b border-border/30 py-3 my-1">
                      {
                        item.participant?.email && <OrderDataField
                          label="Email"
                          value={item.participant?.email}
                        />
                      }
                      {
                        item.participant?.contactNumber && <OrderDataField
                          label="Phone"
                          value={item.participant?.contactNumber}
                        />
                      }

                    </div>

                    {/* Affiliation */}
                    <div className="col-span-2">
                      <OrderDataField
                        label="Community"
                        value={item.participant?.communityName || "Individual"}
                      />
                    </div>

                    {/* Cycle Info (Conditional Rendering) */}
                    {(item.participant?.cycleBrandName ||
                      item.participant?.cycleFrameSize) && (
                        <div className="col-span-2 grid grid-cols-2 gap-4 bg-muted/30 p-2 rounded">
                          <OrderDataField
                            label="Cycle Brand"
                            value={item.participant?.cycleBrandName}
                          />
                          <OrderDataField
                            label="Frame Size"
                            value={item.participant?.cycleFrameSize}
                          />
                        </div>
                      )}

                    {/* Location Info */}
                    {/* <div className="col-span-2">
                    <OrderDataField
                      label="Delivery Address"
                      value={
                        item.participant?.deliveryAddress ||
                        item.participant?.district ||
                        "No address provided"
                      }
                    />
                  </div> */}

                    {/* Emergency Contact Section */}
                    <div className="col-span-2 mt-2 p-3 bg-amber-50 rounded-lg border border-amber-100 flex justify-between items-center">
                      <div>
                        <p className="text-[9px] font-bold text-amber-700 uppercase tracking-tighter">
                          Emergency Contact (
                          {item.participant?.emergencyContactName || "Guardian"})
                        </p>
                        <p className="text-xs font-bold text-amber-900">
                          {item.participant?.emergencyContactNumber}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] font-bold text-amber-700 uppercase tracking-tighter">
                          Past Events
                        </p>
                        <p className="text-xs font-bold text-amber-900">
                          {item.participant?.participatedEventNumbers || "0"}
                        </p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </section>

      {/* Section 3: Payment & Transaction */}
      <section className="pt-6 border-t border-border">
        <div className="flex items-center gap-2 text-primary mb-4">
          <CreditCard className="h-4 w-4" />
          <h4 className="text-xs font-bold uppercase tracking-widest">
            Payment Summary
          </h4>
        </div>

        <div className="space-y-3 bg-muted/20 p-4 rounded-xl border border-border">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Gateway</span>
            <span className="font-bold uppercase">
              {selectedReg?.paymentGateway}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Date</span>
            <span className="font-medium">
              {new Date(selectedReg?.paymentDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="space-y-1.5 pt-2">
            <span className="text-[10px] font-bold text-muted-foreground uppercase">
              Transaction ID
            </span>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-background p-2 rounded border border-border text-[10px] font-mono truncate">
                {selectedReg?.transactionId}
              </code>
            </div>
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-border/50">
            <span className="text-base font-bold">Total Paid</span>
            <span className="text-2xl font-black text-primary">
              ৳{Math.ceil(selectedReg?.afterDiscountAmount).toLocaleString()}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
