import { GetStaticProps, GetStaticPaths } from "next";
import  styles from './index.module.css'
import { useSelector } from "react-redux";
import { GetDetails, GetPockemonList } from "pokedex-utils";
import { Nextstore } from "@/store/store";
import { PokemonDetailAPI, selectPokemonDetailData } from "@/store/PokemonDetail";
import { POkemonCard } from "components";
import { useRouter } from 'next/router';
import Link from "next/link";

type Row = {
    name: string;
    url: string;
  };
 type Detail = {
    name: string;
    sprites: object | undefined;
    height: number;
    weight: number;
    location_area_encounters: string;
    abilities: [];
  };
const PokemonDetail = () => {
  const data=useSelector(selectPokemonDetailData) as Detail

  return (
    <div>
     <h1 className={styles.header}>POKEMON DETAIL PAGE</h1>
     <button className={styles.button} ><Link href='/'>Back to previous page</Link></button>
     <div className={styles.card}>

     <POkemonCard name={data?.name} height={data?.height} weight={data?.weight} location="mumbai" abilities={data?.abilities}/>
     </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await GetPockemonList();
  const paths = data?.results?.map((pokemon: Row) => ({
    params: { name: pokemon?.name },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = Nextstore.getStaticProps(
  (store) => async (value) => {
    const data: any = await store.dispatch(
      PokemonDetailAPI(value?.params?.name as string)
    );
    if (!data) {
      return {
        props: {},
        notFound: true,
      };
    }
    return {
      props: {},
    };
  }
);

export default PokemonDetail;
