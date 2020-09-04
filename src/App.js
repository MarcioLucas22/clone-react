import React, { useState, useEffect } from 'react';

import Header from './components/Header';

import './App.css';

import backgroundImage from './assets/background.jpg';

import api from './services/api';

function App() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data);
        });
    }, []);

    async function addProject() {
        //setProjects([... projects, `Novo Projeto ${Date.now()}`]);
        const response = await api.post('projects', {
            title: `Novo Projeto ${Date.now()}`,
            owner: "Márcio Lucas"
        });

        const project = response.data;

        setProjects([... projects, project]);
    }

    return (
        <>
            <Header title="Projects" />

            <ul>
                {projects.map(project => <li key={project.id}>{project.title}</li>)}
            </ul>

            <button type="button" onClick={addProject}>Adicionar Projeto</button>
        </>
    );
}

export default App;