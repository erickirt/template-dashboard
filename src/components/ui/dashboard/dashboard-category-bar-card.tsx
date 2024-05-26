import { cx } from "@/lib/utils";
import { Badge } from "@/components/Badge";

export type Data = {
    title: string;
    value: string;
    percentage: number;
    color: string;
};

export type CardProps = {
    title: string;
    change: string;
    value: string;
    valueDescription: string;
    subtitle: string;
    ctaDescription: string;
    ctaText: string;
    ctaLink: string;
    data: Data[]
};

export function CategoryBarCard({
    title,
    change,
    value,
    valueDescription,
    subtitle,
    ctaDescription,
    ctaText,
    ctaLink,
    data
}: CardProps) {
    return (
        <>
            <div className="flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-gray-900">{title}</h3>
                        <Badge variant="neutral">{change}</Badge>
                    </div>
                    <p className="mt-2 flex items-baseline gap-2">
                        <span className="text-xl text-gray-900">
                            {value}
                        </span>
                        <span className="text-sm text-gray-500">{valueDescription}</span>
                    </p>
                    <div className="mt-4">
                        <p className="text-sm font-medium text-gray-900">
                            {subtitle}
                        </p>
                        <div className="mt-2 flex items-center gap-0.5">
                            {data.map((item) => (
                                <div
                                    key={item.title}
                                    className={cx(
                                        item.color,
                                        `rounded-full h-1.5 w-[${item.percentage}%]`
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                    <ul role="list" className="mt-5 space-y-2">
                        {data.map((item) => (
                            <li key={item.title} className="text-xs flex items-center gap-2">
                                <span
                                    className={cx(
                                        item.color,
                                        "size-2.5 rounded-sm"
                                    )}
                                    aria-hidden="true"
                                />
                                <span className="text-gray-900">{item.title}</span>
                                <span className="text-gray-600">({item.value} / {item.percentage}%)</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <p className="mt-6 text-xs text-gray-600">
                    {ctaDescription}{" "}
                    <a href={ctaLink} className="text-indigo-600">{ctaText}</a>
                </p>
            </div>
        </>
    );
}


