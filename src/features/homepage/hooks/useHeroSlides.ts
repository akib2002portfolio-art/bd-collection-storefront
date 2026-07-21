import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { heroService } from "../services";
import type { HeroSlideFormData } from "../types";

const HERO_QUERY_KEY = ["homepage-hero"];

export function useHeroSlides() {
  return useQuery({
    queryKey: HERO_QUERY_KEY,
    queryFn: () => heroService.getHeroSlides(),
  });
}

export function useHeroSlide(id: string) {
  return useQuery({
    queryKey: [...HERO_QUERY_KEY, id],
    queryFn: () => heroService.getHeroSlide(id),
    enabled: Boolean(id),
  });
}

export function useCreateHeroSlide() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (hero: HeroSlideFormData) =>
      heroService.createHeroSlide(hero),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: HERO_QUERY_KEY,
      });
    },
  });
}

export function useUpdateHeroSlide() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      hero,
    }: {
      id: string;
      hero: HeroSlideFormData;
    }) => heroService.updateHeroSlide(id, hero),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: HERO_QUERY_KEY,
      });

      queryClient.invalidateQueries({
        queryKey: [...HERO_QUERY_KEY, variables.id],
      });
    },
  });
}

export function useDeleteHeroSlide() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      heroService.deleteHeroSlide(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: HERO_QUERY_KEY,
      });
    },
  });
}

export function useToggleHeroSlide() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      isActive,
    }: {
      id: string;
      isActive: boolean;
    }) =>
      heroService.toggleHeroSlide(id, isActive),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: HERO_QUERY_KEY,
      });

      queryClient.invalidateQueries({
        queryKey: [...HERO_QUERY_KEY, variables.id],
      });
    },
  });
}

export function useUpdateHeroDisplayOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      displayOrder,
    }: {
      id: string;
      displayOrder: number;
    }) =>
      heroService.updateDisplayOrder(
        id,
        displayOrder,
      ),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: HERO_QUERY_KEY,
      });

      queryClient.invalidateQueries({
        queryKey: [...HERO_QUERY_KEY, variables.id],
      });
    },
  });
}