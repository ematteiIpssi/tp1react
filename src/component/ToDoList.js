import React, { useEffect, useState } from 'react'

export default function ToDoList() {
    const ls = localStorage
    const [tasks, setTasks] = useState([]);   //La liste des taches
    const [inputValue, setInputValue] = useState('');// La tâche qu'on crée

    const handleInputChange = (e) => { // maj de la valeur de l'input
        setInputValue(e.target.value);
    };

    useEffect(() => { //initer le localstorage et remplire tache si local storage pas vide
        if (ls.getItem("tasks") !== null)
            setTasks(ls.getItem("tasks").split(','))
    }, [])

    const handleAddTask = () => { //Ajout de la valeur de l'input a la liste des tâches
        if (inputValue !== '') { // on verifie que ce n'est pas vide
            setTasks([...tasks, inputValue]); //ajout à la suite de la liste
            setInputValue(''); // remet l'input a vide
            if (ls.getItem("tasks") !== null) //ajouter au local storage
                ls.setItem("tasks", ls.getItem("tasks") + "," + inputValue) //on met à la chaine
            else
                ls.setItem("tasks", inputValue) //première valeur pour initialiser
        }
    };

    const handleRemoveTask = (index) => { //suprimmer
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
        ls.setItem("tasks",newTasks) //affecter au local storage
    };


    return (
        <>
            <h1>Ma liste de tâches</h1>
            <div>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange} //a chaque changement on met à jour pour récupérer la tache crée par l'utilisateur
            />
            <button onClick={handleAddTask}>Ajouter</button> {/* Appelle de la fonction pour add*/}
            </div>
            <div className='list'>
                {tasks.map((task, index) => (
                    <span key={index}>
                        {task}
                        <button onClick={() => handleRemoveTask(index)}>Supprimer</button>  {/* Appelle de la fonction pour suprimmer*/}
                    </span>
                ))}
            </div>
        </>
    );


}
