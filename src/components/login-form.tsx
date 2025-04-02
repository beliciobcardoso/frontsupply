"use client"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

const formSchemaLogin = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

type FormSchemaLogin = z.infer<typeof formSchemaLogin>

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter()

  const form = useForm<FormSchemaLogin>({
    resolver: zodResolver(formSchemaLogin),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: FormSchemaLogin) {
    const login = signIn("credentials", { ...values, redirect: false }).catch((err) => {
      console.log("err", err)
      form.setError("email", {
        type: "manual",
        message: "Email ou senha inválidos",
      })
      form.setError("password", {
        type: "manual",
        message: "Email ou senha inválidos",
      })
    })

    if (login) {
      console.log("login", login)
      form.setValue("email", "")
      form.setValue("password", "")
      router.push("/supply/")
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Digite seu email abaixo para entrar na sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite seu email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Digite sua senha"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Login</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
