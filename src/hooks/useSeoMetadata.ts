import { useEffect } from "react";

import { useSeoContext } from "../components/providers/SeoProvider";
import type { SeoMetadata } from "../lib/seo";

export function useSeoMetadata(metadata: SeoMetadata) {
  const { setMetadata, resetMetadata } = useSeoContext();

  useEffect(() => {
    setMetadata(metadata);
    return () => resetMetadata();
  }, [metadata, setMetadata, resetMetadata]);
}
