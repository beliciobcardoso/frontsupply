"use client"
import { ColumnDef } from "@tanstack/react-table"

export type Category = {
    id: number
    name: string
    acronym: string
  }

export const columns: ColumnDef<Category>[] = [
    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => <div className="text-center">{row.getValue("id")}</div>,
    },
    {
        accessorKey: "name",
        header: "Nome",
        cell: ({ row }) => <div className="text-center">{row.getValue("name")}</div>,
    },
    {
        accessorKey: "acronym",
        header: "Sigla",
        cell: ({ row }) => <div className="text-center">{row.getValue("acronym")}</div>,
    },
  ]