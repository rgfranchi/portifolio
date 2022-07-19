import {
  ICompanySlice,
  IReduxAction,
  IReduxDispatch,
} from "../interfaces/ReduxInterface";

const initialState: ICompanySlice[] = [];

export default function companyReducer(
  state = initialState,
  action: IReduxAction<ICompanySlice>
) {
  //  console.log("companyReducer", action);
  //  console.log("companyReducer", state);
  switch (action.type) {
    case "company/companiesLoaded": {
      return action.payload;
    }
    case "company/companyCreate": {
      return [...state, action.payload];
    }
    case "company/companyUpdate": {
      const id = action.payload?.id || 0;
      return state.map((item) => {
        // Find the item with the matching id
        if (item.id === id) {
          // Return a new object
          return action.payload;
        }
        return item;
      });
    }
    case "company/companyDelete": {
      const id = action.payload?.id || 0;
      return state.filter((company) => {
        if (company.id.toString() !== id.toString()) {
          return company;
        }
        return null;
      });
    }
    case "company/destroy": {
      return initialState;
    }
    default:
      return state;
  }
}

// Trunk Function
export const fetchCompanies = (values: ICompanySlice[]) => {
  // const response = await getDropdown();
  // if (response.status !== 200) {
  //   console.log("Falha ao carregar empresas REDUX");
  // }
  return function fetch(dispatch: IReduxDispatch<ICompanySlice[]>) {
    dispatch({ type: "company/companiesLoaded", payload: values });
  };
};

// Trunk Function
export function createCompany(value: ICompanySlice) {
  return function create(dispatch: IReduxDispatch<ICompanySlice>) {
    dispatch({ type: "company/companyCreate", payload: value });
  };
}

// Trunk Function
export function updateCompany(value: ICompanySlice) {
  return function update(dispatch: IReduxDispatch<ICompanySlice>) {
    dispatch({ type: "company/companyUpdate", payload: value });
  };
}

// Trunk Function
export function dropCompany(id: number) {
  const value = { id: id, nome: "" };
  return function del(dispatch: IReduxDispatch<ICompanySlice>) {
    dispatch({ type: "company/companyDelete", payload: value });
  };
}

// Trunk Function
export function destroyCompany() {
  return function destroy(dispatch: IReduxDispatch<null>) {
    dispatch({ type: "company/destroy" });
  };
}
