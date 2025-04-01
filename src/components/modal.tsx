import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface props {
  modal: {
    labelButton: string
    title: string
    description?: string
  }
  children: React.ReactNode
}

export function Modal({ modal, children }: props) {

  const { labelButton, title, description } = modal
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{labelButton}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
