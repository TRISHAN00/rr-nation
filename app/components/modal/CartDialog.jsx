"use client";

import { Button } from "@/app/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/app/components/ui/dialog";

export default function CartDialog({ isOpen, onOpenChange, cartItems, onRemove }) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {/* Increase max-width to xl and add extra padding */}
      <DialogContent className="max-w-xl p-6">
        <DialogHeader>
          <DialogTitle>Cart Items</DialogTitle>
          <DialogDescription>
            Review your selected tickets before checkout
          </DialogDescription>
          <DialogClose />
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center">No items in cart</p>
          ) : (
            <ul className="space-y-3 max-h-96 overflow-y-auto">
              {cartItems.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-start bg-gray-50 p-4 rounded shadow-sm"
                >
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    {item.email && <p className="text-sm text-gray-500">{item.email}</p>}
                    <p className="text-sm text-gray-500">{item.phone}</p>
                    {item.age && <p className="text-sm text-gray-500">Age: {item.age}</p>}
                    {item.bloodGroup && (
                      <p className="text-sm text-gray-500">Blood Group: {item.bloodGroup}</p>
                    )}
                    <p className="text-sm text-gray-500">Gender: {item.gender}</p>
                    {item.dob && <p className="text-sm text-gray-500">DOB: {item.dob}</p>}
                  </div>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onRemove(index)}
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <DialogFooter className="flex justify-between mt-6">
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Close
          </Button>

          {cartItems.length > 0 && (
            <Button onClick={() => alert("Proceed to Checkout")}>
              Checkout ({cartItems.length})
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
