import { CategoryForm } from "./form";
import { cookies } from "next/headers";
import { DataTable } from "./data-table"
import { Modal } from "@/components/modal";
import { type Category, columns } from "./columns"
import { Separator } from "@radix-ui/react-separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbPage } from "@/components/ui/breadcrumb";

export default async function Categories() {
    const cookieStore = cookies()
    const token = cookieStore.get("session-token")

    const datas = await fetch("http://10.0.3.211:8080/api/v1/supplies/categories", {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token?.value}` },
    }).then((res) => res.json()) as { categories: Category[] }
   
    return (
        <main className="flex flex-col h-[calc(100vh-1rem)] w-full">
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 dark:bg-slate-800 bg-slate-950">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbPage>Categoria</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <section className="flex flex-col items-center h-screen w-full">
                <div className="flex items-center justify-between w-full px-4 py-2  shadow-md">
                    <h1 className="text-2xl font-bold">Categoria</h1>
                    <Modal modal={{ labelButton: "Nova Categoria", title: "Adicionar Categorias" }}>
                        <CategoryForm valueToken={token?.value || ''} />
                    </Modal>
                </div>
                <div>
                    <DataTable columns={columns} data={datas.categories} />
                </div>
            </section>
        </main>
    )
}
