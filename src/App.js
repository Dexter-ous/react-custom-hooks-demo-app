import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./hooks/use-http";

function App() {
    // const fetchTasks = async (taskText) => {
    //     setIsLoading(true);
    //     setError(null);
    //     try {
    //         const response = await fetch(
    //             "https://http-react-2a43d-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json"
    //         );

    //         if (!response.ok) {
    //             throw new Error("Request failed!");
    //         }

    //         const data = await response.json();

    //         const loadedTasks = [];

    //         for (const taskKey in data) {
    //             loadedTasks.push({ id: taskKey, text: data[taskKey].text });
    //         }

    //         setTasks(loadedTasks);
    //     } catch (err) {
    //         setError(err.message || "Something went wrong!");
    //     }
    //     setIsLoading(false);
    // };

    const [tasks, setTasks] = useState([]);

    const { isLoading, error, sendRequest: fetchTasks } = useHttp();

    useEffect(() => {
        const transformTasks = (tasksObj) => {
            const loadedTasks = [];

            for (const taskKey in tasksObj) {
                loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
            }

            setTasks(loadedTasks);
        };

        fetchTasks(
            {
                url: "https://http-react-2a43d-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json",
            },
            transformTasks
        );
    }, [fetchTasks]);

    const taskAddHandler = (task) => {
        setTasks((prevTasks) => prevTasks.concat(task));
    };

    return (
        <React.Fragment>
            <NewTask onAddTask={taskAddHandler} />
            <Tasks
                items={tasks}
                loading={isLoading}
                error={error}
                onFetch={fetchTasks}
            />
        </React.Fragment>
    );
}

export default App;
