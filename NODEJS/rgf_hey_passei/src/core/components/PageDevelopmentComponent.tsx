import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

/**
 * Página padrão quando não localizada a página.
 */
const PageDevelopmentComponent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div>
      <h3>
        Página em desenvolvimento <code>{location.pathname}</code>
      </h3>
      <h4>
        <Link to="#" onClick={() => navigate(-1)}>
          VOLTAR
        </Link>
      </h4>
    </div>
  );
};
export default PageDevelopmentComponent;
