export type InquiryType =
  | "general"
  | "product";

export type InquiryStatus =
  | "unread"
  | "read"
  | "archived";

export interface Inquiry {
  id: string;

  type: InquiryType;

  status: InquiryStatus;

  name: string;

  email: string;

  phone: string | null;

  subject: string | null;

  message: string;

  productId: string | null;

  createdAt: string;

  isDeleted: boolean;
  product?: {
    id: string;
    name: string;
    sku: string;
    imageUrl: string | null;
    category?: {
      id: string;
      name: string;
    } | null;
  } | null;
}

export interface CreateInquiryInput {
  type: InquiryType;

  name: string;

  email: string;

  phone?: string;

  subject?: string;

  message: string;

  productId?: string;
}

export interface UpdateInquiryStatusInput {
  id: string;

  status: InquiryStatus;
}