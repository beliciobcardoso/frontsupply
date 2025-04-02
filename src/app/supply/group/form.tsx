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
import { useEffect, useState } from "react"
import { Category } from "../category/columns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Token = {
  valueToken: string
}

const formSchema = z.object({
  name: z.string().min(2).max(50),
  acronym: z.string().min(2).max(2),
  categoryId: z.string().min(1, {message: "Selecione uma categoria"}),
})

type FormaSchema = z.infer<typeof formSchema>

export function GroupForm({valueToken}: Token) {
  const router = useRouter()
  const [modal, setModal] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])


  useEffect(  () => {

    const handleModal = async () => {
      const datas = await fetch("http://10.0.3.211:8080/api/v1/supplies/categories", {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${valueToken}` },
    }).then((res) => res.json()) as { categories: Category[] }

      setCategories(datas.categories)
    }

    handleModal()
    
  },[])

  const form = useForm<FormaSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      acronym: "",
    },
  })

  async function onSubmit(data: FormaSchema) {
    const { name, acronym } = data

    const datas = await fetch("http://10.0.3.211:8080/api/v1/supplies/groups", {
      method: "POST",
      body: JSON.stringify({ name, acronym }),
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${valueToken}`},
    })

    if (!datas.ok) {
      const res = await datas.json()
      console.log("res", res)
      return
    }

    router.refresh()
    form.reset()
    setModal(false)
  }

  if (!valueToken) {
    router.push("/login")
  }

  return (
    <div className="flex flex-col items-center w-full h-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-lg p-4 space-y-4">
        <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Grupo</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Escolha uma Categoria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories?.map((item) => (
                          <SelectItem key={item.id} value={String(item.id)}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do Grupo" {...field} />
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
                  <Input placeholder="Sigla do Grupo" {...field} />
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