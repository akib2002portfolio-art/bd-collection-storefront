import {
  X,
  Mail,
  Phone,
  Package,
  Calendar,
  User,
  Check,
  Archive,
  Trash2,
} from "lucide-react";

import { InquiryStatusBadge } from "./InquiryStatusBadge";

import {
  useUpdateInquiryStatus,
  useDeleteInquiry,
} from "../../../contact/hooks";

import type { Inquiry } from "../../../contact/types";

interface InquiryDetailDrawerProps {
  inquiry: Inquiry | null;
  open: boolean;
  onClose: () => void;
}

export function InquiryDetailDrawer({
  inquiry,
  open,
  onClose,
}: InquiryDetailDrawerProps) {
  const updateStatus =
    useUpdateInquiryStatus();
  const deleteInquiry =
    useDeleteInquiry();
  if (!open || !inquiry) return null;

  async function changeStatus(
    status: "read" | "archived",
  ) {
    if (!inquiry) return;

    try {
      await updateStatus.mutateAsync({
        id: inquiry.id,
        status,
      });

      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to update inquiry.");
    }
  }

  async function handleDelete() {
    if (!inquiry) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this inquiry?\n\nIt will be removed from the inbox but can still be recovered from the database."
    );

    if (!confirmed) return;

    try {
      await deleteInquiry.mutateAsync(
        inquiry.id,
      );

      onClose();
    } catch (error) {
      console.error(error);

      alert(
        "Failed to delete inquiry.",
      );
    }
  }

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/40"
        onClick={onClose}
      />

      <aside className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-xl flex-col border-l bg-background shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b p-6">

          <h2 className="text-xl font-semibold">
            Inquiry Details
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>

        </div>

        {/* Body */}

        <div className="flex-1 space-y-6 overflow-y-auto p-6">

          <InquiryStatusBadge
            status={inquiry.status}
          />

          <div className="space-y-4">

            <Info
              icon={<User size={18} />}
              title="Customer"
              value={inquiry.name}
            />

            <Info
              icon={<Mail size={18} />}
              title="Email"
              value={inquiry.email}
            />

            <Info
              icon={<Phone size={18} />}
              title="Phone"
              value={inquiry.phone || "-"}
            />

            <Info
              icon={<Package size={18} />}
              title="Product"
              value={
                inquiry.product?.name ??
                "General Inquiry"
              }
            />

            <Info
              icon={<Calendar size={18} />}
              title="Received"
              value={new Date(
                inquiry.createdAt,
              ).toLocaleString()}
            />

          </div>

          <div>

            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Subject
            </h3>

            <div className="rounded-lg border p-4">
              {inquiry.subject || "-"}
            </div>

          </div>

          <div>

            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Message
            </h3>

            <div className="whitespace-pre-wrap rounded-lg border p-4 leading-7">
              {inquiry.message}
            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="flex gap-3 border-t p-6">

          {inquiry.status === "unread" && (
            <button
              onClick={() => changeStatus("read")}
              disabled={updateStatus.isPending}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              <Check size={18} />
              Mark as Read
            </button>
          )}

          {inquiry.status !== "archived" && (
            <button
              onClick={() => changeStatus("archived")}
              disabled={
                updateStatus.isPending ||
                inquiry.status === "read"
              }
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-3 font-medium transition hover:bg-neutral-100 disabled:opacity-50"
            >
              <Archive size={18} />
              Archive
            </button>
          )}

          <button
            onClick={handleDelete}
            disabled={deleteInquiry.isPending}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-medium text-red-600 transition hover:bg-red-100 disabled:opacity-50"
          >
            <Trash2 size={18} />

            {deleteInquiry.isPending
              ? "Deleting..."
              : "Delete"}
          </button>

        </div>
      </aside>
    </>
  );
}

interface InfoProps {
  icon: React.ReactNode;
  title: string;
  value: React.ReactNode;
}

function Info({
  icon,
  title,
  value,
}: InfoProps) {
  return (
    <div className="flex gap-3">

      <div className="mt-1 text-muted-foreground">
        {icon}
      </div>

      <div>

        <div className="text-xs uppercase tracking-wide text-muted-foreground">
          {title}
        </div>

        <div className="font-medium">
          {value}
        </div>

      </div>

    </div>
  );
}