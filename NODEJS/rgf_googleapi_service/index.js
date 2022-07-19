import express, { Router } from "express";
import { driveBaseUrl, port } from "./config/config.js";
import {
  createFile,
  getFile,
  updateFile,
  deleteFile,
  listFile,
} from "./googleDrive.js";
import {
  deleteTemporaryFiles,
  fileBase64_to_ReadStream,
  fileBase64_encode,
  createStream,
} from "./fileConverter.js";

const app = express();

app.use(express.json({ limit: "50mb" }));

const router = Router();

// all requests to this router will first hit this middleware
router.use(function (req, res, next) {
  console.log("method:%s |url %s|path %s", req.method, req.url, req.path);
  res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  // res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );

  //

  next();
});

router.post("/create", async (req, res) => {
  console.log("CREATE:", req.body);
  const fileStream = fileBase64_to_ReadStream(req.body.base64, req.body.name);
  await createFile(
    {
      name: req.body.name,
      parents: req.body.parents,
    },
    {
      mimeType: req.body.mimeType,
      body: fileStream,
    }
  )
    .then((google_res) => {
      res.json(google_res.data);
    })
    .catch((google_err) => {
      console.log("ERROR:", google_err.code);
      res.statusCode = google_err.code;
      res.json(google_err.errors);
    })
    .finally(() => deleteTemporaryFiles());
});

router.get("/read", async (req, res) => {
  console.log("fileId:", req.query.fileId);
  const fileName = req.query.name;
  let fileCreate = "";
  let base64 = "empty";
  await getFile(req.query.fileId, createStream(fileName))
    .then(async (google_res) => {
      console.log("THEN", google_res.status);
      res.status(google_res.status);
      fileCreate = google_res.path;
      base64 = await fileBase64_encode(fileCreate);
      res.json({ data: base64 });
    })
    .catch((google_err) => {
      console.log("ERROR:", google_err.code);
      res.status(google_err.code);
      res.json({ error: "FALHA AO CARREGAR ARQUIVO." });
    })
    .finally(async () => {
      console.log("FINAL");
      deleteTemporaryFiles();
    });
});

router.put("/update", async (req, res) => {
  console.log("fileId:", req.body.fileId);
  const fileStream = fileBase64_to_ReadStream(req.body.base64, req.body.name);
  await updateFile(
    req.body.fileId,
    {
      name: req.body.name,
      addParents: req.body.parents,
    },
    {
      mimeType: req.body.mimeType,
      body: fileStream,
    }
  )
    .then((google_res) => {
      console.log("THEN", google_res.statusText);
      res.status(google_res.status);
      res.json(google_res.data);
    })
    .catch((google_err) => {
      console.log("ERROR:", google_err);
      res.status(google_err.code);
      res.json(google_err.errors);
    });
});

router.delete("/delete", async (req, res) => {
  console.log("fileId:", req.query.fileId);
  await deleteFile(req.query.fileId)
    .then((google_res) => {
      console.log("THEN", google_res.statusText);
      res.status(google_res.status);
      res.json({ data: "OK" });
    })
    .catch((google_err) => {
      console.log("ERROR:", google_err.code);
      res.status(google_err.code);
      res.json(google_err.errors);
    })
    .finally(() => {
      console.log("FILE DELETED");
    });
});

/**
 * Lista arquivos.
 * Como recuperar apenas os arquivos na pasta.
 */
router.get("/list", async (req, res) => {
  console.log("LIST");
  await listFile()
    .then((google_res) => {
      console.log("THEN", google_res.statusText);
      res.status(google_res.status);
      res.json({ data: google_res.data });
    })
    .catch((google_err) => {
      console.log("ERROR:", google_err.code);
      res.status(google_err.code);
      res.json(google_err.errors);
    })
    .finally(() => {
      console.log("FILE LISTED");
    });
});

// app.use(express.bodyParser({ limit: "50mb" }));

app.use(driveBaseUrl, router);

app.listen(port, () => {
  console.log("RGF Google Server app listen port:" + port);
});
