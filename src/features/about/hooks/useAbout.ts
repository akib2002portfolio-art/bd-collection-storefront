import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { aboutService } from "../services";
import type {
  AboutPage,
  UpdateAboutInput,
} from "../types";

const QUERY_KEY = ["about-page"];

export function useAbout() {
  return useQuery<AboutPage>({
    queryKey: QUERY_KEY,
    queryFn: () => aboutService.getAbout(),
  });
}

export function useUpdateAbout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      about,
    }: {
      id: string;
      about: UpdateAboutInput;
    }) => aboutService.updateAbout(id, about),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY,
      });
    },
  });
}