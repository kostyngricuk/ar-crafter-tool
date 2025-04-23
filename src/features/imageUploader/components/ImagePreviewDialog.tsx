import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";

interface ImagePreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageUrl: string | null;
}

export function ImagePreviewDialog({
  open,
  onOpenChange,
  imageUrl
}: ImagePreviewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Image Preview</DialogTitle>
          <DialogDescription>Full size preview of uploaded image.</DialogDescription>
        </DialogHeader>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Full Size Preview"
            className="w-full rounded-md"
          />
        )}
        <DialogFooter>
          <Button type="button" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
