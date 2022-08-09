import React, { useEffect, useState } from 'react';
import { useUser } from '../../hooks';
import { HeaderPage, TableUsers, AddEditUserForm } from '../../components/Admin';
import { Loader } from 'semantic-ui-react';
import { ModalBasic } from '../../components/Common';


export function UsersAdmin() {
  const { getUsers, loading, users, deleteUser } = useUser();
  const [titleModal, setTitleModal] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);
  const [reFetch, setRefetch] = useState(false);
  
  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, [reFetch])

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onReFetch = () => setRefetch((prev) => !prev);

  const createUser = () => {
    setTitleModal('Crear Usuario');
    setContentModal(<AddEditUserForm onClose={ openCloseModal } onReFetch={ onReFetch } />);
    openCloseModal();
  }
  
  const updateUser = (data) => {
    setTitleModal('Editar Usuario');
    setContentModal(<AddEditUserForm onClose={ openCloseModal } onReFetch={ onReFetch } user={ data } />);
    openCloseModal();
  }

  const onDeleteUser = async (data) => {
    const result = window.confirm(`¿Está seguro de eliminar el usuario ${data.username}?`);
    if (result) {
      try {
        await deleteUser(data.id);
        onReFetch();
      } catch (error) {
        throw error;
      }
    };
  }

  return (
    <>

      <HeaderPage 
      title='Usuarios' 
      btnTitle='Nuevo Usuario' 
      btnClick={ createUser } 
      />

      { loading ? (
        <Loader active inline='centered'> Cargando... </Loader>
      ) : (
        <TableUsers users={ users } updateUser={ updateUser } onDeleteUser={ onDeleteUser } />
      )}

      <ModalBasic 
      show={ showModal } 
      onClose={ openCloseModal } 
      title={ titleModal } 
      children={ contentModal }
      />
    </>
  )
}
