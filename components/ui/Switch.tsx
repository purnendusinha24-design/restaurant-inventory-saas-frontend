type SwitchProps = {
  checked: boolean;
  onChange: () => void;
};

export default function Switch({ checked, onChange }: SwitchProps) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`w-10 h-5 rounded-full ${
        checked ? "bg-green-500" : "bg-gray-300"
      } relative`}
    >
      <span
        className={`absolute top-0.5 transition-all w-4 h-4 bg-white rounded-full ${
          checked ? "left-5" : "left-1"
        }`}
      />
    </button>
  );
}
