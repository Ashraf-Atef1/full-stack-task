import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { IPaginationProps } from "./Pagination.types";
import { Fragment } from "react";

export default function Pagination({
	currentPage,
	totalPages,
	handlePageChange,
}: IPaginationProps) {
	const tCommon = useTranslations("common");
	if (totalPages <= 1) return null;
	return (
		<div className="mt-8 flex justify-center gap-2">
			<Button
				variant="outline"
				size="sm"
				onClick={() => handlePageChange(currentPage - 1)}
				disabled={currentPage === 1}
			>
				{tCommon("previous")}
			</Button>

			{Array.from({ length: totalPages }, (_, i) => i + 1)
				.filter(
					(page) =>
						page === 1 ||
						page === totalPages ||
						Math.abs(page - currentPage) <= 2
				)
				.map((page, index, arr) => (
					<Fragment key={page}>
						{index > 0 && arr[index - 1] !== page - 1 && (
							<span className="px-2 py-1 text-muted-foreground">...</span>
						)}
						<Button
							variant={currentPage === page ? "default" : "outline"}
							size="sm"
							onClick={() => handlePageChange(page)}
						>
							{page}
						</Button>
					</Fragment>
				))}

			<Button
				variant="outline"
				size="sm"
				onClick={() => handlePageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
			>
				{tCommon("next")}
			</Button>
		</div>
	);
}
