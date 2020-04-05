import Link from "next/link";
import fetch from "node-fetch";

const api = "https://pomber.github.io/covid19/";
const DATA = api + "timeseries.json";

export async function getStaticPaths() {
  const response = await fetch(DATA);
  const data = await response.json();
  const countries = Object.keys(data);
  return {
    paths: countries.map((name) => ({
      params: { name },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { name } = context.params;
  const response = await fetch(DATA);
  const data = await response.json();
  const rows = data[name];
  return { props: { name, rows } };
}

import { Stream } from "@nivo/stream";

export default function Country({ name, rows }) {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>{name}</h1>
      <Stream
        data={rows}
        width={390}
        height={160}
        keys={["deaths", "confirmed"]}
        offsetType="diverging"
        colors={{ scheme: "pastel1" }}
        enableGridX={false}
      />
      <Link href="/">
        <a>Go Back</a>
      </Link>
    </>
  );
}
