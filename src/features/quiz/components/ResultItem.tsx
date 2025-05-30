type ResultItemProps = {
  label: string;
  value: string | number;
  className?: string;
};

const ResultItem = ({
  label,
  value,
  className = "text-gray-700",
}: ResultItemProps) => {
  return (
    <div className="flex justify-between">
      <span className={`font-medium ${className}`}>{label}</span>
      <span className={className}>{value}</span>
    </div>
  );
};

export default ResultItem;
