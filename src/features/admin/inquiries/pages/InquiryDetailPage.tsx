import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  Archive,
  Calendar,
  Check,
  ImageOff,
  Mail,
  Package,
  Phone,
  Trash2,
  User,
} from "lucide-react";
import type { ReactNode } from "react";

import { inquiryService } from "../../../contact/services";
import type { Inquiry } from "../../../contact/types";
import { AdminLayout } from "../../shared";
import { InquiryStatusBadge } from "../components";

interface InquiryDetailPageProps {
  id: string;
}

export function InquiryDetailPage({ id }: InquiryDetailPageProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: inquiry, isLoading } = useQuery<Inquiry | null>({
    queryKey: ["contact-inquiries", id],
    queryFn: async () => {
      const inquiries = await inquiryService.getInquiries();
      return inquiries.find((item) => item.id === id) ?? null;
    },
  });

  const markReadMutation = useMutation({
    mutationFn: async () => {
      if (!inquiry) return;
      await inquiryService.updateStatus({ id: inquiry.id, status: "read" });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["contact-inquiries"] });
      navigate({ to: "/admin/inquiries" });
    },
  });

  const archiveMutation = useMutation({
    mutationFn: async () => {
      if (!inquiry) return;
      await inquiryService.updateStatus({ id: inquiry.id, status: "archived" });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["contact-inquiries"] });
      navigate({ to: "/admin/inquiries" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (!inquiry) return;
      await inquiryService.deleteInquiry(inquiry.id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["contact-inquiries"] });
      navigate({ to: "/admin/inquiries" });
    },
  });

  if (isLoading) {
    return (
      <AdminLayout title="Inquiry Details" subtitle="Loading inquiry details.">
        <div className="rounded-xl border border-hairline bg-canvas p-10 text-center text-taupe">
          Loading inquiry...
        </div>
      </AdminLayout>
    );
  }

  if (!inquiry) {
    return (
      <AdminLayout title="Inquiry Details" subtitle="The requested inquiry could not be found.">
        <div className="rounded-xl border border-hairline bg-canvas p-10 text-center text-taupe">
          Inquiry not found.
        </div>
      </AdminLayout>
    );
  }

  async function handleChangeStatus(status: "read" | "archived") {
    if (status === "read") {
      await markReadMutation.mutateAsync();
      return;
    }

    await archiveMutation.mutateAsync();
  }

  async function handleDelete() {
    await deleteMutation.mutateAsync();
  }

  return (
    <AdminLayout title="Inquiry Details" subtitle="Review the customer message and linked product.">
      <div className="grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-hairline bg-canvas p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-taupe">
                  Subject
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-ink">
                  {inquiry.subject || "Untitled inquiry"}
                </h2>
              </div>
              <InquiryStatusBadge status={inquiry.status} />
            </div>

            <div className="mt-6 rounded-xl border border-hairline bg-white p-5">
              <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-taupe">
                Message
              </h3>
              <div className="mt-3 whitespace-pre-wrap text-sm leading-7 text-ink">
                {inquiry.message}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {inquiry.status === "unread" && (
              <button
                type="button"
                onClick={() => void handleChangeStatus("read")}
                disabled={markReadMutation.isPending}
                className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-3 font-medium text-canvas transition hover:bg-sienna disabled:opacity-50"
              >
                <Check size={18} />
                Mark as Read
              </button>
            )}

            {inquiry.status !== "archived" && (
              <button
                type="button"
                onClick={() => void handleChangeStatus("archived")}
                disabled={archiveMutation.isPending || inquiry.status === "read"}
                className="inline-flex items-center gap-2 rounded-xl border border-hairline bg-white px-4 py-3 font-medium text-ink transition hover:bg-bone disabled:opacity-50"
              >
                <Archive size={18} />
                Archive
              </button>
            )}

            <button
              type="button"
              onClick={() => void handleDelete()}
              disabled={deleteMutation.isPending}
              className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-medium text-red-600 transition hover:bg-red-100 disabled:opacity-50"
            >
              <Trash2 size={18} />
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-hairline bg-white p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-bone p-2 text-ink">
                <User size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-taupe">
                  Customer
                </p>
                <p className="mt-1 text-lg font-semibold text-ink">{inquiry.name}</p>
                <p className="mt-2 flex items-center gap-2 text-sm text-taupe">
                  <Mail size={15} />
                  {inquiry.email}
                </p>
                {inquiry.phone ? (
                  <p className="mt-2 flex items-center gap-2 text-sm text-taupe">
                    <Phone size={15} />
                    {inquiry.phone}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-hairline bg-bone p-5">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-taupe">
              <Package size={16} />
              Linked product
            </div>

            {inquiry.product ? (
              <div className="mt-4 flex items-center gap-4 rounded-xl border border-hairline bg-canvas p-4">
                {inquiry.product.imageUrl ? (
                  <img
                    src={inquiry.product.imageUrl}
                    alt={inquiry.product.name}
                    className="h-16 w-16 shrink-0 rounded-lg border border-hairline object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-hairline bg-white text-taupe">
                    <ImageOff className="h-5 w-5" />
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-ink">{inquiry.product.name}</p>
                  <p className="mt-0.5 text-sm text-taupe">SKU: {inquiry.product.sku}</p>
                </div>
              </div>
            ) : (
              <div className="mt-4 rounded-xl border border-hairline bg-canvas p-4 text-sm text-taupe">
                General inquiry — no linked product.
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-hairline bg-white p-5 shadow-sm">
            <Info icon={<Calendar size={18} />} title="Received" value={new Date(inquiry.createdAt).toLocaleString()} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

interface InfoProps {
  icon: ReactNode;
  title: string;
  value: ReactNode;
}

function Info({ icon, title, value }: InfoProps) {
  return (
    <div className="flex gap-3">
      <div className="mt-1 text-taupe">{icon}</div>
      <div className="min-w-0 flex-1">
        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-taupe">{title}</div>
        <div className="mt-1 text-sm font-medium text-ink">{value}</div>
      </div>
    </div>
  );
}
