"use client";
import React, { useEffect, useState } from 'react';
import TicketCard from "./(components)/TicketCard"; // Adjust the import path as needed

const getTickets = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/Tickets', {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error('Failed to fetch tickets');
    }
    return await res.json();
  } catch (error) {
    console.error('Failed to get tickets', error);
    return { tickets: [] }; // Return a default value in case of an error
  }
};

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const result = await getTickets();
      setTickets(result.tickets);
      const categories = result.tickets.map(ticket => ticket.category);
      setUniqueCategories([...new Set(categories)]);
    };

    fetchTickets();
  }, []);

  return (
    <div className="p-5">
      {uniqueCategories.map((uniqueCategory, categoryIndex) => (
        <div key={categoryIndex} className="mb-4">
          <h2>{uniqueCategory}</h2>
          <div className="lg:grid grid-col-2 xl:grid-cols-4">
            {tickets
              .filter(ticket => ticket.category === uniqueCategory)
              .map((filteredTicket, _index) => (
                <TicketCard key={_index} ticket={filteredTicket} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
