"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal"; // shadcn modal

export default function CartModal({ isOpen, onClose, cartItems, onRemove }) {
  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent className="max-w-lg">
        <ModalHeader>
          <ModalTitle>Cart Items</ModalTitle>
        </ModalHeader>

        <ModalBody className="space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center">No items in cart</p>
          ) : (
            <ul className="space-y-3 max-h-80 overflow-y-auto">
              {cartItems.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-50 p-3 rounded shadow-sm"
                >
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.phone}</p>
                  </div>
                  <button
                    className="text-red-500 font-bold"
                    onClick={() => onRemove(index)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </ModalBody>

        <ModalFooter className="flex justify-between gap-2">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          {cartItems.length > 0 && (
            <Button onClick={() => alert("Proceed to Checkout")}>
              Checkout ({cartItems.length})
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
