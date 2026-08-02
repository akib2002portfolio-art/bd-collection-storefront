import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { ProductForm } from "../../features/admin/products/components/ProductForm";
import { useProducts } from "../../features/admin/products/hooks/useProducts";
import { AdminLayout } from "../../features/admin/shared";

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
        <AdminLayout
            title="New Product"
            subtitle="Create a new product for your store."
        >
            <ProductForm onSubmit={handleSubmit} />
        </AdminLayout>
    );
}