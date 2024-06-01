"use client"

import { Badge, BadgeProps } from "@/components/Badge"
import { Checkbox } from "@/components/Checkbox"
import { statuses } from "@/data/data"
import { Transaction } from "@/data/schema"
import { formatters } from "@/lib/utils"
import { createColumnHelper } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./data-table-column-header"
import { ConditionFilter } from "./data-table-filter"
import { DataTableRowActions } from "./data-table-row-actions"

const columnHelper = createColumnHelper<Transaction>()
export const columns = [
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected()
            ? true
            : table.getIsSomeRowsSelected()
              ? "indeterminate"
              : false
        }
        onCheckedChange={() => table.toggleAllPageRowsSelected()}
        className="translate-y-0.5"
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        // disabled={!row.getCanSelect()}
        onCheckedChange={() => row.toggleSelected()}
        className="translate-y-0.5"
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    meta: {
      displayName: "Select",
    },
  }),
  columnHelper.accessor("owner", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Owner" />
    ),
    enableSorting: true,
    enableHiding: false,
    meta: {
      className: "text-left",
      displayName: "Owner",
    },
  }),
  columnHelper.accessor("status", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    enableSorting: true,
    meta: {
      className: "text-left",
      displayName: "Status",
    },
    cell: ({ row }) => {
      const status = statuses.find(
        (item) => item.value === row.getValue("status"),
      )

      if (!status) {
        return null
      }

      return (
        <Badge variant={status.variant as BadgeProps["variant"]}>
          {status.label}
        </Badge>
      )
    },
  }),
  columnHelper.accessor("region", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Region" />
    ),
    enableSorting: false,
    meta: {
      className: "text-left",
      displayName: "Region",
    },
    filterFn: "arrIncludesSome",
  }),
  columnHelper.accessor("latency", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Latency (ms)" />
    ),
    enableSorting: false,
    meta: {
      className: "text-left",
      displayName: "Latency",
    },
    cell: ({ getValue }) => {
      const value = getValue()

      function Indicator({ number }: { number: number }) {
        let category
        if (number < 15) {
          category = "good"
        } else if (number >= 15 && number <= 50) {
          category = "ok"
        } else {
          category = "bad"
        }

        // ---- sev version ---
        // const getBarClass = (index: number) => {
        //   if (category === "good") {
        //     return "bg-emerald-500"
        //   } else if (category === "ok" && index < 2) {
        //     return "bg-amber-500"
        //   } else if (category === "bad" && index < 1) {
        //     return "bg-red-500"
        //   }
        //   return "bg-gray-200"
        // }

        // return (
        //   <div className="flex gap-0.5">
        //     <div className={`h-3 w-1 rounded-full ${getBarClass(0)}`} />
        //     <div className={`h-3 w-1 rounded-full ${getBarClass(1)}`} />
        //     <div className={`h-3 w-1 rounded-full ${getBarClass(2)}`} />
        //   </div>
        // )

        // @SEV: would leave the logic so they can easily add other color variants if they want
        const getBarClass = (index: number) => {
          if (category === "good") {
            return "bg-indigo-500"
          } else if (category === "ok" && index < 2) {
            return "bg-indigo-500"
          } else if (category === "bad" && index < 1) {
            return "bg-indigo-500"
          }
          return "bg-gray-300 dark:bg-gray-800"
        }

        return (
          <div className="flex gap-0.5">
            <div className={`h-3.5 w-1 rounded-sm ${getBarClass(0)}`} />
            <div className={`h-3.5 w-1 rounded-sm ${getBarClass(1)}`} />
            <div className={`h-3.5 w-1 rounded-sm ${getBarClass(2)}`} />
          </div>
        )
      }

      return (
        <div className="flex items-center gap-0.5">
          <span className="w-6 tabular-nums">{value}</span>
          <Indicator number={value} />
        </div>
      )
    },
  }),
  columnHelper.accessor("costs", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Costs" />
    ),
    enableSorting: true,
    meta: {
      className: "text-right",
      displayName: "Costs",
    },
    cell: ({ getValue }) => {
      return (
        <span className="font-medium">{formatters.currency(getValue())}</span>
      )
    },
    filterFn: (row, columnId, filterValue: ConditionFilter) => {
      const value = row.getValue(columnId) as number
      const [min, max] = filterValue.value as [number, number]

      switch (filterValue.condition) {
        case "is-equal-to":
          return value === min
        case "is-between":
          return value >= min && value <= max
        case "is-greater-than":
          return value > min
        case "is-less-than":
          return value < min
        default:
          return true
      }
    },
  }),
  // @CHRIS: wording consistency
  columnHelper.accessor("lastEdited", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last edited" />
    ),
    enableSorting: false,
    meta: {
      className: "tabular-nums",
      displayName: "Last edited",
    },
  }),
  columnHelper.display({
    id: "edit",
    header: "Edit",
    enableSorting: false,
    enableHiding: false,
    meta: {
      className: "text-right",
      displayName: "Edit",
    },
    cell: ({ row }) => <DataTableRowActions row={row} />,
  }),
]
