"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useState } from "react"

type Token = {
  valueToken: string
}

const formSchema = z.object({
  name: z.string().min(2).max(50),
  acronym: z.string().min(2).max(2),
})

type FormaSchema = z.infer<typeof formSchema>

export function CategoryForm({ valueToken }: Token) {
  const router = useRouter()
  const [modal, setModal] = useState(false)

  const form = useForm<FormaSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      acronym: "",
    },
  })

  async function onSubmit(data: FormaSchema) {
    const { name, acronym } = data

    const datas = await fetch("http://10.0.3.211:8080/api/v1/supplies/categories", {
      method: "POST",
      body: JSON.stringify({ name, acronym }),
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${valueToken}` },
    })

    if (!datas.ok) {
      const res = await datas.json()
      console.log("res", res)
      return
    }

    router.push("/supply/category")
    form.reset()
    setModal(false)
  }

  if (!valueToken) {
    router.push("/login")
  }

  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="flex items-center justify-between w-full px-4 py-2 shadow-md">
        <h1 className="text-2xl font-bold">Categoria</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-lg p-4 space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Nome da categoria" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="acronym"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Sigla</FormLabel>
                <FormControl>
                  <Input placeholder="Sigla da categoria" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Adicionar
          </Button>
        </form>
      </Form>
    </div>
  )
}