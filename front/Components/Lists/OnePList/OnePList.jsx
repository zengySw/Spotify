import "./OnePList.css";

export default function OnePList({ title, childs }) {
    return (
        <div className="one-p-list">
            {title}
            <div className="list">
                {childs}
            </div>
        </div>
    )
}