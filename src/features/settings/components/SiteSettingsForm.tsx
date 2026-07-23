import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormField } from "../../../components/ui/FormField";

import {
    LogoUpload,
    FaviconUpload,
} from "./";

import type {
    SiteSettings,
    UpdateSiteSettingsInput,
} from "../types";

import {
    siteSettingsSchema,
    type SiteSettingsFormValues,
} from "../validation";

interface SiteSettingsFormProps {
    initialValues: SiteSettings;

    loading?: boolean;

    onSubmit: (
        values: UpdateSiteSettingsInput,
    ) => Promise<void>;
}

const emptyValues: SiteSettingsFormValues = {
    storeName: "",
    tagline: "",
    description: "",

    logoUrl: "",
    faviconUrl: "",
    browserTitle: "",

    phone: "",
    email: "",
    address: "",
    businessHours: "",

    facebook: "",
    instagram: "",
    whatsapp: "",
    linkedin: "",
    youtube: "",

    defaultCurrency: "BDT",
    contactEmail: "",

    footerText: "",
    copyrightText: "",

    seoTitle: "",
    seoDescription: "",
    seoImage: "",
};

function toFormValues(
    settings?: SiteSettings,
): SiteSettingsFormValues {
    if (!settings) {
        return emptyValues;
    }

    return {
        storeName: settings.storeName,
        tagline: settings.tagline ?? "",
        description: settings.description ?? "",

        logoUrl: settings.logoUrl ?? "",
        faviconUrl: settings.faviconUrl ?? "",
        browserTitle: settings.browserTitle ?? "",

        phone: settings.phone ?? "",
        email: settings.email ?? "",
        address: settings.address ?? "",
        businessHours: settings.businessHours ?? "",

        facebook: settings.facebook ?? "",
        instagram: settings.instagram ?? "",
        whatsapp: settings.whatsapp ?? "",
        linkedin: settings.linkedin ?? "",
        youtube: settings.youtube ?? "",

        defaultCurrency: settings.defaultCurrency,
        contactEmail: settings.contactEmail ?? "",

        footerText: settings.footerText ?? "",
        copyrightText: settings.copyrightText ?? "",

        seoTitle: settings.seoTitle ?? "",
        seoDescription: settings.seoDescription ?? "",
        seoImage: settings.seoImage ?? "",
    };
}

