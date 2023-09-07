import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "app/providers/StoreProvider";
import { Left, Right } from "shared/assets/icons/Arrows";
import { getDateDecade, getMutableDate, getVeiw } from "../../model/selectors/calendarSelectors";
import { calendarActions } from "../../model/slice/calendarSlice";
import { View } from "../../model/types/calendar";
import { Home } from "shared/assets/icons/ItemActions";

export const CalendarHeader = () => {
    const dispatch = useAppDispatch();
    const mutableDate = useAppSelector(getMutableDate);
    const view = useAppSelector(getVeiw);
    const decade = useAppSelector(getDateDecade);
    const increaseMonthByOne = () => dispatch(calendarActions.changeMonth(1));
    const decreaseMonthByOne = () => dispatch(calendarActions.changeMonth(-1));
    const increaseYearByOne = () => dispatch(calendarActions.changeYear(1));
    const decreaseYearByOne = () => dispatch(calendarActions.changeYear(-1));
    const increaseDecade = () => dispatch(calendarActions.changeDecade("increase"));
    const decreaseDecade = () => dispatch(calendarActions.changeDecade("decrease"));
    const onChangeView = (newView: View) => dispatch(calendarActions.setView(newView));
    const goToday = () => dispatch(calendarActions.setToday());

    let header: ReactNode = "";
    switch (view) {
        case "days": {
            header = (
                <>
                    <button
                        className="btn btn--padding btn--fullWidth btn--border"
                        onClick={() => onChangeView("months")}
                    >
                        <p className="boldText">{mutableDate.year + " " + mutableDate.month}</p>
                    </button>
                    <button className="btn btn--border" onClick={goToday}>
                        <Home />
                    </button>
                    <button onClick={decreaseMonthByOne} className="btn btn--border">
                        <Left />
                    </button>
                    <button onClick={increaseMonthByOne} className="btn btn--border">
                        <Right />
                    </button>
                </>
            );
            break;
        }
        case "months": {
            header = (
                <>
                    <button
                        className="btn btn--padding btn--fullWidth btn--border"
                        onClick={() => onChangeView("years")}
                    >
                        <p className="boldText" onClick={() => onChangeView("years")}>
                            {mutableDate.year}
                        </p>
                    </button>
                    <button className="btn btn--border" onClick={goToday}>
                        <Home />
                    </button>
                    <div className="flex">
                        <button onClick={decreaseYearByOne} className="btn btn--border">
                            <Left />
                        </button>
                        <button onClick={increaseYearByOne} className="btn btn--border ml-s">
                            <Right />
                        </button>
                    </div>
                </>
            );
            break;
        }
        case "years": {
            header = (
                <>
                    <button className="btn btn--padding btn--fullWidth btn--inactive btn--disabled">
                        <p className="boldText">
                            {decade}
                            <span>-</span>
                            {decade + 9}
                        </p>
                    </button>
                    <button className="btn btn--border" onClick={goToday}>
                        <Home />
                    </button>
                    <div className="flex">
                        <button onClick={decreaseDecade} className="btn btn--border">
                            <Left />
                        </button>
                        <button onClick={increaseDecade} className="btn btn--border ml-s">
                            <Right />
                        </button>
                    </div>
                </>
            );
        }
    }

    return <div className="flex flex--between">{header}</div>;
};
