declare const GetPockemonList: () => Promise<any>;
declare const GetDetails: (name: string | undefined | number) => Promise<any>;

export { GetDetails, GetPockemonList };
