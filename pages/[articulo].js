import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import BasicLayout from "../layouts/BasicLayout";
import { getItemByURL } from "../api/articulo";
import HeaderArticulo from "../components/HeaderArticulo";

export default function Articulo() {
  const [article, setArticle] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    (async () => {
      const response = await getItemByURL(query.articulo);
      setArticle(response);
    })();
  }, [query]);

  if (!article) {
    return null;
  }

  return (
    <BasicLayout className="articulo__unico-global">
      <HeaderArticulo articulo={article} />
    </BasicLayout>
  );
}
