import { database } from './config.js';
import sql from './database.js';

export const createTable = async () => {
    const pg_database = await sql`SELECT datname FROM pg_database WHERE datname = ${database.database}`;
    // verifica se existe o banco de dados.
    if(pg_database.count != 1) {
        console.error(`Criar banco de dados Postgres ${database.database}`);
        return false;
    }
    await sql`CREATE TABLE IF NOT EXISTS usuario (id SERIAL PRIMARY KEY NOT NULL, nome TEXT, telefone TEXT, email TEXT, data_criacao TIMESTAMP, senha TEXT)`;
    return true;
}

export const save = async (data) => {
    let ret = ""
    data.senha = Buffer.from(data.senha).toString("base64");
    try{
        if((typeof data.id == 'undefined')) {
            ret = "CREATED";
            await sql`INSERT INTO usuario ${ sql(data) }`;
        } else {
            ret = "UPDATE";
            await sql`UPDATE usuario SET ${ sql(data) } where id = ${data.id}`;
        }
    } catch (e){
        console.error(e);
        return "FALHA AO INSERIR USUÁRIO"
    }
    return ret;
} 

export const findAll = async () => {
    let ret = []
    try{
        console.log("FIND ALL");
        ret = await sql`SELECT * FROM usuario`;
    } catch (e){
        console.error(e);
        return "FALHA AO BUSCAR USUÁRIOS"
    }
    console.log(ret);
    return ret;
    
} 

export const findById = async (id) => {
    let ret = []
    try{
        console.log("FIND BY ID");
        ret = await sql`SELECT * FROM usuario WHERE id = ${id}`;
    } catch (e){
        console.error(e);
        return "FALHA AO BUSCAR USUÁRIO"
    }
    console.log(ret);
    return ret;
} 

export const findBy = async (param) => {

    let conditions = [];
    conditions = null;
    if((typeof param.nome !== 'undefined')) {
        conditions = sql`nome LIKE ${'%' + param.nome + '%'}`;
    }
    if((typeof param.telefone !== 'undefined')) {
        conditions = sql`telefone = ${param.telefone}`;
    }
    if((typeof param.email !== 'undefined')) {
        conditions = sql`email = ${param.email}`;
    }
    if((typeof param.data_criacao !== 'undefined')) {
        conditions = sql`data_criacao = ${param.data_criacao}`;
    }

    let ret = []

    try{
        console.log("FIND BY ID");
        ret = await sql`SELECT * FROM usuario ${conditions !== null ? sql`WHERE ${conditions}` : sql``}`;
    } catch (e){
        console.error(e);
        return "FALHA AO BUSCAR USUÁRIO"
    }
    console.log(ret);
    return ret;
} 

export const login = async (data) => {
    let ret = null;
    const senha = Buffer.from(data.senha).toString("base64");
    try{
        ret = await sql`SELECT * FROM usuario WHERE email = ${data.email} AND senha = ${senha} limit 1`;
    } catch (e){
        console.error(e);
        return "FALHA AO LOGAR"
    }
    console.log(ret);
    return ret['count'] == '1' ? ret : false;
} 


export const del = async (id) => {
    try{
        console.log("DELETE BY ID");
        await sql`DELETE FROM usuario WHERE id = ${id}`;
    } catch (e){
        console.error(e);
        return "FALHA AO EXCLUIR USUÁRIO"
    }
    return "DELETED";
} 
