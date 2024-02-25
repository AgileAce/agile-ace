// File: User.js
import React from 'react';
import PlanningPokerOptionsComponent from "./PlanningPokerOptions.component";

function User({ userName, isReady, className, your= false, handleReady = function (){},
                planningPokerOptions=[], onOptionSelect = function (){}, selections={}}) {
  return (
    <div className={`user mt-4 ${className}`}>
      <p><b>{userName}</b></p>
      <div className="border rounded-2 mt-2 p-2">
        <div className="row">
          <div className="col">
            <div className="d-flex align-items-start m-auto flex-column">
              <p>Distance</p>
              {
                your ? ( planningPokerOptions && planningPokerOptions.length &&
                          <PlanningPokerOptionsComponent category="distance" selections={selections} planningPokerOptions={planningPokerOptions} onOptionSelect={onOptionSelect} />
                    )
                    :
                    <ion-icon size="large" name="help"></ion-icon>
              }
            </div>
          </div>
          <div className="col">
            <div className="d-flex align-items-start m-auto flex-column">
              <p>Friction</p>
              {
                your ? ( planningPokerOptions && planningPokerOptions.length &&
                        <PlanningPokerOptionsComponent category="fraction" selections={selections} planningPokerOptions={planningPokerOptions} onOptionSelect={onOptionSelect} />
                    )
                    :
                    <ion-icon size="large" name="help"></ion-icon>
              }
            </div>
          </div>
          <div className="col">
            <div className="d-flex align-items-start m-auto flex-column">
              <p>Relativity</p>
              {
                your ? ( planningPokerOptions && planningPokerOptions.length &&
                        <PlanningPokerOptionsComponent category="relativity" selections={selections} planningPokerOptions={planningPokerOptions} onOptionSelect={onOptionSelect} />
                    )
                    :
                    <ion-icon size="large" name="help"></ion-icon>
              }
            </div>
          </div>
          <div className="col">
            <div className="d-flex align-items-start m-auto flex-column">
              <p>Ready</p>
               {isReady ? (
                your ? (
                  // When isReady is true and your is true, showing a checkbox icon
                  <button className="btn no-effects" onClick={handleReady}>
                    <ion-icon class="text-primary" size="large" name="checkbox"></ion-icon>
                  </button>
                ) : (
                  // When isReady is true but your is false
                  <ion-icon class="text-primary" size="large" name="checkmark"></ion-icon>
                )
              ) : your ? (
                   // When isReady is false and your is true, showing a different close icon
                   <button className="btn no-effects" onClick={handleReady}>
                     <ion-icon class="text-primary" size="large" name="close-circle"></ion-icon>
                   </button>
               ) : (
                   // When isReady is false and your is false
                   <ion-icon size="large" name="close"></ion-icon>
               )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
