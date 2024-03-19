import React, { useEffect, useState } from 'react'

export default function ToDoList() {
    const ls = localStorage
    const [tasks, setTasks] = useState([]);   //La liste des taches
    const [inputValue, setInputValue] = useState('');// La tâche qu'on crée

    const handleInputChange = (e) => { // maj de la valeur de l'input
        setInputValue(e.target.value);
    };

    useEffect(() => {
        if (ls.getItem("tasks") !== null)
            setTasks(ls.getItem("tasks").split(','))
    }, [])

    const handleAddTask = () => { //Ajout de la valeur de l'input a la liste des tâches
        if (inputValue !== '') { // on verifie que ce n'est pas vide
            setTasks([...tasks, inputValue]); //ajout à la suite de la liste
            setInputValue(''); // remet l'input a vide
            if (ls.getItem("tasks") !== null)
                ls.setItem("tasks", ls.getItem("tasks") + "," + inputValue)
            else
                ls.setItem("tasks", inputValue)
        }
    };

    const handleRemoveTask = (index) => { //surp
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
        ls.setItem("tasks",newTasks)
    };


    return (
        <>
            <h1>Ma liste de tâches</h1>
            <div>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
            />
            <button onClick={handleAddTask}>Ajouter</button>
            </div>
            <div className='list'>
                {tasks.map((task, index) => (
                    <span key={index}>
                        {task}
                        <button onClick={() => handleRemoveTask(index)}>Supprimer</button>
                    </span>
                ))}
            </div>
        </>
    );


}
