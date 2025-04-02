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
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Group } from "../group/columns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Token = {
  valueToken: string
}

const formSchema = z.object({
  name: z.string().min(2).max(50),
  acronym: z.string().min(2).max(2),
  groupId: z.string().min(1, { message: "Selecione um grupo" }),
})

type FormaSchema = z.infer<typeof formSchema>

export function TypeForm({ valueToken }: Token) {
  const router = useRouter()
  const [modal, setModal] = useState(false)
  const [groups, setGroups] = useState<Group[]>([])

  useEffect(() => {

    const fetchDatas = async () => {
      const datas = await fetch("http://10.0.3.211:8080/api/v1/supplies/groups",
        {
          method: "GET",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${valueToken}` },
        }
      ).then((res) => res.json()) as { groups: Group[] }

      setGroups(datas.groups)
    }

    fetchDatas()
  }, [])

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
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-lg p-4 space-y-4">
          <FormField
            control={form.control}
            name="groupId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Tipos</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Escolha um Tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {groups?.map((item) => (
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
                  <Input placeholder="Nome do Tipo" {...field} />
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
                  <Input placeholder="Sigla do Tipo" {...field} />
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