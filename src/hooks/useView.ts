"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { View } from "@constants";

import type { ViewOption } from "@types";

export const useView = () => {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const view = searchParams.get("view") as ViewOption | null;

	const [isBagView, setIsBagView] = useState(pathname === "/" && view === View.BAG);

	useEffect(() => {
		if (pathname !== "/") return;
		if (view === View.BAG) return setIsBagView(true);
		setIsBagView(false);
	}, [pathname, view]);

	const isSearchView = !isBagView;

	return { view, isSearchView, isBagView };
};
