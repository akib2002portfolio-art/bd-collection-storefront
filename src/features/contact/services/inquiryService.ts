import { supabase } from "../../../lib/supabase";

import type {
  Inquiry,
  CreateInquiryInput,
  UpdateInquiryStatusInput,
} from "../types";

class InquiryService {

  async getInquiries(): Promise<Inquiry[]> {

    const { data, error } = await supabase
      .from("contact_inquiries")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      throw new Error(error.message);
    }

    return (data ?? []).map((item) => ({
      id: item.id,
      type: item.type,
      status: item.status,
      name: item.name,
      email: item.email,
      phone: item.phone,
      subject: item.subject,
      message: item.message,
      productId: item.product_id,
      createdAt: item.created_at,
    }));
  }

  async createInquiry(
    inquiry: CreateInquiryInput,
  ): Promise<Inquiry> {

    const { data, error } = await supabase
      .from("contact_inquiries")
      .insert({
        type: inquiry.type,
        name: inquiry.name,
        email: inquiry.email,
        phone: inquiry.phone,
        subject: inquiry.subject,
        message: inquiry.message,
        product_id: inquiry.productId,
      })
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return {
      id: data.id,
      type: data.type,
      status: data.status,
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
      productId: data.product_id,
      createdAt: data.created_at,
    };
  }

  async updateStatus(
    inquiry: UpdateInquiryStatusInput,
  ): Promise<void> {

    const { error } = await supabase
      .from("contact_inquiries")
      .update({
        status: inquiry.status,
      })
      .eq("id", inquiry.id);

    if (error) {
      throw new Error(error.message);
    }
  }

}

export const inquiryService =
  new InquiryService();