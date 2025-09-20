import { Label } from "@/components/ui/label";
import { ITextAreaFieldProps } from "./TextAreaField.types";
import { Textarea } from "@/components/ui/textarea";

export default function TextAreaField({
	label,
	error,
	...props
}: ITextAreaFieldProps) {
	return (
		<div className="space-y-2">
			<Label htmlFor={props.id}>{label}</Label>
			<Textarea {...props} />
			{error && <p className="text-red-500 text-sm mt-1">{error}</p>}
		</div>
	);
}
