import { CalendarHeader } from "../CalendarHeader/CalendarHeader";
import { CalendarBody } from "../CalendarBody/CalendarBody";

export function Calendar() {
    return (
        <div className="calendarWidth">
            <CalendarHeader />
            <CalendarBody />
        </div>
    );
}
