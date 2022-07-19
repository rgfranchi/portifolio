import React from "react";
import { useLocation, useHistory, Link } from "react-router-dom";

/**
 * Página padrão quando não localizada a página.
 */
const PageDevelopmentComponent: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  return (
    <div>
      <h3>
        Página em desenvolvimento <code>{location.pathname}</code>
      </h3>
      <h4>
        <Link to="#" onClick={() => history.goBack()}>
          VOLTAR
        </Link>
      </h4>
    </div>
  );
};
export default PageDevelopmentComponent;
