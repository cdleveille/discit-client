"use server";

import { revalidateTag } from "next/cache";

import { RequestMethod } from "@constants";
import { config } from "@services";

import type {
	CreateBagParams,
	AddDiscToBagParams,
	RemoveDiscFromBagParams,
	DeleteBagParams,
	RequestParams,
	Bag,
	Disc,
	GetBagParams
} from "@types";

export const getDiscs = async () =>
	requestJson<Disc[]>({
		path: "disc",
		method: RequestMethod.GET,
		tags: ["disc"]
	});

export const getBags = async ({ userId }: GetBagParams) =>
	requestJson<Bag[]>({
		path: `bag${userId ? `?user_id=${userId}` : ""}`,
		method: RequestMethod.GET,
		tags: ["bag"]
	});

export const createBag = async ({ userId, bagName }: CreateBagParams) => {
	revalidateTag("bag");
	return requestJson<Bag>({
		path: "bag/create",
		method: RequestMethod.POST,
		body: { user_id: userId, name: bagName },
		cache: "no-cache"
	});
};

export const addDiscToBag = async ({ bagId, discId }: AddDiscToBagParams) => {
	revalidateTag("bag");
	return requestJson<Bag>({
		path: "bag/add-disc",
		method: RequestMethod.PUT,
		body: { id: bagId, disc_id: discId },
		cache: "no-cache"
	});
};

export const removeDiscFromBag = async ({ bagId, discId }: RemoveDiscFromBagParams) => {
	revalidateTag("bag");
	return requestJson<Bag>({
		path: "bag/remove-disc",
		method: RequestMethod.PUT,
		body: { id: bagId, disc_id: discId },
		cache: "no-cache"
	});
};

export const deleteBag = async ({ bagId }: DeleteBagParams) => {
	revalidateTag("bag");
	return requestJson<Bag>({
		path: `bag/delete/${bagId}`,
		method: RequestMethod.DELETE,
		cache: "no-cache"
	});
};

const request = ({ path, method, body, tags, cache = "force-cache" }: RequestParams) =>
	fetch(`${config.API_URL}/${path}`, {
		method,
		headers: { Authorization: `Bearer ${config.API_KEY}` },
		body: JSON.stringify(body),
		next: { tags },
		cache
	});

const requestJson = async <T = unknown>({ path, method, body, tags, cache = "force-cache" }: RequestParams) => {
	const res = await request({ path, method, body, tags, cache });
	return res.json() as Promise<T>;
};
