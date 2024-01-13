import TicketCard from "./(components)/TicketCard";

const Dashboard = () => {
  return (
    <div className= "p-5">
      <div className="lg:grid grid-col-2 xl:grid-cols-4">
      <TicketCard/>
      <TicketCard/>
      <TicketCard/>
      <TicketCard/>
      </div>
    </div>
  )
}

export default Dashboard;