export function SiteSettingsForm({
    initialValues,
    loading = false,
    onSubmit,
}: SiteSettingsFormProps) {
    const {
        register,
        control,
        reset,
        handleSubmit,
        formState: {
            errors,
            isDirty,
        },
    } = useForm<SiteSettingsFormValues>({
        resolver: zodResolver(siteSettingsSchema),
        defaultValues: emptyValues,
    });

    useEffect(() => {
        if (!initialValues) return;

        reset(toFormValues(initialValues));
    }, [initialValues, reset]);

    function handleReset() {
        reset(toFormValues(initialValues));
    }

    async function submit(
        values: SiteSettingsFormValues,
    ) {
        await onSubmit(values);
    }

    return (
        <form
            onSubmit={handleSubmit(submit)}
            className="space-y-10"
        >
            {/* -------------------------------- */}
            {/* Branding */}
            {/* -------------------------------- */}

            <section className="space-y-6">
                <h3 className="border-b border-hairline pb-2 text-lg font-semibold text-ink">
                    Branding
                </h3>

                <FormField
                    label="Store Name"
                    error={errors.storeName}
                >
                    <input
                        {...register("storeName")}
                        disabled={loading}
                        className="w-full rounded-md border px-3 py-2 disabled:opacity-50"
                    />
                </FormField>

                <FormField
                    label="Tagline"
                    error={errors.tagline}
                >
                    <input
                        {...register("tagline")}
                        placeholder="Premium Fashion for Every Occasion"
                        disabled={loading}
                        className="w-full rounded-md border px-3 py-2 disabled:opacity-50"
                    />
                </FormField>

                <FormField
                    label="Description"
                    error={errors.description}
                >
                    <textarea
                        {...register("description")}
                        rows={4}
                        placeholder={`Tell customers about your business.

Example:

BD Collection offers premium fashion for men, women and children with delivery across Bangladesh.`}
                        disabled={loading}
                        className="w-full rounded-md border px-3 py-2 disabled:opacity-50"
                    />
                </FormField>

                <FormField
                    label="Browser Title"
                    error={errors.browserTitle}
                >
                    <input
                        {...register("browserTitle")}
                        placeholder="BD Collection"
                        disabled={loading}
                        className="w-full rounded-md border px-3 py-2 disabled:opacity-50"
                    />
                </FormField>

                <div className="grid gap-6 md:grid-cols-2">
                    <FormField label="Logo">
                        <Controller
                            control={control}
                            name="logoUrl"
                            render={({ field }) => (
                                <LogoUpload
                                    value={field.value || null}
                                    onChange={(value) =>
                                        field.onChange(value ?? "")
                                    }
                                    disabled={loading}
                                />
                            )}
                        />
                    </FormField>

                    <FormField label="Favicon">
                        <Controller
                            control={control}
                            name="faviconUrl"
                            render={({ field }) => (
                                <FaviconUpload
                                    value={field.value || null}
                                    onChange={(value) =>
                                        field.onChange(value ?? "")
                                    }
                                    disabled={loading}
                                />
                            )}
                        />
                    </FormField>
                </div>
            </section>
            {/* -------------------------------- */}
            {/* Contact */}
            {/* -------------------------------- */}

            <section className="space-y-6">
                <h3 className="border-b border-hairline pb-2 text-lg font-semibold text-ink">
                    Contact
                </h3>

                <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                        label="Phone"
                        error={errors.phone}
                    >
                        <input
                            {...register("phone")}
                            disabled={loading}
                            className="w-full rounded-md border px-3 py-2 disabled:opacity-50"
                        />
                    </FormField>

                    <FormField
                        label="Email"
                        error={errors.email}
                    >
                        <input
                            type="email"
                            {...register("email")}
                            disabled={loading}
                            className="w-full rounded-md border px-3 py-2 disabled:opacity-50"
                        />
                    </FormField>
                </div>

                <FormField
                    label="Contact Email"
                    error={errors.contactEmail}
                >
                    <input
                        type="email"
                        {...register("contactEmail")}
                        disabled={loading}
                        className="w-full rounded-md border px-3 py-2 disabled:opacity-50"
                    />
                </FormField>

                <FormField
                    label="Address"
                    error={errors.address}
                >
                    <textarea
                        {...register("address")}
                        rows={3}
                        disabled={loading}
                        className="w-full rounded-md border px-3 py-2 disabled:opacity-50"
                    />
                </FormField>

                <FormField
                    label="Business Hours"
                    error={errors.businessHours}
                >
                    <textarea
                        {...register("businessHours")}
                        rows={3}
                        disabled={loading}
                        className="w-full rounded-md border px-3 py-2 disabled:opacity-50"
                    />
                </FormField>
            </section>

            {/* -------------------------------- */}
            {/* Social */}
            {/* -------------------------------- */}

            <section className="space-y-6">
                <h3 className="border-b border-hairline pb-2 text-lg font-semibold text-ink">
                    Social Media
                </h3>

                <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                        label="Facebook"
                        error={errors.facebook}
                    >
                        <input
                            {...register("facebook")}
                            disabled={loading}
                            className="w-full rounded-md border px-3 py-2 disabled:opacity-50"
                        />
                    </FormField>

                    <FormField
                        label="Instagram"
                        error={errors.instagram}
                    >
                        <input
                            {...register("instagram")}
                            disabled={loading}
                            className="w-full rounded-md border px-3 py-2 disabled:opacity-50"
                        />
                    </FormField>

                    <FormField
                        label="WhatsApp"
                        error={errors.whatsapp}
                    >
                        <input
                            {...register("whatsapp")}
                            disabled={loading}
                            className="w-full rounded-md border px-3 py-2 disabled:opacity-50"
                        />
                    </FormField>

                    <FormField
                        label="LinkedIn"
                        error={errors.linkedin}
                    >
                        <input
                            {...register("linkedin")}
                            disabled={loading}
                            className="w-full rounded-md border px-3 py-2 disabled:opacity-50"
                        />
                    </FormField>

                    <FormField
                        label="YouTube"
                        error={errors.youtube}
                    >
                        <input
                            {...register("youtube")}
                            disabled={loading}
                            className="w-full rounded-md border px-3 py-2 disabled:opacity-50"
                        />
                    </FormField>
                </div>
            </section>

            {/* -------------------------------- */}
            {/* Footer */}
            {/* -------------------------------- */}

            <section className="space-y-6">
                <h3 className="border-b border-hairline pb-2 text-lg font-semibold text-ink">
                    Footer
                </h3>

                <FormField
                    label="Footer Message"
                    error={errors.footerText}
                >
                    <textarea
                        {...register("footerText")}
                        rows={3}
                        placeholder={`Thank you for shopping with BD Collection.

We appreciate your trust and support.`}
                        disabled={loading}
                        className="w-full rounded-md border px-3 py-2 disabled:opacity-50"
                    />
                </FormField>

                <FormField
                    label="Copyright Text"
                    error={errors.copyrightText}
                >
                    <input
                        {...register("copyrightText")}
                        placeholder="© 2026 BD Collection. All rights reserved."
                        disabled={loading}
                        className="w-full rounded-md border px-3 py-2 disabled:opacity-50"
                    />
                </FormField>
            </section>

            {/* -------------------------------- */}
            {/* Actions */}
            {/* -------------------------------- */}

            <div className="flex items-center gap-3 pt-4">
                <button
                    type="submit"
                    disabled={loading || !isDirty}
                    className="rounded-md bg-black px-5 py-2 text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading ? "Saving..." : "Save Changes"}
                </button>

                <button
                    type="button"
                    disabled={loading}
                    onClick={handleReset}
                    className="rounded-md border border-hairline px-5 py-2 transition-colors hover:bg-bone disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Reset
                </button>
            </div>
        </form>
    );
}