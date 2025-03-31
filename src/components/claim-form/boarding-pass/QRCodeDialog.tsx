
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";

interface QRCodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  qrCodeUrl: string;
}

const QRCodeDialog = ({ open, onOpenChange, qrCodeUrl }: QRCodeDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Scan QR Code with your phone</DialogTitle>
          <DialogDescription>
            Use your phone's camera to scan this QR code and continue the boarding pass upload on your mobile device.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center p-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrCodeUrl)}`}
              alt="QR Code for mobile upload"
              width="200"
              height="200"
              className="mx-auto"
            />
          </div>
          <p className="mt-4 text-center text-sm text-gray-500">
            This will open the boarding pass upload on your mobile device where you can take a photo directly.
          </p>
        </div>
        <div className="flex justify-end">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeDialog;
