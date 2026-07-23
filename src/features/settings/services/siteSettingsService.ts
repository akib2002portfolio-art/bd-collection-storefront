import { supabase } from "../../../lib/supabase";

import type {
    SiteSettings,
    UpdateSiteSettingsInput,
} from "../types";

interface SiteSettingsRow {
    id: string;

    // Branding
    store_name: string;
    tagline: string | null;
    description: string | null;

    logo_url: string | null;
    favicon_url: string | null;
    browser_title: string | null;

    // Contact
    phone: string | null;
    email: string | null;
    address: string | null;
    business_hours: string | null;

    // Social
    facebook: string | null;
    instagram: string | null;
    whatsapp: string | null;
    linkedin: string | null;
    youtube: string | null;

    // Store
    default_currency: string;
    contact_email: string | null;

    // Footer
    footer_text: string | null;
    copyright_text: string | null;

    // SEO
    seo_title: string | null;
    seo_description: string | null;
    seo_image: string | null;

    created_at: string;
    updated_at: string;
}

class SiteSettingsService {
    private mapSettings(
        row: SiteSettingsRow,
    ): SiteSettings {
        return {
            id: row.id,

            storeName: row.store_name,
            tagline: row.tagline,
            description: row.description,

            logoUrl: row.logo_url,
            faviconUrl: row.favicon_url,
            browserTitle: row.browser_title,

            phone: row.phone,
            email: row.email,
            address: row.address,
            businessHours: row.business_hours,

            facebook: row.facebook,
            instagram: row.instagram,
            whatsapp: row.whatsapp,
            linkedin: row.linkedin,
            youtube: row.youtube,

            defaultCurrency: row.default_currency,
            contactEmail: row.contact_email,

            footerText: row.footer_text,
            copyrightText: row.copyright_text,

            seoTitle: row.seo_title,
            seoDescription: row.seo_description,
            seoImage: row.seo_image,

            createdAt: row.created_at,
            updatedAt: row.updated_at,
        };
    }

    async getSettings(): Promise<SiteSettings> {
        const { data, error } = await supabase
            .from("site_settings")
            .select("*")
            .limit(1)
            .single();

        if (error) {
            throw new Error(
                `Failed to fetch site settings: ${error.message}`,
            );
        }

        return this.mapSettings(
            data as SiteSettingsRow,
        );
    }
    async updateSettings(
        id: string,
        settings: UpdateSiteSettingsInput,
    ): Promise<SiteSettings> {
        const { data, error } = await supabase
            .from("site_settings")
            .update({
                // Branding
                store_name: settings.storeName,
                tagline: settings.tagline,
                description: settings.description,

                logo_url: settings.logoUrl,
                favicon_url: settings.faviconUrl,
                browser_title: settings.browserTitle,

                // Contact
                phone: settings.phone,
                email: settings.email,
                address: settings.address,
                business_hours: settings.businessHours,

                // Social
                facebook: settings.facebook,
                instagram: settings.instagram,
                whatsapp: settings.whatsapp,
                linkedin: settings.linkedin,
                youtube: settings.youtube,

                // Store
                default_currency: settings.defaultCurrency,
                contact_email: settings.contactEmail,

                // Footer
                footer_text: settings.footerText,
                copyright_text: settings.copyrightText,

                // SEO
                seo_title: settings.seoTitle,
                seo_description: settings.seoDescription,
                seo_image: settings.seoImage,

                updated_at: new Date().toISOString(),
            })
            .eq("id", id)
            .select()
            .single();

        if (error) {
            throw new Error(
                `Failed to update site settings: ${error.message}`,
            );
        }

        return this.mapSettings(
            data as SiteSettingsRow,
        );
    }
}

export const siteSettingsService =
    new SiteSettingsService();