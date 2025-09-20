export interface ISelectListProps {
	label: string;
	placeholder?: string;
	onValueChange: (value: string) => void;
	value?: string;
	values: { label: string; value: string }[];
	error?: string;
	allowClear?: boolean;
	clearLabel?: string;
}
