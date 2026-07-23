import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { siteSettingsService } from "../services";
import type {
  SiteSettings,
  UpdateSiteSettingsInput,
} from "../types";

const QUERY_KEY = ["site-settings"];

export function useSiteSettings() {
  return useQuery<SiteSettings>({
    queryKey: QUERY_KEY,
    queryFn: () =>
      siteSettingsService.getSettings(),
  });
}

export function useUpdateSiteSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      settings,
    }: {
      id: string;
      settings: UpdateSiteSettingsInput;
    }) =>
      siteSettingsService.updateSettings(
        id,
        settings,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY,
      });
    },
  });
}