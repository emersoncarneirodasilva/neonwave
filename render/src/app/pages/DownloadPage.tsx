import { DownloadTrackForm } from "../../components/downloads/DownloadTrackForm";
import { PageContainer } from "../../components/ui/PageContainer";
import { PageHeader } from "../../components/ui/PageHeader";

export function DownloadPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Download"
        subtitle="Baixe músicas do YouTube para sua biblioteca."
      />

      <div className="mt-6">
        <DownloadTrackForm />
      </div>
    </PageContainer>
  );
}
