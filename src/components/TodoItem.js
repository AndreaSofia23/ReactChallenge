import { TrashCanIcon, CheckIcon, UncheckedIcon } from "../icons";

const StatusIcon = ({ completed }) => {
    return completed ? (
        <CheckIcon className="status-icon completed" />
    ) : (
        <UncheckedIcon className="status-icon" />
    );
};

const ToDoItem = ({ item, handleStatus, handleRemove }) => {
    const { title, completed } = item;
    return (
        <div className="todo">
            <button
                className="todo-item"
                style={{
                    textDecoration: completed ? `line-through` : `none`
                }}
                onClick={handleStatus}
            >
                <StatusIcon completed={completed} />
                {title}
            </button>
            <button className="btn-delete" onClick={handleRemove}>
                <TrashCanIcon className="delete-icon" />
            </button>
        </div>
    );
};

export default ToDoItem