"use client"
import { ColumnDef } from "@tanstack/react-table"

export type Group = {
    id: number
    name: string
    acronym: string
    categoryId: number
  }

export const columns: ColumnDef<Group>[] = [
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
    {
        accessorKey: "categoryId",
        header: "ID Categoria",
        cell: ({ row }) => <div className="text-center">{row.getValue("categoryId")}</div>,
    },
  ]