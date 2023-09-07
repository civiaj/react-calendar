import { Calendar } from "feature/Calendar";
import { CalendarTasks } from "feature/Tasks";

function App() {
    return (
        <div className="app">
            <div className="layout">
                <Calendar />
                <CalendarTasks />
            </div>
        </div>
    );
}

export default App;
