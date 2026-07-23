import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { AdminLayout } from "../../admin/shared";
import { SiteSettingsForm } from "../components";
import {
    useSiteSettings,
    useUpdateSiteSettings,
} from "../hooks";

export function SiteSettingsPage() {
    const {
        data,
        isLoading,
        isError,
        error,
    } = useSiteSettings();

    const updateMutation =
        useUpdateSiteSettings();

    useEffect(() => {
        document.title = "Site Settings";
    }, []);

    if (isLoading) {
        return (
            <div className="flex min-h-[500px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-6">
                <h2 className="mb-2 text-lg font-semibold">
                    Failed to load site settings
                </h2>

                <p className="text-sm text-muted-foreground">
                    {error instanceof Error
                        ? error.message
                        : "Unknown error"}
                </p>
            </div>
        );
    }

    return (
        <AdminLayout
            title="Site Settings"
            subtitle="Manage your store branding, contact information and business details."
        >
            <SiteSettingsForm
                initialValues={data}
                loading={updateMutation.isPending}
                onSubmit={async (values) => {
                    await updateMutation.mutateAsync({
                        id: data.id,
                        settings: values,
                    });
                }}
            />
        </AdminLayout>
    );
}