import React, { CSSProperties } from "react";

import { IDisc } from "../types/abstract";

interface IDiscDetailProps {
	data: IDisc | null;
	color: string;
	backgroundColor: string;
	visible: boolean;
	spinClass: string;
}

export const DiscDetail: React.FC<IDiscDetailProps> = ({ data, color, backgroundColor, visible, spinClass }) => {
	const styles: CSSProperties = {
		color: color,
		backgroundColor: backgroundColor,
		display: visible ? "block" : "none"
	};

	const borderStyles: CSSProperties = {
		border: `6px solid ${color + "25"}`
	};

	return data ? (
		<div className={`disc-detail ${spinClass}`} style={{ ...styles, ...borderStyles }}>
			<div className="disc-detail-inner-circle" style={borderStyles}></div>
			<div className="disc-detail-container">
				<div className="disc-detail-name" style={{ color }}>
					{data.name}
				</div>
				<div className="disc-detail-fields" style={{ color }}>
					<span>{data.brand}</span>
					<br />
					<span>{data.category}</span>
					<br />
					<span>{data.stability}</span>
					<br />
					<span>
						{data.speed}&nbsp;|&nbsp;{data.glide}&nbsp;|&nbsp;
						{data.turn}&nbsp;|&nbsp;{data.fade}
					</span>
				</div>
				<div className="disc-detail-img">
					<a href={data.link} target="_blank" rel="noreferrer">
						<img src={data.pic} />
					</a>
				</div>
			</div>
		</div>
	) : (
		<></>
	);
};

export default DiscDetail;
