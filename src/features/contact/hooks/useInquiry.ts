import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { inquiryService } from "../services";

import type {
  CreateInquiryInput,
  UpdateInquiryStatusInput,
  Inquiry,
} from "../types";

const QUERY_KEY = ["contact-inquiries"];

export function useInquiries() {
  return useQuery<Inquiry[]>({
    queryKey: QUERY_KEY,
    queryFn: () => inquiryService.getInquiries(),
  });
}

export function useCreateInquiry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateInquiryInput) =>
      inquiryService.createInquiry(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY,
      });
    },
  });
}

export function useUpdateInquiryStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateInquiryStatusInput) =>
      inquiryService.updateStatus(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY,
      });
    },
  });
}

export function useDeleteInquiry() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: (id: string) =>
      inquiryService.deleteInquiry(id),

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: QUERY_KEY,
      });

    },

  });

}