import { createFileRoute } from "@tanstack/react-router";

import { InquiryDetailPage } from "../../../features/admin/inquiries/pages/InquiryDetailPage";

export const Route = createFileRoute("/admin/inquiry/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

  return <InquiryDetailPage id={id} />;
}
