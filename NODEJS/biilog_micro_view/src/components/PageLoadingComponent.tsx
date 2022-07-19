import React from "react";

export interface IPageLoading {
  pageName?: string;
}

/**
 * Página padrão de Loading, manter o texto "Loading ..." para testes
 */
const PageLoadingComponent: React.FC<IPageLoading> = (props) => {
  let text = "";
  // console.log("LOADING PAGE");
  if (props.pageName) {
    text = `${props.pageName} Loading....`;
  } else {
    text = "Loading page ....";
  }
  return (
    <div>
      <h3>{text}</h3>
    </div>
  );
};
export default PageLoadingComponent;
