import { useEffect, useState } from "react";
import { useCategories } from "../../categories/hooks/useCategories";
import { ImageUpload } from "./ImageUpload";

import type {
    CreateProductInput,
    CurrencyCode,
    Product,
} from "../types/product";

interface ProductFormProps {
    initialData?: Product;
    loading?: boolean;
    onSubmit: (
        data: CreateProductInput,
    ) => Promise<void>;
}

export function ProductForm({
    initialData,
    loading = false,
    onSubmit,
}: ProductFormProps) {
    const [formData, setFormData] =
        useState<CreateProductInput>({
            name: "",
            slug: "",
            category_id: null,
            short_description: "",
            description: "",
            sku: "",
            price: null,
            currency: null,
            stock: 0,
            image_url: null,
            featured: false,
            new_arrival: false,
            display_order: 0,
            status: "draft",
        });

    const {
        categories,
        loading: categoriesLoading,
    } = useCategories();
    console.log("Hook categories:", categories);
    console.log("Loading:", categoriesLoading);
    console.log("Categories Hook:", categories);
    console.log("Categories:", categories);
    useEffect(() => {
        if (!initialData) return;

        setFormData({
            name: initialData.name,
            slug: initialData.slug,
            category_id: initialData.category_id,
            short_description:
                initialData.short_description,
            description: initialData.description,
            sku: initialData.sku,
            price: initialData.price,
            currency: initialData.currency,
            stock: initialData.stock,
            image_url: initialData.image_url,
            featured: initialData.featured,
            new_arrival: initialData.new_arrival,
            display_order:
                initialData.display_order,
            status: initialData.status,
        });
    }, [initialData]);

    function updateField<
        K extends keyof CreateProductInput,
    >(
        key: K,
        value: CreateProductInput[K],
    ) {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    }

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>,
    ) {
        e.preventDefault();

        const hasPrice =
            formData.price !== null;

        const hasCurrency =
            formData.currency !== null;

        if (hasPrice !== hasCurrency) {
            alert(
                "Price and Currency must both be filled or both left empty.",
            );
            return;
        }

        await onSubmit(formData);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-xl border border-hairline bg-canvas p-8"
        >
            {/* Product Name */}
            <div>
                <label className="mb-2 block text-sm font-medium">
                    Product Name
                </label>

                <input
                    required
                    value={formData.name}
                    placeholder="Premium Cotton Shirt"
                    onChange={(e) => {
                        const name = e.target.value;

                        updateField("name", name);

                        updateField(
                            "slug",
                            name
                                .trim()
                                .toLowerCase()
                                .replace(
                                    /[^a-z0-9\s-]/g,
                                    "",
                                )
                                .replace(/\s+/g, "-")
                                .replace(/-+/g, "-"),
                        );
                    }}
                    className="w-full rounded-md border border-hairline px-4 py-3"
                />
            </div>

            {/* Short Description */}
            <div>
                <label className="mb-2 block text-sm font-medium">
                    Short Description
                </label>

                <input
                    value={formData.short_description}
                    onChange={(e) =>
                        updateField(
                            "short_description",
                            e.target.value,
                        )
                    }
                    placeholder="Short product summary..."
                    className="w-full rounded-md border border-hairline px-4 py-3"
                />
            </div>

            {/* Full Description */}
            <div>
                <label className="mb-2 block text-sm font-medium">
                    Description
                </label>

                <textarea
                    rows={5}
                    value={formData.description}
                    onChange={(e) =>
                        updateField(
                            "description",
                            e.target.value,
                        )
                    }
                    className="w-full rounded-md border border-hairline px-4 py-3"
                />
            </div>

            {/* Category + SKU */}
            <div className="grid gap-6 md:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Category
                    </label>

                    <select
                        value={formData.category_id ?? ""}
                        onChange={(e) =>
                            updateField(
                                "category_id",
                                e.target.value || null,
                            )
                        }
                        disabled={categoriesLoading}
                        className="w-full rounded-md border border-hairline px-4 py-3"
                    >
                        <option value="">
                            {categoriesLoading
                                ? "Loading categories..."
                                : "Select Category"}
                        </option>

                        {categories.map((category) => (
                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        SKU
                    </label>

                    <input
                        value={formData.sku}
                        onChange={(e) =>
                            updateField(
                                "sku",
                                e.target.value,
                            )
                        }
                        placeholder="SKU-001"
                        className="w-full rounded-md border border-hairline px-4 py-3"
                    />
                </div>
            </div>

            {/* Price + Stock */}
            {/* Price + Currency + Stock */}
            <div className="grid gap-6 md:grid-cols-3">

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Regular Price
                    </label>

                    <input
                        type="number"
                        min={1}
                        placeholder="1500"
                        value={formData.price ?? ""}
                        onChange={(e) =>
                            updateField(
                                "price",
                                e.target.value === ""
                                    ? null
                                    : Number(e.target.value),
                            )
                        }
                        className="w-full rounded-md border border-hairline px-4 py-3"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Currency
                    </label>

                    <select
                        value={formData.currency ?? ""}
                        onChange={(e) =>
                            updateField(
                                "currency",
                                (e.target.value || null) as CurrencyCode | null,
                            )
                        }
                        className="w-full rounded-md border border-hairline px-4 py-3"
                    >
                        <option value="">
                            No Price
                        </option>

                        <option value="BDT">
                            BDT (৳)
                        </option>

                        <option value="USD">
                            USD ($)
                        </option>
                    </select>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Stock
                    </label>

                    <input
                        type="number"
                        min={0}
                        placeholder="20"
                        value={
                            formData.stock === 0
                                ? ""
                                : formData.stock
                        }
                        onChange={(e) =>
                            updateField(
                                "stock",
                                Number(e.target.value) || 0,
                            )
                        }
                        className="w-full rounded-md border border-hairline px-4 py-3"
                    />
                </div>

            </div>

            {/* Featured + New Arrival */}
            <div className="grid gap-6 md:grid-cols-2">
                <label className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) =>
                            updateField(
                                "featured",
                                e.target.checked,
                            )
                        }
                    />
                    Featured Product
                </label>

                <label className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        checked={formData.new_arrival}
                        onChange={(e) =>
                            updateField(
                                "new_arrival",
                                e.target.checked,
                            )
                        }
                    />
                    New Arrival
                </label>
            </div>

            {/* Status */}
            <div>
                <label className="mb-2 block text-sm font-medium">
                    Status
                </label>

                <select
                    value={formData.status}
                    onChange={(e) =>
                        updateField(
                            "status",
                            e.target.value as CreateProductInput["status"],
                        )
                    }
                    className="w-full rounded-md border border-hairline px-4 py-3"
                >
                    <option value="draft">
                        Draft
                    </option>

                    <option value="published">
                        Published
                    </option>

                    <option value="out_of_stock">
                        Out of Stock
                    </option>
                </select>
            </div>

            {/* Image */}
            <div>
                <label className="mb-2 block text-sm font-medium">
                    Product Image
                </label>

                <ImageUpload
                    value={formData.image_url}
                    onChange={(url) =>
                        updateField("image_url", url)
                    }
                />
            </div>

            {/* Submit */}
            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-md bg-ink px-6 py-3 text-canvas transition hover:bg-sienna disabled:opacity-50"
                >
                    {loading
                        ? "Saving..."
                        : "Save Product"}
                </button>
            </div>
        </form>
    );
}