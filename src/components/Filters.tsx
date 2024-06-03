"use client";

import { SyntheticEvent, useEffect, useState } from "react";

import { View } from "@constants";
import { useDiscContext } from "@hooks";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Autocomplete, Checkbox, TextField } from "@mui/material";
import { getArrayIntersection } from "@util";

import type { FilterOptions } from "@types";

export const Filters = () => {
	const [filterOptions, setFilterOptions] = useState<FilterOptions>({
		names: [],
		brands: [],
		categories: [],
		stabilities: [],
		speeds: [],
		glides: [],
		turns: [],
		fades: []
	});

	const { discs, setFilteredDiscs, filterValues, setFilterValues, selectedBag, view } = useDiscContext();

	useEffect(() => {
		const bagDiscs = selectedBag ? discs.filter(disc => selectedBag.discs.includes(disc.id)) : [];
		const baseDiscs = view === View.BAGS ? bagDiscs : discs;
		const { name, brands, categories, stabilities, speeds, glides, turns, fades } = filterValues;
		const discsFilteredByName = baseDiscs.filter(
			disc => !name || disc.name.toLowerCase().includes(name.toLowerCase())
		);
		const discsFilteredByBrand = baseDiscs.filter(disc => brands.length === 0 || brands.includes(disc.brand));
		const discsFilteredByCategory = baseDiscs.filter(
			disc => categories.length === 0 || categories.includes(disc.category)
		);
		const discsFilteredByStability = baseDiscs.filter(
			disc => stabilities.length === 0 || stabilities.includes(disc.stability)
		);
		const discsFilteredBySpeed = baseDiscs.filter(disc => speeds.length === 0 || speeds.includes(disc.speed));
		const discsFilteredByGlide = baseDiscs.filter(disc => glides.length === 0 || glides.includes(disc.glide));
		const discsFilteredByTurn = baseDiscs.filter(disc => turns.length === 0 || turns.includes(disc.turn));
		const discsFilteredByFade = baseDiscs.filter(disc => fades.length === 0 || fades.includes(disc.fade));
		const discsFiltered = getArrayIntersection(
			discsFilteredByName,
			discsFilteredByBrand,
			discsFilteredByCategory,
			discsFilteredByStability,
			discsFilteredBySpeed,
			discsFilteredByGlide,
			discsFilteredByTurn,
			discsFilteredByFade
		);
		setFilterOptions({
			names: [...new Set(discsFiltered.map(disc => disc.name))],
			brands: [
				...new Set(
					getArrayIntersection(
						discsFilteredByName,
						discsFilteredByCategory,
						discsFilteredByStability,
						discsFilteredBySpeed,
						discsFilteredByGlide,
						discsFilteredByTurn,
						discsFilteredByFade
					)
						.map(disc => disc.brand)
						.sort()
				)
			],
			categories: [
				...new Set(
					getArrayIntersection(
						discsFilteredByName,
						discsFilteredByBrand,
						discsFilteredByStability,
						discsFilteredBySpeed,
						discsFilteredByGlide,
						discsFilteredByTurn,
						discsFilteredByFade
					)
						.map(disc => disc.category)
						.sort()
				)
			],
			stabilities: [
				...new Set(
					getArrayIntersection(
						discsFilteredByName,
						discsFilteredByBrand,
						discsFilteredByCategory,
						discsFilteredBySpeed,
						discsFilteredByGlide,
						discsFilteredByTurn,
						discsFilteredByFade
					)
						.map(disc => disc.stability)
						.sort()
				)
			],
			speeds: [
				...new Set(
					getArrayIntersection(
						discsFilteredByName,
						discsFilteredByBrand,
						discsFilteredByCategory,
						discsFilteredByStability,
						discsFilteredByGlide,
						discsFilteredByTurn,
						discsFilteredByFade
					)
						.map(disc => disc.speed)
						.sort((a, b) => parseFloat(a) - parseFloat(b))
				)
			],
			glides: [
				...new Set(
					getArrayIntersection(
						discsFilteredByName,
						discsFilteredByBrand,
						discsFilteredByCategory,
						discsFilteredByStability,
						discsFilteredBySpeed,
						discsFilteredByTurn,
						discsFilteredByFade
					)
						.map(disc => disc.glide)
						.sort((a, b) => parseFloat(a) - parseFloat(b))
				)
			],
			turns: [
				...new Set(
					getArrayIntersection(
						discsFilteredByName,
						discsFilteredByBrand,
						discsFilteredByCategory,
						discsFilteredByStability,
						discsFilteredBySpeed,
						discsFilteredByGlide,
						discsFilteredByFade
					)
						.map(disc => disc.turn)
						.sort((a, b) => parseFloat(a) - parseFloat(b))
				)
			],
			fades: [
				...new Set(
					getArrayIntersection(
						discsFilteredByName,
						discsFilteredByBrand,
						discsFilteredByCategory,
						discsFilteredByStability,
						discsFilteredBySpeed,
						discsFilteredByGlide,
						discsFilteredByTurn
					)
						.map(disc => disc.fade)
						.sort((a, b) => parseFloat(a) - parseFloat(b))
				)
			]
		});
		setFilteredDiscs(discsFiltered);
	}, [discs, setFilteredDiscs, filterValues, view, selectedBag]);

	return (
		<div className="filters">
			<Autocomplete
				className="filter"
				options={filterOptions.names}
				freeSolo
				renderInput={params => <TextField {...params} label="name" placeholder="name" />}
				value={filterValues.name}
				onInputChange={(_e: SyntheticEvent, value: string) =>
					setFilterValues(current => ({ ...current, name: value }))
				}
			/>
			<Autocomplete
				className="filter"
				multiple
				options={filterOptions.brands}
				disableCloseOnSelect
				getOptionLabel={option => option}
				renderOption={(props, option, { selected }) => (
					<li {...props} key={filterOptions.brands.indexOf(option)}>
						<Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
						{option}
					</li>
				)}
				renderInput={params => <TextField {...params} label="brand" placeholder="brand" />}
				value={filterValues.brands}
				onChange={(_e: SyntheticEvent, value: string[]) =>
					setFilterValues(current => ({ ...current, brands: value }))
				}
			/>
			<Autocomplete
				className="filter"
				multiple
				options={filterOptions.categories}
				disableCloseOnSelect
				getOptionLabel={option => option}
				renderOption={(props, option, { selected }) => (
					<li {...props} key={filterOptions.categories.indexOf(option)}>
						<Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
						{option}
					</li>
				)}
				renderInput={params => <TextField {...params} label="category" placeholder="category" />}
				value={filterValues.categories}
				onChange={(_e: SyntheticEvent, value: string[]) =>
					setFilterValues(current => ({ ...current, categories: value }))
				}
			/>
			<Autocomplete
				className="filter"
				multiple
				options={filterOptions.stabilities}
				disableCloseOnSelect
				getOptionLabel={option => option}
				renderOption={(props, option, { selected }) => (
					<li {...props} key={filterOptions.stabilities.indexOf(option)}>
						<Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
						{option}
					</li>
				)}
				renderInput={params => <TextField {...params} label="stability" placeholder="stability" />}
				value={filterValues.stabilities}
				onChange={(_e: SyntheticEvent, value: string[]) =>
					setFilterValues(current => ({ ...current, stabilities: value }))
				}
			/>
			<Autocomplete
				className="filter"
				multiple
				options={filterOptions.speeds}
				disableCloseOnSelect
				getOptionLabel={option => option}
				renderOption={(props, option, { selected }) => (
					<li {...props} key={filterOptions.speeds.indexOf(option)}>
						<Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
						{option}
					</li>
				)}
				renderInput={params => <TextField {...params} label="speed" placeholder="speed" />}
				value={filterValues.speeds}
				onChange={(_e: SyntheticEvent, value: string[]) =>
					setFilterValues(current => ({ ...current, speeds: value }))
				}
			/>
			<Autocomplete
				className="filter"
				multiple
				options={filterOptions.glides}
				disableCloseOnSelect
				getOptionLabel={option => option}
				renderOption={(props, option, { selected }) => (
					<li {...props} key={filterOptions.glides.indexOf(option)}>
						<Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
						{option}
					</li>
				)}
				renderInput={params => <TextField {...params} label="glide" placeholder="glide" />}
				value={filterValues.glides}
				onChange={(_e: SyntheticEvent, value: string[]) =>
					setFilterValues(current => ({ ...current, glides: value }))
				}
			/>
			<Autocomplete
				className="filter"
				multiple
				options={filterOptions.turns}
				disableCloseOnSelect
				getOptionLabel={option => option}
				renderOption={(props, option, { selected }) => (
					<li {...props} key={filterOptions.turns.indexOf(option)}>
						<Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
						{option}
					</li>
				)}
				renderInput={params => <TextField {...params} label="turn" placeholder="turn" />}
				value={filterValues.turns}
				onChange={(_e: SyntheticEvent, value: string[]) =>
					setFilterValues(current => ({ ...current, turns: value }))
				}
			/>
			<Autocomplete
				className="filter"
				multiple
				options={filterOptions.fades}
				disableCloseOnSelect
				getOptionLabel={option => option}
				renderOption={(props, option, { selected }) => (
					<li {...props} key={filterOptions.fades.indexOf(option)}>
						<Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
						{option}
					</li>
				)}
				renderInput={params => <TextField {...params} label="fade" placeholder="fade" />}
				value={filterValues.fades}
				onChange={(_e: SyntheticEvent, value: string[]) =>
					setFilterValues(current => ({ ...current, fades: value }))
				}
			/>
		</div>
	);
};

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
