import "./OnePList.css";

export default function OnePList({ title, childs, flexDirection = "row" }) {
    return (
        <div className="one-p-list">
            {title}
            <div className="list" style={{ flexDirection: flexDirection }}>
                {childs}
            </div>
        </div>
    )
}