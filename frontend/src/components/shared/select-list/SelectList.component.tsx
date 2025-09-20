import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	SelectGroup,
	SelectSeparator,
} from "@/components/ui/select";
import { ISelectListProps } from "./SelectList.types";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";

export default function SelectList({
	label,
	placeholder,
	onValueChange,
	value,
	values,
	error,
	allowClear = false,
	clearLabel = "Any",
}: ISelectListProps) {
	const CLEAR_VALUE = "__CLEAR__";
	const t = useTranslations("common");
	clearLabel = t("any");
	const handleValueChange = (newValue: string) => {
		if (newValue === CLEAR_VALUE) {
			onValueChange("");
		} else {
			onValueChange(newValue);
		}
	};

	return (
		<SelectGroup className="flex flex-col gap-2">
			<Label>{label}</Label>
			<Select value={value || CLEAR_VALUE} onValueChange={handleValueChange}>
				<SelectTrigger className="w-full">
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>
					{allowClear && (
						<>
							<SelectItem
								value={CLEAR_VALUE}
								className="text-muted-foreground italic"
							>
								{clearLabel}
							</SelectItem>
							<SelectSeparator />
						</>
					)}
					{values.map((item) => (
						<SelectItem key={item.value} value={item.value}>
							{item.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			{error && <p className="text-red-500 text-sm mt-1">{error}</p>}
		</SelectGroup>
	);
}
