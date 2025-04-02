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

const formSchema = z.object({
  name: z.string().min(2).max(50),
  acronym: z.string().min(2).max(2),
})

type FormaSchema = z.infer<typeof formSchema>

export function AttributeForm() {

  const form = useForm<FormaSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      acronym: "",
    },
  })

  function onSubmit(data: FormaSchema) {
    console.log(data)
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