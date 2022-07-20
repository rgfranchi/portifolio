import express, { Router } from 'express';
import { baseUrl, port } from './config.js';
import { createTable, del, findAll, findBy, findById, login, save } from './userRepository.js';
import basicAuth from 'express-basic-auth';

const server = express();
server.use(express.json());
const router = Router();

// verifica aplicação para inicialização.
if(!createTable()){
    process.exit();
}

router.use(basicAuth({
    users: { 'admin': 'supersecret' }
}))

router.post('/create', async (req, res) => {
    console.log('CREATE',req.body);
    const resp = await save(req.body);
    return res.json( { message: resp  } );
});

router.put('/update',async (req, res) => {
    console.log('UPDATE',req.body);
    const resp = await save(req.body);
    return res.json( { message: 'Update'  } );
});

router.get('/find_all',async (req, res) => {
    console.log('FIND ALL',req.body);
    const resp = await findAll();
    return res.json( resp );
});

router.get('/find_by_id/:id', async (req, res) => {
    console.log('FIND BY ID',req.params.id);
    const resp = await findById(req.params.id);
    return res.json( resp );
});


router.get('/find_by', async (req, res) => {
    console.log('FIND BY',req.query);
    const resp = await findBy(req.query);
    return res.json( resp );
});

router.post('/login', async (req, res) => {
    console.log('LOGIN',req.body);
    const resp = await login(req.body);
    return res.json( { login: resp  } );
});


router.delete('/delete/:id',async (req, res) => {
    console.log('DELETE ID',req.params.id);
    const resp = await del(req.params.id);
    return res.json( { message: resp  } );
});

server.use(baseUrl, router);

server.listen(port, () => {
    console.log("Teste Easytech: Rafael Guerra Franchi:" + port);
});

