import { Label } from "@/components/ui/label";
import { IInputFieldProps } from "./InputField.types";
import { Input } from "@/components/ui/input";

export default function InputField({
	label,
	error,
	...props
}: IInputFieldProps) {
	return (
		<div className="space-y-2">
			<Label htmlFor={props.id}>{label}</Label>
			<Input {...props} />
			{error && <p className="text-red-500 text-sm mt-1">{error}</p>}
		</div>
	);
}
