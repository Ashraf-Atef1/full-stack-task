import { ApartmentGallery } from "./apartment-gallery/ApartmentGallery.component";
import BackButton from "../shared/back-button/BackButton.component";
import SideBar from "./sidebar/Sidebar.component";
import Specifications from "./specifications/Specifications.component";
import BasicInfo from "./basic-info/BasicInfo.component";
import FloorPlan from "./floor-plan/FloorPlan.component";
import { IApartmentDetailsPageProps } from "./ApartmentDetails.types";

export default function ApartmentDetailsPage({
	apartment,
}: IApartmentDetailsPageProps) {
	return (
		<section className="min-h-screen bg-background">
			<div className="container mx-auto px-4 py-8">
				{/* Breadcrumb */}
				<BackButton />

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Main Content */}
					<main className="lg:col-span-2 space-y-8">
						<ApartmentGallery
							images={apartment.galleryImages || []}
							title={apartment?.title || apartment.referenceNo}
						/>
						<BasicInfo apartment={apartment} />
						<Specifications apartment={apartment} />
						<FloorPlan apartment={apartment} />
					</main>

					{/* Sidebar */}
					<SideBar apartment={apartment} />
				</div>
			</div>
		</section>
	);
}
