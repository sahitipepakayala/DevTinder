import React from 'react'
function ConnectionCard({ card }) {
    return (
      <div className="card card-side bg-base-300 shadow-sm w-11/12 md:w-2/3 lg:w-1/2 m-2">
        <figure className="w-1/3 h-full">
          <img src={card.image} alt="profile" className="w-full h-full object-cover" />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-2xl">{card.firstName + ' ' + card.lastName}</h2>
          <p className="text-xl">{card.age || 20}, {card.gender.toUpperCase()}</p>
          <p className="text-xl">{card.about}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Watch</button>
          </div>
        </div>
      </div>
    );
  }
export default ConnectionCard  