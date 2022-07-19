import React from "react";
import { useLocation } from "react-router-dom";
/**
 * Página padrão quando não localizada a página.
 */
const PageNotFoundComponent: React.FC = () => {
  const location = useLocation();
  return (
    <div>
      <h3>
        Página não localizada <code>{location.pathname}</code>
      </h3>
    </div>
  );
};
export default PageNotFoundComponent;
