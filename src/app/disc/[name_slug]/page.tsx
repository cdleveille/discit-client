import { DiscDetail } from "@components";
import { API } from "@services";

export const generateStaticParams = async () => {
	const discs = await API.getDiscs();
	return discs.map(({ name_slug }) => ({ params: { name_slug } }));
};

export default function DiscDetailPage({ params: { name_slug } }: { params: { name_slug: string } }) {
	return (
		<div className="disc-detail-container">
			<DiscDetail name_slug={name_slug} hideNavButtons />
		</div>
	);
}
