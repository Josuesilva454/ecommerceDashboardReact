import React, { useEffect, useState } from "react";
import MainPage from "../../components/MainPage";
import { createCategory,  deleteCategoryById, findAllCategory, updateCategory,  } from "../../services/CategoryService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

const CategoryAdminPage = () => {

    const [Categorys, setCategorys] = useState([]);
    const [CategoryDialog, setCategoryDialog] = useState(false);
    const [deleteCategoryDialog, setDeleteCategoryDialog] = useState(false);
    const [submited, setSubmited] = useState(false);
    const [insertMode, setInsertMode] = useState(false);

    const emptyCategory = {
        id: null,
        name: ""
    }

    const [Category, setCategory] = useState(emptyCategory);

    useEffect(() => {

        load();

    }, []);

    const load = async () => {
        try {
            const response = await findAllCategory();
            setCategorys(response.data);
        } catch (error) {
            console.error(error);
        }
    }



    const openNew = () => {
        setInsertMode(true);
        setCategoryDialog(true);
        setSubmited(false);
        setCategory(emptyCategory);

    }

    const hideDialog = () => {
        setCategoryDialog(false);
        setSubmited(false);
    }

    const hideDeleteDialog = () => {
        setDeleteCategoryDialog(false);
    }

    const editCategory = (Category) => {
        setInsertMode(false);
        setSubmited(false);
        setCategory({ ...Category });
        setCategoryDialog(true);
    }

    const confirmDeleteCategory = (Category) => {
        setCategory(Category);
        setDeleteCategoryDialog(true);
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-text p-button-plain p-mr-2"
                    onClick={() =>  editCategory(rowData)}
                />

                <Button
                    icon="pi pi-times"
                    className="p-button-rounded p-button-text p-button-plain"
                    onClick={() => confirmDeleteCategory(rowData)}
                />
            </React.Fragment>
        )
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < Category.length; i++) {
            if (Categorys[i].id == id) {
                index = i;
                break;
            }
        }

        return index;
    }

    const saveCategory = async () => {
        try {
            setSubmited(true);
            if (Category.name.trim()) {
                if (insertMode) {
                    const response = await createCategory(Category);
                    const data = response.data;
                    const _Categorys = [...Categorys];
                    _Categorys.push(data);
                    setCategorys(_Categorys);
                } else {
                    const response = await updateCategory(Category);
                    const data = response.data;
                    const _Categorys = [...Categorys];
                    const index = findIndexById(data.id);
                    _Categorys[index] = data;
                    setCategorys(_Categorys);
                }

                setInsertMode(false);
                setCategoryDialog(false);
                setCategory(emptyCategory);
                setSubmited(false);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const deleteCategory = async () => {
        try {
            await deleteCategoryById(Category.id);
            let _Categorys = Categorys.filter(val => val.id ==! Category.id);
            setCategorys(_Categorys);
            setDeleteCategoryDialog(false);
            setCategory(emptyCategory);

        } catch (error) {
            console.error(error);
        }
    }

    const CategoryDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar"
                icon="pi pi-times"
                className="p-button-text"
                onClick={hideDialog}
            />
            <Button label="Salvar categoria"
                icon="pi pi-check"
                className="p-button-text"
                onClick={saveCategory}
            />
        </React.Fragment>
    );

    const deleteCategoryDialogFooter = (
        <React.Fragment>
            <Button label="Não"
                icon="pi pi-times"
                className="p-button-text"
                onClick={hideDeleteDialog}
            />
            <Button label="Sim"
                icon="pi pi-check"
                className="p-button-text"
                onClick={deleteCategory}
            />
        </React.Fragment>
    )

    return (
        <MainPage>
            <div className="main-content">
                <div className="content">
                    <div className="content-inner">
                        <div className="content-header">
                            <h2>Categoria</h2>
                            <div className="p-d-inline">
                                <Button
                                    label="Adicionar"
                                    icon="pi pi-plus"
                                    className="p-mr-2"
                                    onClick={openNew}
                                />
                            </div>
                        </div>
                        <div className="content-body">
                            <div className="content-data shadow-1">
                                <DataTable
                                    value={Categorys}
                                    size="small"
                                    className="table-view"
                                    stripedRows>
                                    <Column  field="name" header="Nome Categoria"></Column>
                                    <Column body={actionBodyTemplate}
                                        style={{ width: "120px",  textAlign: "center" }}  
                                    ></Column>
                                </DataTable>
                            </div>
                        </div>

                        <Dialog visible={CategoryDialog}
                            style={{ width: "500px"}}
                            header="Categoria"
                            modal
                            className="p-fluid"
                            onHide={hideDialog}
                            footer={CategoryDialogFooter}>
                            <div className="p-field">
                                <label htmlFor="name">Nome</label>
                                <InputText id="name"
                                    value={Category.name}
                                    onChange={(e) => {
                                        const val = (e.target && e.target.value) || '';
                                        const _Category = { ...Category };
                                        _Category.name = val;
                                        setCategory(_Category);
                                    }}
                                />
                                {submited && !Category.name && <small className="p-error">O nome é obrigatório</small>}
                            </div>
                        </Dialog>

                        <Dialog visible={deleteCategoryDialog}
                            style={{ width: "500px" }}
                            header=   "Confirmar"
                            modal
                            footer={deleteCategoryDialogFooter }
                            onHide={hideDeleteDialog}>
                            <div className="confirmation-content">
                                <i className="pi pi-exclamation-triangle p-mr-3"
                                    style={{ fontSize: "2rem" }}
                                ></i>
                                {Category && <span>Tem certeza de que deseja excluir a categoria  <b>{Category.name}</b>?</span>}
                            </div>
                        </Dialog>
                    </div>

                </div>
            </div>
        </MainPage>
    )

}

export default CategoryAdminPage;