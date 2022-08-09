import { BASE_API } from '../utils/constants';


// Conectando el Login de la API con el Frontend
export async function loginAPI(formValue) {

    try {
        const url = `${BASE_API}/api/auth/login/`;
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formValue)
        };
        const response = await fetch(url, params);

        if (response.status !== 200) {;
            throw new Error('Usuario o Contraseña incorrectos');
        };

        const result = await response.json();
        return result;
        
    } catch (error) {
        throw new Error(error);
    }
}


// Obteniendo los datos del usuario desde la API
export async function getMeApi(token){

    try {
        const url = `${BASE_API}/api/auth/me/`;
        const params = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const response = await fetch(url, params);
        const result = await response.json();
        return result;

    } catch (error) {
        throw error;
    }
}


// Obteniendo lista de usuarios desde la API
export async function getUsersApi(token){
    
    try {
        const url = `${BASE_API}/api/users/`;
        const params = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        const response = await fetch(url, params);
        const result = await response.json();
        return result;

    } catch (error) {
        throw error;
    };
}


// Funcion para Crear Usuarios
export async function createUserApi(data, token){
        try {
            const url = `${BASE_API}/api/users/`;
            const params = {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };
    
            const response = await fetch(url, params);
            const result = await response.json();
            return result;
    
        } catch (error) {
            throw error;
        }
}


// Funcion para Actualizar Usuarios
export async function updateUserApi(id, data, token){
    try {
        const url = `${BASE_API}/api/users/${id}/`;
        const params = {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(url, params);
        const result = await response.json();
        return result;

    } catch (error) {
        throw error;
    }
}

// Función para Eliminar Usuarios
export async function deleteUserApi(id, token){
    try {
        const url = `${BASE_API}/api/users/${id}/`;
        const params = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        const response = await fetch(url, params);
        const result = await response.json();
        return result;

    } catch (error) {
        throw error;
    }
}
