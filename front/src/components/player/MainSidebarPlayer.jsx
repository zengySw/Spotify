import SidebarPlayer from "./sidebarPlayer.jsx";

const stickySidebarStyle = {
  width: 310,
  flexShrink: 0,
  position: "sticky",
  top: 64,
};

export default function MainSidebarPlayer({ track, onTogglePlay, onPrev, onNext }) {
  return (
    <div style={stickySidebarStyle}>
      <SidebarPlayer track={track} onTogglePlay={onTogglePlay} onPrev={onPrev} onNext={onNext} />
    </div>
  );
}
