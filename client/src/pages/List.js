import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useLocation } from 'react-router-dom';
import { BOARD_DETAILS } from "../utils/queries";
import { ADD_LIST } from "../utils/mutations";
import ListCard from "../components/ListCard";



function List() {

   
    const location = useLocation();
    const { boardParam } = location.state;
    const [listTitle, setListTitle] = useState('');
    const [parentListId, setParentListId] = useState('');
    const [showFrom, setShowForm] = useState(false);
    const [showListFrom, setShowListForm] = useState(false);
    const [errorMessage, setErrorMessage] = useState('Title Required');

    const { loading, data } = useQuery(BOARD_DETAILS, {
        variables: { boardId: boardParam },
    });

    const boards = data?.boards || [];

    const openForm = async (e) => {
        e.stopPropagation();
        setShowForm(!showFrom);
    }

    const openListForm = () => {
        setShowListForm(!showListFrom);
    }

    const [addList, { error2, data2 }] = useMutation(ADD_LIST);
  
    const handleAddList = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        console.log(listTitle);
        console.log(parentListId);

        if (!listTitle) {
            e.preventDefault();
            setErrorMessage('Title required/Press Cancel');
            return;
        }
        try {
            const { data } = await addList({
                variables: { lTitle: listTitle, boardId: parentListId },
            });

        } catch (error) {
            console.log(error);
        }
        window.location.reload();
        console.log(`List ${listTitle} created`);
        setListTitle('');

    };

    const handleListInput = (e) => {
        // Getting the value and name of the input which triggered the change
        const { value, id } = e.target;
        setListTitle(value);
        setParentListId(id);
    };
  
    return (

        <div className="my-2">

            <h4 className="text-white">{boards.bTitle}</h4>
            {showListFrom ? (

                <form className="form form-width">
                    <input className="form-input" id={boards._id} type='text' name="listTitle" onChange={handleListInput} value={listTitle} placeholder="List Title"></input>

                    <button className="btn btn-light m-1" onClick={openForm}>Cancel</button>
                    <button className="btn btn-light m-1" onClick={handleAddList}>Add </button>
                </form >

            ) : (
                <button type="button" id={boards._id} className="btn btn-lg btn-light m-2" onClick={openListForm}>Add List</button>
            )}

            <div>
                {loading ? (
                    <div> Loading...</div>
                ) : (

                    <ListCard boards={boards} />
                )}

            </div>

        </div>
    )
};
export default List;


