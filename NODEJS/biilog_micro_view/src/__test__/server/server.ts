import { createServer, RestSerializer, Model } from "miragejs";
import { userRoutes } from "./serverUser";
import { listCompanyMock, companyRoutes } from "./serverCompany";
import { listOperatorMock, operatorRoutes } from "./serverOperator";
import { listUserMock } from "./serverUser";
import { listGroupMock, groupRoutes } from "./serverGroup";
import { listForkliftMock, forkliftRoutes } from "./serverForklift";
import { listPlaceMock, placeRoutes } from "./serverPlace";

let isEmpty = false;
// variável para resposta vazia, impede alimentar com array original.
/**
 *
 * @param {boolean} empty
 */
export const forceEmpty = (empty: boolean) => {
  // console.info("ForceEmpty", empty);
  isEmpty = empty;
};

export const getIsEmpty = () => isEmpty;

// https://miragejs.com/docs/main-concepts/database/
// https://miragejs.com/api/classes/db-collection/
// https://miragejs.com/docs/main-concepts/route-handlers/
export const mockServer = () => {
  return createServer({
    serializers: {
      reminder: RestSerializer.extend({
        include: ["list"],
        embed: true,
      }),
    },
    models: {
      // userCurrent: Model,
      // user: Model,
      user: Model,
      company: Model,
      operator: Model,
      group: Model,
      forklift: Model,
      place: Model,
    },
    seeds(server) {
      // server.db.loadData({ userCurrent: isEmpty ? [] : userCurrentMock });
      server.db.loadData({ users: isEmpty ? [] : listUserMock });
      server.db.loadData({ groups: isEmpty ? [] : listGroupMock });
      server.db.loadData({ companies: isEmpty ? [] : listCompanyMock });
      server.db.loadData({ operators: isEmpty ? [] : listOperatorMock });
      server.db.loadData({ forklifts: isEmpty ? [] : listForkliftMock });
      server.db.loadData({ places: isEmpty ? [] : listPlaceMock });
    },
    routes() {
      this.namespace = "api/v0";
      userRoutes(this);
      companyRoutes(this);
      operatorRoutes(this);
      groupRoutes(this);
      forkliftRoutes(this);
      placeRoutes(this);
      this.passthrough("https://viacep.com.br/ws/**");
    },
  });
};
