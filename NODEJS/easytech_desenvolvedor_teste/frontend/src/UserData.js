import { api } from "./api";


export const findAll = async () => {
    let data = [];
    await api
        .get(`/find_all`)
        .then((resp) => {
            console.log(resp);
            data = resp;
        })
        .catch((error) => {
            console.log(error);
        });

    return data;
}

export const findById = async (id) => {
    let data = [];
    await api
        .get(`/find_by_id/${id}`)
        .then((resp) => {
            console.log(resp);
            data = resp.data;
        })
        .catch((error) => {
            console.log(error);
        });

    return data[0];
}

export const findBy = async (param, value) => {
    let data = [];
    const find = encodeURIComponent(`${param}=${value}`);
    console.log(find);
    await api
        .get(`/find_by?${param}=${value}`)
        .then((resp) => {
            console.log(resp);
            data = resp;
        })
        .catch((error) => {
            console.log(error);
        });
    return data;
}


export const save = async (value) => {
    let data = [];
    if(value.id > 0) {
        await api
            .put('/update', value )
            .then((resp) => {
                console.log(resp);
                data = resp
            })
            .catch((error) => {
                console.log(error);
            });
    } else {
        await api
            .post('/create', value )
            .then((resp) => {
                console.log(resp);
                data = resp
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return data;
}

export const deleteById = async (id) => {
    let data = [];
    await api
        .delete(`/delete/${id}`)
        .then((resp) => {
            console.log(resp);
            data = resp.data;
        })
        .catch((error) => {
            console.log(error);
        });
    return data;
}