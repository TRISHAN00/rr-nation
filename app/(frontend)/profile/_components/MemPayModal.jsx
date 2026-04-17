import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/app/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ApplyCouponMember from "./ApplyCouponMember";

export default function MemPayModal({ open, setOpen, baseFee }) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Complete Your Payment</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Fee */}
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Registration Fee</span>
                        <span className="font-semibold">৳{baseFee}</span>
                    </div>

                    {/* Coupon */}
                    <ApplyCouponMember />

                    {/* Total */}
                    <div className="flex justify-between text-base font-semibold border-t pt-3">
                        <span>Total</span>
                        <span>৳{baseFee}</span>
                    </div>

                    {/* Pay */}
                    <Button className="w-full">
                        Pay Now
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
