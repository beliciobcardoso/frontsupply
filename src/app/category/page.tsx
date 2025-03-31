import { Modal } from "@/components/modal";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";

export default function Category() {
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
                    <Modal labelButton="Cadastrar" />
                </div>
            </section>
        </main>
    )
}
