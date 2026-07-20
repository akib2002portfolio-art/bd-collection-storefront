import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { ProductForm } from "../../features/admin/products/components/ProductForm";
import { useProducts } from "../../features/admin/products/hooks/useProducts";

export const Route = createFileRoute("/admin/new-product")({
    component: NewProductPage,
});

function NewProductPage() {
    const navigate = useNavigate();

    const { createProduct } = useProducts();

    async function handleSubmit(data: Parameters<typeof createProduct>[0]) {
        try {
            await createProduct(data);

            alert("Product created successfully.");

            navigate({
                to: "/admin/products",
            });
        } catch (error) {
            console.error(error);

            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert("Failed to create product.");
            }
        }
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-display text-4xl text-ink">
                    New Product
                </h1>

                <p className="mt-2 text-taupe">
                    Create a new product for your store.
                </p>
            </div>

            <ProductForm
                onSubmit={handleSubmit}
            />
        </div>
    );
}