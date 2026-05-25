import SidebarPlayer from "./sidebarPlayer.jsx";
import "./sidebarPlayer.css";

export default function MainSidebarPlayer({ track, onTogglePlay, onPrev, onNext }) {
  return (
    <div className="sidebar-container-fixed">
      <SidebarPlayer track={track} onTogglePlay={onTogglePlay} onPrev={onPrev} onNext={onNext} />
    </div>
  );
}