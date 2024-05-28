import { Column } from "@tanstack/react-table"
import { RiArrowUpSLine, RiArrowDownSLine } from "@remixicon/react";

import { cx } from "@/lib/utils"

interface DataTableColumnHeaderProps<TData, TValue>
    extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>
    title: string
}

export function DataTableColumnHeader<TData, TValue>({
    column,
    title,
    className,
}: DataTableColumnHeaderProps<TData, TValue>) {
    if (!column.getCanSort()) {
        return <div className={cx(className)}>{title}</div>
    }

    return (
        <div
            onClick={column.getToggleSortingHandler()}
            className={cx(
                column.columnDef.enableSorting === true
                    ? 'cursor-pointer select-none inline-flex items-center -mx-2 px-2 py-1 gap-2 rounded-md hover:bg-gray-50 hover:ring-1 hover:ring-inset hover:ring-gray-200 hover:dark:ring-gray-800 hover:dark:bg-gray-900'
                    : '',
            )}
        >
            <span>{title}</span>
            {column.getCanSort() ? (
                <div
                    className="-space-y-2"
                >
                    <RiArrowUpSLine
                        className={cx(
                            'size-4 text-gray-900 dark:text-gray-50',
                            column.getIsSorted() === 'desc'
                                ? 'opacity-30'
                                : '',
                        )}
                        aria-hidden="true"
                    />
                    <RiArrowDownSLine
                        className={cx(
                            'size-4 text-gray-900 dark:text-gray-50',
                            column.getIsSorted() === 'asc'
                                ? 'opacity-30'
                                : '',
                        )}
                        aria-hidden="true"
                    />
                </div>
            ) : null}
        </div>
    )
}