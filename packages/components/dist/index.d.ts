type Props = {
    name: string;
    height?: number;
    weight?: number;
    location?: string;
    abilities?: (string | number | undefined | any)[];
};
declare const PokemonCard: (props: Props) => JSX.Element;

export { PokemonCard as POkemonCard };
