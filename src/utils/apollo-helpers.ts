import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type MutationKeySpecifier = ('createRestaurant' | 'updateRestaurant' | 'upsertNeeds' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	createRestaurant?: FieldPolicy<any> | FieldReadFunction<any>,
	updateRestaurant?: FieldPolicy<any> | FieldReadFunction<any>,
	upsertNeeds?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NeedsKeySpecifier = ('chn' | 'date' | 'flour' | 'jpn' | 'kor' | NeedsKeySpecifier)[];
export type NeedsFieldPolicy = {
	chn?: FieldPolicy<any> | FieldReadFunction<any>,
	date?: FieldPolicy<any> | FieldReadFunction<any>,
	flour?: FieldPolicy<any> | FieldReadFunction<any>,
	jpn?: FieldPolicy<any> | FieldReadFunction<any>,
	kor?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('getNeeds' | 'getRestaurantByName' | 'recommendRestaurants' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	getNeeds?: FieldPolicy<any> | FieldReadFunction<any>,
	getRestaurantByName?: FieldPolicy<any> | FieldReadFunction<any>,
	recommendRestaurants?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RestaurantKeySpecifier = ('beginTime' | 'dist' | 'endTime' | 'id' | 'landAddress' | 'lastVisitAt' | 'lat' | 'localRate' | 'lon' | 'name' | 'reviewCount' | 'reviewRateAvg' | 'roadAddress' | 'score' | 'tags' | 'thumbnailUrl' | 'type' | RestaurantKeySpecifier)[];
export type RestaurantFieldPolicy = {
	beginTime?: FieldPolicy<any> | FieldReadFunction<any>,
	dist?: FieldPolicy<any> | FieldReadFunction<any>,
	endTime?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	landAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	lastVisitAt?: FieldPolicy<any> | FieldReadFunction<any>,
	lat?: FieldPolicy<any> | FieldReadFunction<any>,
	localRate?: FieldPolicy<any> | FieldReadFunction<any>,
	lon?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	reviewCount?: FieldPolicy<any> | FieldReadFunction<any>,
	reviewRateAvg?: FieldPolicy<any> | FieldReadFunction<any>,
	roadAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	score?: FieldPolicy<any> | FieldReadFunction<any>,
	tags?: FieldPolicy<any> | FieldReadFunction<any>,
	thumbnailUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	Needs?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NeedsKeySpecifier | (() => undefined | NeedsKeySpecifier),
		fields?: NeedsFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	Restaurant?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RestaurantKeySpecifier | (() => undefined | RestaurantKeySpecifier),
		fields?: RestaurantFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;