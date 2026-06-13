export default function SectionHead({ label, index, style }) {
  return (
    <div className="sec-head" style={style}>
      <span className="label">{label}</span>
      <span className="index">{index}</span>
    </div>
  );
}
