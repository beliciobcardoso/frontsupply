"use client"
import { ColumnDef } from "@tanstack/react-table"

export type Type = {
    id: number
    name: string
    acronym: string
    groupId: number
  }

export const columns: ColumnDef<Type>[] = [
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
        accessorKey: "groupId",
        header: "ID Grupo",
        cell: ({ row }) => <div className="text-center">{row.getValue("groupId")}</div>,
    },
  ]