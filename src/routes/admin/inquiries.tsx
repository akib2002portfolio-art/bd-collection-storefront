import { createFileRoute } from "@tanstack/react-router";

import {
  InquiriesPage,
} from "../../features/admin/inquiries";

export const Route = createFileRoute("/admin/inquiries")({
  component: InquiriesPage,
});