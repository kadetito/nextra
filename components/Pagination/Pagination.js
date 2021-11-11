import React from "react";
import { Pagination as PaginadorSU } from "semantic-ui-react";
import { useRouter } from "next/router";
import queryString from "query-string";

export default function Pagination(props) {
  const { totalArticul, page, limitPerPage } = props;
  const totlPages = Math.floor(totalArticul / limitPerPage);
  const router = useRouter();
  const urlParse = queryString.parseUrl(router.asPath);

  const goToPage = (newPage) => {
    urlParse.query.page = newPage;
    const url = queryString.stringifyUrl(urlParse);
    router.push(url);
  };

  return (
    <div className="pagination__global">
      <PaginadorSU
        defaultActivePage={page}
        totalPages={totlPages}
        firstItem={null}
        lastitem={null}
        onPageChange={(_, data) => goToPage(data.activePage)}
        boundaryRange={0}
        siblingRange={1}
        ellipsisItem={null}
      />
    </div>
  );
}
