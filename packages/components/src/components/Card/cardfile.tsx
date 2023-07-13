import React from "react";
import styles from './cardfile.module.css'
export type Props = {
  name: string;
  height?: number;
  weight?: number;
  location?: string;
  abilities?: (string | number | undefined |any)[]
};
const PokemonCard = (props:Props) => {
  const { name, height, weight, abilities } = props;

  return (
    <div>
     <div className={styles.card}>
  <div className={styles.container}>
    <h4 className={styles.header}><b>POKEMON NAME: {name}</b></h4> 
    <p className={styles.header}>Weight:{weight}</p> 
    <p className={styles.header}>Height:{height}</p> 
    <div className={styles.header}>
    <table>
  <tr>
    <th>Sr.NO</th>
    <th>Ability Name</th>
    <th>is_hidden</th>
    <th>slot</th>

  </tr>
  {
    abilities?.map((ele,index)=>(

  <tr>
    <td>{index+1}</td>
    <td>{ele?.ability?.name}</td>
    <td>{ele?.is_hidden}</td>
    <td>{ele?.slot}</td>

  </tr>
    ))
  }
  </table>
    </div>

  </div>
</div>
    </div>
  );
};

export default PokemonCard;
