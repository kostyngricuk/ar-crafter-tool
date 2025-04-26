import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { ImageIcon, Loader2, X } from "lucide-react";

interface ImageUploadFormProps {
  imageFiles: File[];
  isLoading: boolean;
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (index: number) => void;
  onImageClick: (file: File) => void;
  onGenerate: () => void;
  className?: string;
}

export function ImageUploadForm({
  imageFiles,
  isLoading,
  onUpload,
  onRemove,
  onImageClick,
  onGenerate,
  className
}: ImageUploadFormProps) {
  const isDisabledGenerate = imageFiles ? imageFiles.length < 2 || isLoading : true;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Upload Images</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            type="file"
            multiple
            accept="image/*"
            onChange={onUpload}
            disabled={isLoading}
            id="imageUpload"
            className="hidden"
          />
          <label
            htmlFor="imageUpload"
            className="flex items-center justify-center w-full h-12 bg-secondary text-secondary-foreground rounded-md cursor-pointer hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            <span>
              {imageFiles && imageFiles.length > 0
                ? `Uploaded ${imageFiles.length} images`
                : "Upload 2-3 Images"}
            </span>
          </label>
          <div className="flex mt-2 space-x-2">
            {imageFiles?.map((file, index) => (
              <div
                key={file.name}
                className="relative w-24 h-24 rounded-md overflow-hidden cursor-pointer"
              >
                {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Uploaded file: ${file.name}`}
                  className="absolute inset-0 object-cover w-full h-full"
                  onClick={() => onImageClick(file)}
                />
                <Button
                  onClick={() => onRemove(index)}
                  className="absolute top-1 right-1 p-1 hover:bg-destructive/20 rounded-sm text-destructive hover:text-destructive-foreground/90"
                  size="icon"
                  variant="ghost"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={onGenerate}
            disabled={isDisabledGenerate}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
