import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
const inter = Inter({ subsets: ["latin"] });
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import {
  PockemonListing,
  SelectListingData,
  selectCount,
} from "../store/ListingSlice";
import { useSelector } from "react-redux";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { String } from "@/constants/constants";
import ListTable from "../components/DataGridTable/ListTable";
import { useEffect, useState } from "react";
import { GetPockemonList } from "pokedex-utils";
import { Nextstore } from "@/store/store";
import Link from "next/link";
import { Pagination } from "@mui/material";
 type Row = { name: string; url: string };

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Pokemon Name",
    colSpan: 8,
    align: "center",
    headerAlign: "center",
    width: 300,
    editable: false,
    renderCell: (params) => (
      <Link legacyBehavior href={params.value}>
        <a>{params.value}</a>
      </Link>
    ),
  },
];

export default function Home() {
  const router = useRouter();
  const list = useSelector(SelectListingData);
  const pokemonCount = useSelector(selectCount);

  const RedirectToDetailPage = (row: Row) => {
    router.push(`/${row?.name}`);
  };

  return (
    <>
      <div>
        <h1 className={styles.table}>{String.TableName}</h1>
        {list && list?.length && (
          <ListTable
            rows={list}
            columns={columns}
            count={pokemonCount}
            getRowId={(row: any) => row.name}
            onRowClick={RedirectToDetailPage}
          />
        )}

      </div>
    </>
  );
}
export const getServerSideProps = Nextstore.getServerSideProps(
  (store) => async ({}) => {
    await store.dispatch(PockemonListing());
    return {
      props: {},
    };
  }
);
