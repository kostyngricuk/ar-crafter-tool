import { Button } from "@components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Download } from "lucide-react";
import { ModelViewer } from "./ModelViewer";

interface ModelPreviewCardProps {
  modelUrl: string;
  onDownload: () => void;
}

export function ModelPreviewCard({ modelUrl, onDownload }: ModelPreviewCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Model Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height: '300px' }}>
          <ModelViewer url={modelUrl} />
        </div>
        <div className="relative">
          <Button
            onClick={onDownload}
            className="absolute bottom-2 right-2 bg-success text-success-foreground hover:bg-success/90"
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
