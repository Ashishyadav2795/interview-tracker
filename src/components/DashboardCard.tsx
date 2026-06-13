type DashboardCardProps = {
  title: string;
  value: number;
};

const DashboardCard = ({ title, value }: DashboardCardProps) => {
  return (
    <div className="card">
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
};

export default DashboardCard;