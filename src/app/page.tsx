import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col h-[calc(100vh-1rem)] w-full">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 dark:bg-slate-800 bg-slate-950">
        <div className="flex w-full justify-between px-4">
          <h1 className="text-2xl font-bold">Home</h1>
          <Link href="/login" className="px-4 py-2 m-0 hover:bg-green-300 hover:text-gray-600 font-bold rounded-sm bg-green-800" >Login</Link>
        </div>
      </header>
      <section className="flex flex-col items-center h-screen w-full">
        <div className="flex flex-col h-[calc(100vh-8rem)] items-center justify-center w-full px-4 py-2  shadow-md">
          <p>Bem vindo a pagina de teste Nova corrente!</p>
        </div>
      </section>
    </main>
  )
}
